"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
const config_constant_1 = require("../../constants/config.constant");
const aws_response_1 = require("../../constants/api-response/aws.response");
const common_1 = require("@nestjs/common");
const serializer_1 = require("../../utils/serializer");
const client_s3_2 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const sharp = require("sharp");
let MediaService = class MediaService {
    constructor(configService) {
        this.configService = configService;
        const region = this.configService.get(config_constant_1.CONFIG.AWS_REGION);
        const bucketName = this.configService.get(config_constant_1.CONFIG.AWS_BUCKET_NAME);
        const accessKeyId = this.configService.get(config_constant_1.CONFIG.AWS_ACCESS_KEY_ID);
        const secretAccessKey = this.configService.get(config_constant_1.CONFIG.AWS_SECRET_ACCESS_KEY);
        console.log('region: ', region);
        console.log('bucketName: ', bucketName);
        console.log('accessKeyId: ', accessKeyId);
        console.log('secretAccessKey: ', secretAccessKey);
        this.s3 = new client_s3_1.S3({ credentials: { accessKeyId, secretAccessKey }, region });
        this.bucketName = bucketName;
    }
    async deleteImage(fileName) {
        const params = { Bucket: this.bucketName, Key: fileName };
        try {
            await this.s3.deleteObject(params);
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NO_CONTENT, aws_response_1.AWS_SUCCESS.DELETE_FILE);
        }
        catch (error) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.INTERNAL_SERVER_ERROR, aws_response_1.AWS_ERROR.DELETE_FILE);
        }
    }
    async uploadFile(path, file) {
        const fileName = path;
        try {
            let buffer = file.buffer;
            const ONE_MB = 1 * 1024 * 1024;
            if (file.mimetype === "application/pdf") {
                console.log("PDF detected → skipping compression");
            }
            else if (buffer.length > ONE_MB) {
                console.log("Image > 1MB → compressing...");
                let quality = 80;
                let compressed = buffer;
                while (compressed.length > ONE_MB && quality > 10) {
                    compressed = await sharp(buffer)
                        .jpeg({ quality })
                        .toBuffer();
                    console.log(` → Quality ${quality}, size ${compressed.length}`);
                    quality -= 10;
                }
                buffer = compressed;
                console.log("Final compressed size:", buffer.length);
            }
            const command = new client_s3_2.PutObjectCommand({
                Bucket: this.bucketName,
                Key: fileName,
                Body: buffer,
                ContentType: file.mimetype,
                ACL: "bucket-owner-full-control",
            });
            const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 300 });
            const response = await fetch(signedUrl, {
                method: "PUT",
                headers: { "Content-Type": file.mimetype },
                body: buffer,
            });
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Failed to upload file: ${response.status} - ${text}`);
            }
            const publicUrl = `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
            return { name: fileName, url: publicUrl };
        }
        catch (error) {
            console.error("Upload error:", error);
            return null;
        }
    }
    async uploadProfile(folderName, file, fileName) {
        const path = `${folderName}/${fileName}`;
        console.log('Uploading to path:', path);
        console.log('File received:', file?.originalname);
        return await this.uploadFile(path, file);
    }
    async uploadPhysiques(folderName, file) {
        const path = `${folderName}/${file.originalname}`;
        return await this.uploadFile(path, file);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MediaService);
//# sourceMappingURL=media.service.js.map
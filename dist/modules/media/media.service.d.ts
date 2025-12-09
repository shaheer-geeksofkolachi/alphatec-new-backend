import { ConfigService } from '@nestjs/config';
import { FOLDER_NAME } from 'src/constants/media.constant';
import { HttpStatus } from '@nestjs/common';
export declare class MediaService {
    private readonly configService;
    private s3;
    private readonly bucketName;
    constructor(configService: ConfigService);
    deleteImage(fileName: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NO_CONTENT> | import("src/utils/serializer").Serialized<null, HttpStatus.INTERNAL_SERVER_ERROR>>;
    uploadFile(path: string, file: Express.Multer.File): Promise<{
        name: string;
        url: string;
    } | null>;
    uploadProfile(folderName: FOLDER_NAME, file: Express.Multer.File, fileName: string): Promise<{
        name: string;
        url: string;
    } | null>;
    uploadPhysiques(folderName: FOLDER_NAME, file: Express.Multer.File): Promise<{
        name: string;
        url: string;
    } | null>;
}

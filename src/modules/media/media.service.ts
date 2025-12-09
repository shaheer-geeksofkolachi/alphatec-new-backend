import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from 'src/constants/config.constant';
import {
  AWS_ERROR,
  AWS_SUCCESS,
} from 'src/constants/api-response/aws.response';
import { FOLDER_NAME } from 'src/constants/media.constant';
import { HttpStatus, Injectable } from '@nestjs/common';
import { SerializeHttpResponse } from 'src/utils/serializer';
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as sharp from 'sharp';



@Injectable()
export class MediaService {
  private s3: S3;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get(CONFIG.AWS_REGION);
    const bucketName = this.configService.get(CONFIG.AWS_BUCKET_NAME);
    const accessKeyId = this.configService.get(CONFIG.AWS_ACCESS_KEY_ID);
    const secretAccessKey = this.configService.get(
      CONFIG.AWS_SECRET_ACCESS_KEY
    );

    console.log('region: ', region)
        console.log('bucketName: ', bucketName)
                console.log('accessKeyId: ', accessKeyId)

                        console.log('secretAccessKey: ', secretAccessKey)



    this.s3 = new S3({ credentials: { accessKeyId, secretAccessKey }, region });
    this.bucketName = bucketName;
  }

  async deleteImage(fileName: string) {
    const params = { Bucket: this.bucketName, Key: fileName };

    try {
      await this.s3.deleteObject(params);
      return SerializeHttpResponse(
        null,
        HttpStatus.NO_CONTENT,
        AWS_SUCCESS.DELETE_FILE
      );
    } catch (error) {
      return SerializeHttpResponse(
        null,
        HttpStatus.INTERNAL_SERVER_ERROR,
        AWS_ERROR.DELETE_FILE
      );
    }
  }

//   async uploadFile(path: string, file: Express.Multer.File) {
//     const fileName = path;

//     try {
//       // Create command for uploading
//       // const command = new PutObjectCommand({
//       //   Bucket: this.bucketName,
//       //   Key: fileName,
//       //   ContentType: file.mimetype,
//       // });

//       const command = new PutObjectCommand({
//   Bucket: this.bucketName,
//   Key: fileName,
//   Body: file.buffer,
//   ContentType: file.mimetype,
// });


//       // Generate pre-signed URL (valid for 5 minutes)
//       const signedUrl = await getSignedUrl(this.s3, command, {
//         expiresIn: 300,
//       });

//       console.log("Generated Signed URL:", signedUrl);

//       // Optionally: upload from backend (or return URL for frontend)
//       const response = await fetch(signedUrl, {
//         method: "PUT",
//         headers: { "Content-Type": file.mimetype },
//   body: new Uint8Array(file.buffer),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to upload file: ${response.statusText}`);
//       }

//       const publicUrl = `https://${this.bucketName}.s3.eu-north-1.amazonaws.com/${fileName}`;

//       return { name: fileName, url: publicUrl };
//     } catch (error) {
//       console.error("Upload error:", error);
//       return null;
//     }
//   }

// async uploadFile(path: string, file: Express.Multer.File) {
//   const fileName = path;

//   try {
//     // ✅ Create the PutObjectCommand (no ACL)
//     const command = new PutObjectCommand({
//       Bucket: this.bucketName,
//       Key: fileName,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//       ACL: "bucket-owner-full-control",
//     });

//     // ✅ Generate pre-signed URL (valid 5 mins)
//     const signedUrl = await getSignedUrl(this.s3, command, { expiresIn: 300 });

//     console.log("Generated Signed URL:", signedUrl);

//     // ✅ Upload using fetch without adding any extra headers
//     const response = await fetch(signedUrl, {
//       method: "PUT",
//       headers: {
//         "Content-Type": file.mimetype,
//       },
//       body: new Uint8Array(file.buffer),
//     });

//     if (!response.ok) {
//       const text = await response.text();
//       throw new Error(`Failed to upload file: ${response.statusText} - ${text}`);
//     }

//     const publicUrl = `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
//     return { name: fileName, url: publicUrl };

//   } catch (error) {
//     console.error("Upload error:", error);
//     return null;
//   }
// }

async uploadFile(path: string, file: Express.Multer.File) {
  const fileName = path;

  try {
    let buffer = file.buffer;
    const ONE_MB = 1 * 1024 * 1024;

    // ------------------------------------------------------
    // 🛑 Skip compression if file is PDF
    // ------------------------------------------------------
    if (file.mimetype === "application/pdf") {
      console.log("PDF detected → skipping compression");
    } 
    // ------------------------------------------------------
    // ✅ Compress ONLY if (1) not a PDF AND (2) file > 1MB
    // ------------------------------------------------------
    else if (buffer.length > ONE_MB) {
      console.log("Image > 1MB → compressing...");

      let quality = 80;
      let compressed = buffer;

      while (compressed.length > ONE_MB && quality > 10) {
        compressed = await sharp(buffer)
          .jpeg({ quality }) // You can switch to webp if you want
          .toBuffer();

        console.log(` → Quality ${quality}, size ${compressed.length}`);
        quality -= 10;
      }

      buffer = compressed;
      console.log("Final compressed size:", buffer.length);
    }
    // ------------------------------------------------------

    // Create S3 upload command
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.mimetype,
      ACL: "bucket-owner-full-control",
    });

    const signedUrl = await getSignedUrl(this.s3, command, { expiresIn: 300 });

    // Upload to S3
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

  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}


  async uploadProfile(
    folderName: FOLDER_NAME,
    file: Express.Multer.File,
    fileName: string
  ) {
    const path = `${folderName}/${fileName}`;
    console.log('Uploading to path:', path);
  console.log('File received:', file?.originalname);
    return await this.uploadFile(path, file);
  }

  async uploadPhysiques(folderName: FOLDER_NAME, file: Express.Multer.File) {
    const path = `${folderName}/${file.originalname}`;
    return await this.uploadFile(path, file);
  }
}

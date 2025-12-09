import { ConfigService } from "@nestjs/config";
export declare class SESMailService {
    private sesClient;
    private readonly configService;
    constructor(configService: ConfigService);
    loadTemplate(templateName: string, context: Record<string, any>): Promise<string>;
    sendEmail(to: string, subject: string, bodyHtml?: string, bodyText?: string): Promise<import("@aws-sdk/client-ses").SendEmailCommandOutput>;
}

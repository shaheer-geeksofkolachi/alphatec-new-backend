import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/send-email.dto';
export declare class EmailService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    loadTemplate(templateName: string, context: Record<string, any>): Promise<string>;
    sendEmail(email: SendEmailDto): Promise<void>;
}

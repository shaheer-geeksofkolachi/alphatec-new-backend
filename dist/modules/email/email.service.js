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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const fs = require("fs");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const Handlebars = require("handlebars");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const config_constant_1 = require("../../constants/config.constant");
let EmailService = EmailService_1 = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(EmailService_1.name);
        const sendGridApiKey = this.configService.get(config_constant_1.CONFIG.SENDGRID_API_KEY);
        sgMail.setApiKey(sendGridApiKey ?? '');
    }
    async loadTemplate(templateName, context) {
        const filePath = path.resolve(`src/email-templates/${templateName}.hbs`);
        const templateSource = fs.readFileSync(filePath, 'utf-8');
        const template = Handlebars.compile(templateSource);
        return template(context);
    }
    async sendEmail(email) {
        const msg = {
            to: email.to,
            html: email.html,
            subject: email.subject,
            from: this.configService.get(config_constant_1.CONFIG.SENDGRID_SENDER) ?? '',
        };
        try {
            await sgMail.send(msg);
        }
        catch (error) {
            console.error('Error sending dynamic email:', error);
            if (error.response) {
                console.error(error.response.body);
            }
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map
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
exports.SESMailService = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const config_1 = require("@nestjs/config");
const config_constant_1 = require("../../constants/config.constant");
let SESMailService = class SESMailService {
    constructor(configService) {
        this.configService = configService;
        this.sesClient = new client_ses_1.SESClient({
            region: this.configService.get(config_constant_1.CONFIG.AWS_REGION),
            credentials: {
                accessKeyId: this.configService.get(config_constant_1.CONFIG.AWS_ACCESS_KEY_ID) ?? "",
                secretAccessKey: this.configService.get(config_constant_1.CONFIG.AWS_SECRET_ACCESS_KEY) ?? "",
            },
        });
    }
    async loadTemplate(templateName, context) {
        const filePath = path.resolve(`src/email-templates/${templateName}.hbs`);
        const templateSource = fs.readFileSync(filePath, "utf-8");
        const template = Handlebars.compile(templateSource);
        return template(context);
    }
    async sendEmail(to, subject, bodyHtml = "", bodyText) {
        const input = {
            Source: "hello@alphatech.com",
            Destination: { ToAddresses: [to] },
            Message: {
                Subject: { Data: subject },
                Body: {
                    Text: { Data: bodyText },
                    ...(bodyHtml && {
                        Html: { Data: bodyHtml },
                    }),
                },
            },
        };
        const command = new client_ses_1.SendEmailCommand(input);
        const response = await this.sesClient.send(command);
        return response;
    }
};
exports.SESMailService = SESMailService;
exports.SESMailService = SESMailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SESMailService);
//# sourceMappingURL=ses-email.service.js.map
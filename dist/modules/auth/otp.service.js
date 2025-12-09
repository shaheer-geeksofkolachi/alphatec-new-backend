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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("@nestjs/config");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const otp_schema_1 = require("./otp.schema");
const email_service_1 = require("../email/email.service");
const config_constant_1 = require("../../constants/config.constant");
const otp_type_1 = require("../../types/otp.type");
const serializer_1 = require("../../utils/serializer");
const auth_response_1 = require("../../constants/api-response/auth.response");
const auth_util_1 = require("../../utils/auth.util");
const templates_type_1 = require("../../types/templates.type");
const otp_response_1 = require("../../constants/api-response/otp.response");
const auth_constant_1 = require("../../constants/auth.constant");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("../user/user.schema");
const user_constant_1 = require("../../constants/user.constant");
let OtpService = class OtpService {
    constructor(userModel, otpModel, emailService, configService, jwtService) {
        this.userModel = userModel;
        this.otpModel = otpModel;
        this.emailService = emailService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async generateOTP(userInput, accessType, subject) {
        const user = await this.userModel.findOne({ email: userInput.email });
        if (!user) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, auth_response_1.AUTH_ERRORS.USER_NOT_FOUND);
        }
        const otp = (0, auth_util_1.generateRandomOTPNumber)(6);
        await this.otpModel.updateMany({
            email: userInput.email,
            accessType,
            createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) },
        }, { isVerified: true });
        await this.otpModel.create({
            otp,
            accessType,
            isVerified: false,
            email: userInput.email,
        });
        const emailData = { otp, name: user.name, email: user.email };
        const template = await this.emailService.loadTemplate(templates_type_1.ITemplates.OTP, emailData);
        await this.emailService.sendEmail({
            to: user.email,
            subject: subject,
            html: template,
        });
        return (0, serializer_1.SerializeHttpResponse)(true, common_1.HttpStatus.OK, otp_response_1.OTP_SUCCESS.GENERATE_OTP);
    }
    generateToken(userId, email, expiresIn, type) {
        const payload = { sub: userId, email, type };
        const secret = this.configService.get(config_constant_1.CONFIG.JWT_SECRET);
        return this.jwtService.sign(payload, { secret, expiresIn });
    }
    async validateOTP(userInput, accessType) {
        const otpRecord = await this.otpModel.findOne({
            email: userInput.email,
            otp: userInput.otp,
            accessType: accessType,
        });
        if (!otpRecord) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.FORBIDDEN, otp_response_1.OTP_ERROR.OTP_NOT_VERIFIED);
        }
        if (otpRecord.isVerified) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.FORBIDDEN, otp_response_1.OTP_ERROR.OTP_EXPIRED);
        }
        otpRecord.isVerified = true;
        await otpRecord.save();
        const resetToken = this.generateToken("", userInput.email, config_constant_1.EMAIL_TOKEN_VALIDITY, auth_constant_1.TOKEN_TYPES.RESET_PASSWORD_TOKEN);
        return (0, serializer_1.SerializeHttpResponse)({ resetToken }, common_1.HttpStatus.OK, otp_response_1.OTP_SUCCESS.VERIFIED_OTP);
    }
    async verifySignupOtp(userInput) {
        const otpRecord = await this.otpModel.findOneAndDelete({
            email: userInput.email,
            otp: userInput.otp,
            accessType: otp_type_1.OTP_TYPE.SIGNUP,
        });
        if (!otpRecord) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.FORBIDDEN, otp_response_1.OTP_ERROR.OTP_NOT_VERIFIED);
        }
        if (otpRecord.isVerified) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.FORBIDDEN, otp_response_1.OTP_ERROR.OTP_EXPIRED);
        }
        await this.userModel.findOneAndUpdate({ email: userInput.email.toLowerCase() }, { emailVerified: true, status: user_constant_1.USER_STATUS.ACTIVE });
        return (0, serializer_1.SerializeHttpResponse)(true, common_1.HttpStatus.OK, otp_response_1.OTP_SUCCESS.VERIFIED_OTP);
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_2.InjectModel)(otp_schema_1.Otp.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        email_service_1.EmailService,
        config_1.ConfigService,
        jwt_1.JwtService])
], OtpService);
//# sourceMappingURL=otp.service.js.map
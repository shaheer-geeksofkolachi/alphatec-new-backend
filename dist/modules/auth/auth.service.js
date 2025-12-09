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
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const otp_service_1 = require("./otp.service");
const config_1 = require("@nestjs/config");
const mongoose_2 = require("@nestjs/mongoose");
const config_constant_1 = require("../../constants/config.constant");
const auth_response_1 = require("../../constants/api-response/auth.response");
const auth_util_1 = require("../../utils/auth.util");
const serializer_1 = require("../../utils/serializer");
const common_1 = require("@nestjs/common");
const templates_type_1 = require("../../types/templates.type");
const auth_constant_1 = require("../../constants/auth.constant");
const user_schema_1 = require("../user/user.schema");
const user_constant_1 = require("../../constants/user.constant");
const ses_email_service_1 = require("../email/ses-email.service");
const otp_type_1 = require("../../types/otp.type");
const email_type_1 = require("../../types/email.type");
let AuthService = class AuthService {
    constructor(userModel, jwtService, otpService, sesEmailService, configService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.otpService = otpService;
        this.sesEmailService = sesEmailService;
        this.configService = configService;
    }
    async verifyPassword(plainTextPassword, hashedPassword) {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            if (user.emailVerified) {
                throw new common_1.UnauthorizedException(auth_response_1.AUTH_ERRORS.EMAIL_NOT_VERIFIED);
            }
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }
    async verifyToken(token, type) {
        try {
            const secret = this.configService.get(config_constant_1.CONFIG.JWT_SECRET);
            const response = await this.jwtService.verify(token, { secret });
            if (response.type !== type) {
                return { success: false, msg: auth_response_1.AUTH_ERRORS.INVALID_TOKEN };
            }
            return { success: true, msg: auth_response_1.AUTH_SUCCESS.VALID_TOKEN };
        }
        catch {
            return { success: false, msg: auth_response_1.AUTH_ERRORS.INVALID_TOKEN };
        }
    }
    generateToken(userId, email, expiresIn, type) {
        const payload = { sub: userId, email, type };
        const secret = this.configService.get(config_constant_1.CONFIG.JWT_SECRET);
        return this.jwtService.sign(payload, { secret, expiresIn });
    }
    async signup(data) {
        const user = await this.userModel.findOne({
            email: data.email.toLowerCase(),
        });
        if (user) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, auth_response_1.AUTH_ERRORS.DUPLICATE_EMAIL);
        }
        const hashedPassword = await (0, auth_util_1.createHashPassword)(data.password);
        await this.userModel.create({
            ...data,
            password: hashedPassword,
            role: data.roles,
            status: user_constant_1.USER_STATUS.ACTIVE,
        });
        const otpData = { email: data.email };
        await this.otpService.generateOTP(otpData, otp_type_1.OTP_TYPE.SIGNUP, email_type_1.EMAIL_SUBJECT.SIGNUP_OTP);
        return (0, serializer_1.SerializeHttpResponse)(true, common_1.HttpStatus.CREATED, auth_response_1.AUTH_SUCCESS.ACCOUNT_CREATION);
    }
    async signIn(data) {
        const user = await this.userModel.findOne({
            email: data.email.toLowerCase(),
        });
        if (!user) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.UNAUTHORIZED, auth_response_1.AUTH_ERRORS.INCORRECT_CREDENTIALS);
        }
        const verify = await this.verifyPassword(data.password, user.password);
        if (!verify) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.UNAUTHORIZED, auth_response_1.AUTH_ERRORS.INCORRECT_CREDENTIALS);
        }
        const LOGIN_NOT_ALLOWED = [user_constant_1.USER_STATUS.UNAPPROVED, user_constant_1.USER_STATUS.INACTIVE];
        if (LOGIN_NOT_ALLOWED.includes(user.status)) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.UNAUTHORIZED, auth_response_1.AUTH_ERRORS.INCORRECT_CREDENTIALS);
        }
        const token = await this.generateToken(user._id.toString(), user.email, config_constant_1.DEFAULT_TOKEN_VALIDITY, auth_constant_1.TOKEN_TYPES.SIGNIN_TOKEN);
        return (0, serializer_1.SerializeHttpResponse)({ token, user: user.toJSON() }, common_1.HttpStatus.OK, auth_response_1.AUTH_SUCCESS.ACCOUNT_LOGIN);
    }
    async forgotPassword(data) {
        const user = await this.userModel.findOne({
            email: data.email.toLowerCase(),
        });
        if (!user) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, auth_response_1.AUTH_ERRORS.USER_NOT_FOUND);
        }
        const token = await this.generateToken(user._id.toString(), user.email, config_constant_1.EMAIL_TOKEN_VALIDITY, auth_constant_1.TOKEN_TYPES.RESET_PASSWORD_TOKEN);
        const emailData = {
            name: user.name,
            email: data.email,
            token: token,
            url: this.configService.get(config_constant_1.CONFIG.FRONTEND_URL),
        };
        const template = await this.sesEmailService.loadTemplate(templates_type_1.ITemplates.FORGOT_PASSWORD, emailData);
        const subject = "Forgot Password";
        await this.sesEmailService.sendEmail(data.email, subject, template);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, auth_response_1.AUTH_SUCCESS.FORGOT_PASSWORD);
    }
    async verifyResetPassword(data) {
        const verifiedToken = await this.verifyToken(data.token, auth_constant_1.TOKEN_TYPES.RESET_PASSWORD_TOKEN);
        if (!verifiedToken.success) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.FORBIDDEN, auth_response_1.AUTH_ERRORS.INVALID_TOKEN);
        }
        const hashedPassword = await (0, auth_util_1.createHashPassword)(data.password);
        await this.userModel.findOneAndUpdate({ email: data.email.toLowerCase() }, { password: hashedPassword });
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, auth_response_1.AUTH_SUCCESS.RESET_PASSWORD);
    }
    async changePassword(userId, data) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, auth_response_1.AUTH_ERRORS.USER_NOT_FOUND);
        }
        const isPasswordValid = await this.verifyPassword(data.currentPassword, user.password);
        if (!isPasswordValid) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, auth_response_1.AUTH_ERRORS.INCORRECT_CURRENT_PASSWORD);
        }
        const hashedPassword = await (0, auth_util_1.createHashPassword)(data.newPassword);
        user.password = hashedPassword;
        await user.save();
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, auth_response_1.AUTH_SUCCESS.PASSWORD_CHANGED);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService,
        otp_service_1.OtpService,
        ses_email_service_1.SESMailService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
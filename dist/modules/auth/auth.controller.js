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
exports.AuthController = void 0;
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const otp_dto_1 = require("./dto/otp.dto");
const otp_service_1 = require("./otp.service");
const signup_dto_1 = require("./dto/signup.dto");
const signin_dto_1 = require("./dto/signin.dto");
const auth_service_1 = require("./auth.service");
const otp_type_1 = require("../../types/otp.type");
const user_service_1 = require("../user/user.service");
const user_decorator_1 = require("../../decorator/user.decorator");
const email_type_1 = require("../../types/email.type");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const change_password_dto_1 = require("./dto/change-password.dto");
const common_1 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(authService, otpService, userService) {
        this.authService = authService;
        this.otpService = otpService;
        this.userService = userService;
    }
    getAuthenticatedUser(userId) {
        return this.userService.findOne(userId);
    }
    signup(signUpDto) {
        return this.authService.signup(signUpDto);
    }
    async login(signInDto) {
        return this.authService.signIn(signInDto);
    }
    async forgotPassword(data) {
        return this.otpService.generateOTP(data, otp_type_1.OTP_TYPE.FORGOT_PASSWORD, email_type_1.EMAIL_SUBJECT.FORGOT_PASSWORD_OTP);
    }
    async verifyForgotPasswordOtp(userInput) {
        return this.otpService.validateOTP(userInput, otp_type_1.OTP_TYPE.FORGOT_PASSWORD);
    }
    async verifyResetPassword(data) {
        return this.authService.verifyResetPassword(data);
    }
    async verifySignupOtp(userInput) {
        return this.otpService.verifySignupOtp(userInput);
    }
    async changePassword(userId, data) {
        return this.authService.changePassword(userId, data);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)("get-authenticated-user"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.GetUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAuthenticatedUser", null);
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("forgot-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.UserEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)("verify-forgot-password-otp"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.OtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyForgotPasswordOtp", null);
__decorate([
    (0, common_1.Post)("verify-reset-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.VerifyResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyResetPassword", null);
__decorate([
    (0, common_1.Post)("verify-signup-otp"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_dto_1.OtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifySignupOtp", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("change-password"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.GetUser)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    (0, swagger_1.ApiTags)("Auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        otp_service_1.OtpService,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
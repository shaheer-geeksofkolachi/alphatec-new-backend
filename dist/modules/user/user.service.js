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
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_response_1 = require("../../constants/api-response/user.response");
const user_schema_1 = require("./user.schema");
const common_1 = require("@nestjs/common");
const auth_util_1 = require("../../utils/auth.util");
const serializer_1 = require("../../utils/serializer");
const user_constant_1 = require("../../constants/user.constant");
const media_service_1 = require("../media/media.service");
const media_constant_1 = require("../../constants/media.constant");
const templates_type_1 = require("../../types/templates.type");
const email_service_1 = require("../email/email.service");
let UserService = class UserService {
    constructor(userModel, mediaService, sesEmailService) {
        this.userModel = userModel;
        this.mediaService = mediaService;
        this.sesEmailService = sesEmailService;
    }
    async create(createUserDto, file) {
        const existingUser = await this.userModel.findOne({
            email: createUserDto.email.toLowerCase(),
        });
        if (existingUser) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, user_response_1.UserErrorMessages.ALREADY_EXISTS);
        }
        const password = (0, auth_util_1.generatePassword)();
        const hashedPassword = await (0, auth_util_1.createHashPassword)(password);
        const payload = {
            ...createUserDto,
            password: hashedPassword,
            status: user_constant_1.USER_STATUS.ACTIVE,
        };
        if (createUserDto.organization) {
            payload.organization = new mongoose_1.Types.ObjectId(createUserDto.organization);
        }
        if (file) {
            const folder = `${media_constant_1.FOLDER_NAME.PROFILE}/${createUserDto.email}`;
            const resp = await this.mediaService.uploadFile(folder, file);
            payload.avatar = resp?.url || "";
        }
        const user = await this.userModel.create(payload);
        await user.populate("organization");
        const emailPayload = {
            email: user.email,
            invitedUserName: user.name,
            password: password,
            userRole: user.role,
        };
        await this.sendOnBoardingEmail(emailPayload);
        return (0, serializer_1.SerializeHttpResponse)(user, common_1.HttpStatus.CREATED, user_response_1.UserSuccessMessages.CREATED);
    }
    async sendOnBoardingEmail(payload) {
        const template = await this.sesEmailService.loadTemplate(templates_type_1.ITemplates.NEW_USER, payload);
        const subject = 'Welcome to "Platform Name"';
        await this.sesEmailService.sendEmail({
            to: payload.email,
            subject: subject,
            html: template,
        });
    }
    async findAll() {
        const users = await this.userModel.find().select("-password");
        return (0, serializer_1.SerializeHttpResponse)(users, common_1.HttpStatus.OK, user_response_1.UserSuccessMessages.RETRIEVED_ALL);
    }
    async findAllUsers(organizationId) {
        const users = await this.userModel
            .find({ organization: new mongoose_1.Types.ObjectId(organizationId) })
            .select("-password");
        return (0, serializer_1.SerializeHttpResponse)(users, common_1.HttpStatus.OK, user_response_1.UserSuccessMessages.RETRIEVED_ALL);
    }
    async findOne(id) {
        const user = await this.userModel.findById(id).select("-password");
        if (!user) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, user_response_1.UserErrorMessages.NOT_FOUND);
        }
        return (0, serializer_1.SerializeHttpResponse)(user, common_1.HttpStatus.OK, user_response_1.UserSuccessMessages.RETRIEVED);
    }
    async update(id, updateUserDto, file) {
        const user = await this.userModel.findById(id);
        if (!user) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, user_response_1.UserErrorMessages.NOT_FOUND);
        }
        const payload = { ...updateUserDto };
        if (updateUserDto.password) {
            payload.password = await (0, auth_util_1.createHashPassword)(updateUserDto.password);
        }
        if (file) {
            const folder = `${media_constant_1.FOLDER_NAME.PROFILE}/${user.email}`;
            const resp = await this.mediaService.uploadFile(folder, file);
            payload.avatar = resp?.url || "";
        }
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, payload, { new: true })
            .select("-password");
        return (0, serializer_1.SerializeHttpResponse)(updatedUser, common_1.HttpStatus.OK, user_response_1.UserSuccessMessages.UPDATED);
    }
    async remove(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, user_response_1.UserErrorMessages.NOT_FOUND);
        }
        await this.userModel.findByIdAndDelete(id);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, user_response_1.UserSuccessMessages.DELETED);
    }
    async changeEmail(userId, changeEmailDto) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, user_response_1.UserErrorMessages.NOT_FOUND);
        }
        const isPasswordValid = await (0, auth_util_1.comparePassword)(changeEmailDto.password, user.password);
        if (!isPasswordValid) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.UNAUTHORIZED, user_response_1.UserErrorMessages.INVALID_PASSWORD);
        }
        const existingUser = await this.userModel.findOne({
            email: changeEmailDto.email.toLowerCase(),
        });
        if (existingUser) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, user_response_1.UserErrorMessages.ALREADY_EXISTS);
        }
        user.email = changeEmailDto.email.toLowerCase();
        user.emailVerified = false;
        await user.save();
        return (0, serializer_1.SerializeHttpResponse)(user, common_1.HttpStatus.OK, user_response_1.UserSuccessMessages.EMAIL_UPDATED);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        media_service_1.MediaService,
        email_service_1.EmailService])
], UserService);
//# sourceMappingURL=user.service.js.map
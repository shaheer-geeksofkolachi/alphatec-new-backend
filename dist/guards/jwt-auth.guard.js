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
exports.JwtAuthGuard = void 0;
const mongoose_1 = require("mongoose");
const jwt = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const serializer_1 = require("../utils/serializer");
const user_constant_1 = require("../constants/user.constant");
const user_schema_1 = require("../modules/user/user.schema");
const auth_response_1 = require("../constants/api-response/auth.response");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers.authorization;
        if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
            const token = authorizationHeader.substring(7);
            const tokenPayload = jwt.decode(token);
            request["user"] = { id: tokenPayload.sub, email: tokenPayload.email };
            const timestamp = Math.floor(Date.now() / 1000);
            if (!tokenPayload.exp || timestamp > tokenPayload?.exp) {
                return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.UNAUTHORIZED, auth_response_1.AUTH_ERRORS.UNAUTHORIZED);
            }
            const userId = tokenPayload?.sub;
            const user = await this.userModel.findById(userId);
            if (!user) {
                return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.UNAUTHORIZED, auth_response_1.AUTH_ERRORS.UNAUTHORIZED);
            }
            if (user_constant_1.NOT_ALLOWED_USERS.includes(user.status)) {
                return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.UNAUTHORIZED, auth_response_1.AUTH_ERRORS.UNAUTHORIZED);
            }
            return true;
        }
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.UNAUTHORIZED, auth_response_1.AUTH_ERRORS.UNAUTHORIZED);
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map
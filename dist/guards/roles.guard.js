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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const core_1 = require("@nestjs/core");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../modules/user/user.schema");
const auth_response_1 = require("../constants/api-response/auth.response");
let RolesGuard = class RolesGuard {
    constructor(reflector, userModel) {
        this.reflector = reflector;
        this.userModel = userModel;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride("roles", [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        const userData = await this.userModel.findById(user.id);
        if (!userData) {
            throw new common_1.UnauthorizedException(auth_response_1.AUTH_ERRORS.UNAUTHORIZED);
        }
        return requiredRoles.some((role) => userData.role.includes(role));
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [core_1.Reflector,
        mongoose_1.Model])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map
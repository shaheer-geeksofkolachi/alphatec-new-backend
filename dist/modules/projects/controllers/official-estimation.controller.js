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
exports.OfficialEstimationController = void 0;
const common_1 = require("@nestjs/common");
const official_estimation_service_1 = require("../services/official-estimation.service");
const roles_guard_1 = require("../../../guards/roles.guard");
const roles_decorator_1 = require("../../../decorator/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const user_constant_1 = require("../../../constants/user.constant");
const official_estimation_dto_1 = require("../dto/official-estimation.dto");
let OfficialEstimationController = class OfficialEstimationController {
    constructor(officialEstimationService) {
        this.officialEstimationService = officialEstimationService;
    }
    async create(projectId, createDto, req) {
        const userId = req.user?.id || req.user?._id;
        return this.officialEstimationService.create(projectId, createDto, userId);
    }
    async findOne(projectId) {
        return await this.officialEstimationService.findOne(projectId);
    }
    async update(projectId, updateDto) {
        return this.officialEstimationService.update(projectId, updateDto);
    }
    async remove(projectId) {
        return this.officialEstimationService.remove(projectId);
    }
};
exports.OfficialEstimationController = OfficialEstimationController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, official_estimation_dto_1.CreateOfficialEstimationDto, Object]),
    __metadata("design:returntype", Promise)
], OfficialEstimationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OfficialEstimationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, official_estimation_dto_1.UpdateOfficialEstimationDto]),
    __metadata("design:returntype", Promise)
], OfficialEstimationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OfficialEstimationController.prototype, "remove", null);
exports.OfficialEstimationController = OfficialEstimationController = __decorate([
    (0, common_1.Controller)("projects/:projectId/official-estimate"),
    (0, swagger_1.ApiTags)("Official Estimation"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [official_estimation_service_1.OfficialEstimationService])
], OfficialEstimationController);
//# sourceMappingURL=official-estimation.controller.js.map
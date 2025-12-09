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
exports.DetailedCostsController = void 0;
const common_1 = require("@nestjs/common");
const detailed_costs_service_1 = require("../services/detailed-costs.service");
const roles_guard_1 = require("../../../guards/roles.guard");
const roles_decorator_1 = require("../../../decorator/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const user_constant_1 = require("../../../constants/user.constant");
const detailed_costs_dto_1 = require("../dto/detailed-costs.dto");
let DetailedCostsController = class DetailedCostsController {
    constructor(detailedCostsService) {
        this.detailedCostsService = detailedCostsService;
    }
    async create(projectId, createDto) {
        console.log('inside create controller of detailedcost');
        return this.detailedCostsService.create(projectId, createDto);
    }
    async findAll(projectId) {
        return this.detailedCostsService.findAll(projectId);
    }
    async findOne(projectId, id) {
        return this.detailedCostsService.findOne(projectId, id);
    }
    async update(projectId, id, updateDto) {
        console.log('inside update controller of detailedcost ', updateDto);
        return this.detailedCostsService.update(projectId, id, updateDto);
    }
    async remove(projectId, id) {
        return this.detailedCostsService.remove(projectId, id);
    }
};
exports.DetailedCostsController = DetailedCostsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, detailed_costs_dto_1.CreateDetailedCostDto]),
    __metadata("design:returntype", Promise)
], DetailedCostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DetailedCostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DetailedCostsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, detailed_costs_dto_1.UpdateDetailedCostDto]),
    __metadata("design:returntype", Promise)
], DetailedCostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DetailedCostsController.prototype, "remove", null);
exports.DetailedCostsController = DetailedCostsController = __decorate([
    (0, common_1.Controller)("projects/:projectId/detailed-costs"),
    (0, swagger_1.ApiTags)("Project Detailed Costs"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [detailed_costs_service_1.DetailedCostsService])
], DetailedCostsController);
//# sourceMappingURL=detailed-costs.controller.js.map
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
exports.ProjectDimensionsController = void 0;
const common_1 = require("@nestjs/common");
const project_dimensions_service_1 = require("../services/project-dimensions.service");
const roles_guard_1 = require("../../../guards/roles.guard");
const roles_decorator_1 = require("../../../decorator/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../guards/jwt-auth.guard");
const user_constant_1 = require("../../../constants/user.constant");
const project_dimensions_dto_1 = require("../dto/project-dimensions.dto");
let ProjectDimensionsController = class ProjectDimensionsController {
    constructor(projectDimensionsService) {
        this.projectDimensionsService = projectDimensionsService;
    }
    async create(projectId, createDto) {
        return this.projectDimensionsService.create(projectId, createDto);
    }
    async findAll(projectId) {
        return this.projectDimensionsService.findAll(projectId);
    }
    async findOne(projectId, id) {
        return this.projectDimensionsService.findOne(projectId, id);
    }
    async update(projectId, id, updateDto) {
        return this.projectDimensionsService.update(projectId, id, updateDto);
    }
    async remove(projectId, id) {
        return this.projectDimensionsService.remove(projectId, id);
    }
};
exports.ProjectDimensionsController = ProjectDimensionsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, project_dimensions_dto_1.CreateProjectDimensionsDto]),
    __metadata("design:returntype", Promise)
], ProjectDimensionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectDimensionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectDimensionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, project_dimensions_dto_1.UpdateProjectDimensionsDto]),
    __metadata("design:returntype", Promise)
], ProjectDimensionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("projectId")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectDimensionsController.prototype, "remove", null);
exports.ProjectDimensionsController = ProjectDimensionsController = __decorate([
    (0, common_1.Controller)("projects/:projectId/dimensions"),
    (0, swagger_1.ApiTags)("Project Dimensions"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [project_dimensions_service_1.ProjectDimensionsService])
], ProjectDimensionsController);
//# sourceMappingURL=project-dimensions.controller.js.map
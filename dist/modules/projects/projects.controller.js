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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const projects_service_1 = require("./projects.service");
const roles_guard_1 = require("../../guards/roles.guard");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const user_decorator_1 = require("../../decorator/user.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const user_constant_1 = require("../../constants/user.constant");
const project_dto_1 = require("./dto/project.dto");
const project_constant_1 = require("../../constants/project.constant");
const create_project_type_dto_1 = require("./dto/create-project-type.dto");
const create_work_type_dto_1 = require("./dto/create-work-type.dto");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    async create(createProjectDto) {
        return this.projectsService.create(createProjectDto);
    }
    async findAll(queryDto, userId, userEmail) {
        return this.projectsService.findAll(queryDto, userId, userEmail);
    }
    async findOne(id) {
        return this.projectsService.findOne(id);
    }
    async findByCode(projectCode) {
        return this.projectsService.findByCode(projectCode);
    }
    async update(id, updateProjectDto) {
        return this.projectsService.update(id, updateProjectDto);
    }
    async updateStatus(id, updateStatusDto) {
        return this.projectsService.updateStatus(id, updateStatusDto);
    }
    async updateFinancialStatus(id, updateFinancialStatusDto) {
        return this.projectsService.updateFinancialStatus(id, updateFinancialStatusDto);
    }
    async remove(id) {
        return this.projectsService.remove(id);
    }
    async importFromExcel(body) {
        return this.projectsService.importProjectsWithEstimations(body.projects);
    }
    async uploadImages(id, uploadDto, files) {
        return this.projectsService.uploadImages(id, files, uploadDto.imageType);
    }
    async deleteImage(id, body) {
        return this.projectsService.deleteImage(id, body.imageUrl, body.imageType);
    }
    async getProjectTypes() {
        return this.projectsService.getProjectTypes();
    }
    async createProjectType(createProjectTypeDto) {
        return this.projectsService.createProjectType(createProjectTypeDto);
    }
    async updateProjectType(id, updateProjectTypeDto) {
        return this.projectsService.updateProjectType(id, updateProjectTypeDto);
    }
    async deleteProjectType(id) {
        return this.projectsService.deleteProjectType(id);
    }
    async getWorkTypes() {
        return this.projectsService.getWorkTypes();
    }
    async createWorkType(createProjectTypeDto) {
        return this.projectsService.createWorkType(createProjectTypeDto);
    }
    async updateWorkType(id, updateProjectTypeDto) {
        return this.projectsService.updateWorkType(id, updateProjectTypeDto);
    }
    async deleteWorkType(id) {
        return this.projectsService.deleteWorkType(id);
    }
    async assignProjectRights(projectId, assignDto, userEmail) {
        return this.projectsService.assignProjectRights(projectId, assignDto, userEmail);
    }
    async revokeProjectRights(projectId, revokeDto, userEmail) {
        return this.projectsService.revokeProjectRights(projectId, revokeDto, userEmail);
    }
    async getProjectAllowedUsers(projectId) {
        return this.projectsService.getProjectAllowedUsers(projectId);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    (0, swagger_1.ApiQuery)({
        name: "status",
        required: false,
        enum: project_constant_1.PROJECT_STATUS,
    }),
    (0, swagger_1.ApiQuery)({
        name: "financialStatus",
        required: false,
        enum: project_constant_1.PROJECT_FINANCIAL_STATUS,
    }),
    (0, swagger_1.ApiQuery)({ name: "clientId", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, type: String }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.GetUser)("id")),
    __param(2, (0, user_decorator_1.GetUser)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectQueryDto, String, String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("getProjectById/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("code/:projectCode"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    __param(0, (0, common_1.Param)("projectCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findByCode", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(":id/status"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, project_dto_1.UpdateProjectStatusDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(":id/financial-status"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, project_dto_1.UpdateProjectFinancialStatusDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateFinancialStatus", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("import-excel"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "importFromExcel", null);
__decorate([
    (0, common_1.Post)(":id/upload-images"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("images", 10)),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, project_dto_1.UploadProjectImagesDto, Array]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "uploadImages", null);
__decorate([
    (0, common_1.Delete)(":id/images"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.Get)("/project-all-types"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProjectTypes", null);
__decorate([
    (0, common_1.Post)("/project-types"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_type_dto_1.CreateProjectTypeDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProjectType", null);
__decorate([
    (0, common_1.Patch)("project-types/:id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_project_type_dto_1.UpdateProjectTypeDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateProjectType", null);
__decorate([
    (0, common_1.Delete)("project-types/:id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "deleteProjectType", null);
__decorate([
    (0, common_1.Get)("/work-all-types"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getWorkTypes", null);
__decorate([
    (0, common_1.Post)("/work-types"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_work_type_dto_1.CreateWorkTypeDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createWorkType", null);
__decorate([
    (0, common_1.Patch)("work-types/:id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_work_type_dto_1.UpdateWorkTypeDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateWorkType", null);
__decorate([
    (0, common_1.Delete)("work-types/:id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "deleteWorkType", null);
__decorate([
    (0, common_1.Post)(":id/assign-rights"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.GetUser)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, project_dto_1.AssignProjectRightsDto, String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "assignProjectRights", null);
__decorate([
    (0, common_1.Post)(":id/revoke-rights"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.GetUser)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, project_dto_1.RevokeProjectRightsDto, String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "revokeProjectRights", null);
__decorate([
    (0, common_1.Get)(":id/allowed-users"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProjectAllowedUsers", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)("projects"),
    (0, swagger_1.ApiTags)("Projects"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map
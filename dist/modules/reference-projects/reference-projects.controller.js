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
exports.ReferenceProjectsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const reference_projects_service_1 = require("./reference-projects.service");
const roles_guard_1 = require("../../guards/roles.guard");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const user_constant_1 = require("../../constants/user.constant");
const reference_project_dto_1 = require("./dto/reference-project.dto");
let ReferenceProjectsController = class ReferenceProjectsController {
    constructor(referenceProjectsService) {
        this.referenceProjectsService = referenceProjectsService;
    }
    async create(createReferenceProjectDto) {
        return this.referenceProjectsService.create(createReferenceProjectDto);
    }
    async findAll(queryDto) {
        return this.referenceProjectsService.findAll(queryDto);
    }
    async findTemplates() {
        return this.referenceProjectsService.findTemplates();
    }
    async findOne(id) {
        return this.referenceProjectsService.findOne(id);
    }
    async update(id, updateReferenceProjectDto) {
        return this.referenceProjectsService.update(id, updateReferenceProjectDto);
    }
    async remove(id) {
        return this.referenceProjectsService.remove(id);
    }
    async uploadImages(id, uploadDto, files) {
        return this.referenceProjectsService.uploadImages(id, files, uploadDto.imageType);
    }
    async deleteImage(id, body) {
        return this.referenceProjectsService.deleteImage(id, body.imageUrl, body.imageType);
    }
};
exports.ReferenceProjectsController = ReferenceProjectsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reference_project_dto_1.CreateReferenceProjectDto]),
    __metadata("design:returntype", Promise)
], ReferenceProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    (0, swagger_1.ApiQuery)({ name: "clientId", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "categoryId", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "projectType", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "workType", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "machineType", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "useAsProjectTemplate", required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, type: String }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reference_project_dto_1.ReferenceProjectQueryDto]),
    __metadata("design:returntype", Promise)
], ReferenceProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("templates"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReferenceProjectsController.prototype, "findTemplates", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferenceProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reference_project_dto_1.UpdateReferenceProjectDto]),
    __metadata("design:returntype", Promise)
], ReferenceProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferenceProjectsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(":id/upload-images"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("images", 10)),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reference_project_dto_1.UploadReferenceProjectImagesDto, Array]),
    __metadata("design:returntype", Promise)
], ReferenceProjectsController.prototype, "uploadImages", null);
__decorate([
    (0, common_1.Delete)(":id/images"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReferenceProjectsController.prototype, "deleteImage", null);
exports.ReferenceProjectsController = ReferenceProjectsController = __decorate([
    (0, common_1.Controller)("reference-projects"),
    (0, swagger_1.ApiTags)("Reference Projects"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [reference_projects_service_1.ReferenceProjectsService])
], ReferenceProjectsController);
//# sourceMappingURL=reference-projects.controller.js.map
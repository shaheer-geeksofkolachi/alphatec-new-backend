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
exports.CatalogueController = void 0;
const common_1 = require("@nestjs/common");
const catalogue_service_1 = require("./catalogue.service");
const roles_guard_1 = require("../../guards/roles.guard");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const user_constant_1 = require("../../constants/user.constant");
const catalogue_dto_1 = require("./dto/catalogue.dto");
let CatalogueController = class CatalogueController {
    constructor(catalogueService) {
        this.catalogueService = catalogueService;
    }
    async create(createCatalogueDto) {
        return this.catalogueService.create(createCatalogueDto);
    }
    async findAll(queryDto) {
        return this.catalogueService.findAll(queryDto);
    }
    async findOne(id) {
        return this.catalogueService.findOne(id);
    }
    async update(id, updateCatalogueDto) {
        return this.catalogueService.update(id, updateCatalogueDto);
    }
    async remove(id) {
        return this.catalogueService.remove(id);
    }
};
exports.CatalogueController = CatalogueController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalogue_dto_1.CreateCatalogueDto]),
    __metadata("design:returntype", Promise)
], CatalogueController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "categoryId", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "manufacturer", required: false, type: String }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [catalogue_dto_1.CatalogueQueryDto]),
    __metadata("design:returntype", Promise)
], CatalogueController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogueController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, catalogue_dto_1.UpdateCatalogueDto]),
    __metadata("design:returntype", Promise)
], CatalogueController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogueController.prototype, "remove", null);
exports.CatalogueController = CatalogueController = __decorate([
    (0, common_1.Controller)("catalogue"),
    (0, swagger_1.ApiTags)("Catalogue"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [catalogue_service_1.CatalogueService])
], CatalogueController);
//# sourceMappingURL=catalogue.controller.js.map
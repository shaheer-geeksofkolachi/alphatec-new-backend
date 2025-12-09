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
exports.ClientsController = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("./clients.service");
const roles_guard_1 = require("../../guards/roles.guard");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const user_constant_1 = require("../../constants/user.constant");
const client_dto_1 = require("./dto/client.dto");
let ClientsController = class ClientsController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    async create(createClientDto) {
        return this.clientsService.create(createClientDto);
    }
    async findAll(queryDto) {
        return this.clientsService.findAll(queryDto);
    }
    async findOne(id) {
        return this.clientsService.findOne(id);
    }
    async findByCifNit(cifNit) {
        return this.clientsService.findByCifNit(cifNit);
    }
    async update(id, updateClientDto) {
        return this.clientsService.update(id, updateClientDto);
    }
    async remove(id) {
        return this.clientsService.remove(id);
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.CreateClientDto]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    (0, swagger_1.ApiQuery)({ name: "country", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "city", required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, type: String }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.ClientQueryDto]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("cif/:cifNit"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER, user_constant_1.USER_ROLES.ENGINEER, user_constant_1.USER_ROLES.VIEWER),
    __param(0, (0, common_1.Param)("cifNit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findByCifNit", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN, user_constant_1.USER_ROLES.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)(user_constant_1.USER_ROLES.SUPER_ADMIN),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "remove", null);
exports.ClientsController = ClientsController = __decorate([
    (0, common_1.Controller)("clients"),
    (0, swagger_1.ApiTags)("Clients"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
//# sourceMappingURL=clients.controller.js.map
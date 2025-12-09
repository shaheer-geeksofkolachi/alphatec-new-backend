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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogueQueryDto = exports.UpdateCatalogueDto = exports.CreateCatalogueDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateCatalogueDto {
}
exports.CreateCatalogueDto = CreateCatalogueDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Item name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateCatalogueDto.prototype, "itemName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Category ID" }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCatalogueDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Item description" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateCatalogueDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Manufacturer name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCatalogueDto.prototype, "manufacturer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Part number" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateCatalogueDto.prototype, "partNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Model number" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateCatalogueDto.prototype, "modelNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Revision" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateCatalogueDto.prototype, "revision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Recommended applications" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateCatalogueDto.prototype, "recommendedApplications", void 0);
class UpdateCatalogueDto {
}
exports.UpdateCatalogueDto = UpdateCatalogueDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Item name", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateCatalogueDto.prototype, "itemName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Category ID", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateCatalogueDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Item description", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateCatalogueDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Manufacturer name", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateCatalogueDto.prototype, "manufacturer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Part number", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateCatalogueDto.prototype, "partNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Model number", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateCatalogueDto.prototype, "modelNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Revision", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UpdateCatalogueDto.prototype, "revision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Recommended applications", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateCatalogueDto.prototype, "recommendedApplications", void 0);
class CatalogueQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.CatalogueQueryDto = CatalogueQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Page number", required: false, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], CatalogueQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Items per page", required: false, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], CatalogueQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Search term", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CatalogueQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Category ID filter", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CatalogueQueryDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Manufacturer filter", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CatalogueQueryDto.prototype, "manufacturer", void 0);
//# sourceMappingURL=catalogue.dto.js.map
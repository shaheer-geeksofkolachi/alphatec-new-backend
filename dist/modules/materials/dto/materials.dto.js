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
exports.MaterialsQueryDto = exports.UpdateMaterialsDto = exports.CreateMaterialsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateMaterialsDto {
}
exports.CreateMaterialsDto = CreateMaterialsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Item name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateMaterialsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Category ID" }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMaterialsDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unit of measurement" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateMaterialsDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Price per unit" }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMaterialsDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Calculation method" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMaterialsDto.prototype, "calculationMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Material description" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateMaterialsDto.prototype, "description", void 0);
class UpdateMaterialsDto {
}
exports.UpdateMaterialsDto = UpdateMaterialsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Item name", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateMaterialsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Category ID", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateMaterialsDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unit of measurement", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateMaterialsDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Price per unit", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateMaterialsDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Calculation method", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMaterialsDto.prototype, "calculationMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Material description", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMaterialsDto.prototype, "description", void 0);
class MaterialsQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.MaterialsQueryDto = MaterialsQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Page number", required: false, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], MaterialsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Items per page", required: false, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], MaterialsQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Search term", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MaterialsQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Category ID filter", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], MaterialsQueryDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unit filter", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MaterialsQueryDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Calculation method filter", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MaterialsQueryDto.prototype, "calculationMethod", void 0);
//# sourceMappingURL=materials.dto.js.map
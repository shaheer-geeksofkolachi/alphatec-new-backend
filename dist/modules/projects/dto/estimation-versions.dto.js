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
exports.UpdateEstimationVersionDto = exports.CreateEstimationVersionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateEstimationVersionDto {
}
exports.CreateEstimationVersionDto = CreateEstimationVersionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Version name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEstimationVersionDto.prototype, "nombreVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Version description", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEstimationVersionDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Dimension data" }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateEstimationVersionDto.prototype, "dimensionData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Material cost", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateEstimationVersionDto.prototype, "costoMaterial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Labor cost", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateEstimationVersionDto.prototype, "costoPersonal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total cost", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateEstimationVersionDto.prototype, "costoTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Additional costs", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateEstimationVersionDto.prototype, "additionalCosts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Detailed costs array", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateEstimationVersionDto.prototype, "detailedCosts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Estimated materials array", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateEstimationVersionDto.prototype, "estimatedMaterials", void 0);
class UpdateEstimationVersionDto {
}
exports.UpdateEstimationVersionDto = UpdateEstimationVersionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Version name", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateEstimationVersionDto.prototype, "nombreVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Version description", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEstimationVersionDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Dimension data", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateEstimationVersionDto.prototype, "dimensionData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Material cost", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateEstimationVersionDto.prototype, "costoMaterial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Labor cost", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateEstimationVersionDto.prototype, "costoPersonal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total cost", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateEstimationVersionDto.prototype, "costoTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Additional costs", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateEstimationVersionDto.prototype, "additionalCosts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Detailed costs array", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateEstimationVersionDto.prototype, "detailedCosts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Estimated materials array", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateEstimationVersionDto.prototype, "estimatedMaterials", void 0);
//# sourceMappingURL=estimation-versions.dto.js.map
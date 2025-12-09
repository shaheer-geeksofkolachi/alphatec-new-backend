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
exports.UpdateOfficialEstimationDto = exports.CreateOfficialEstimationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOfficialEstimationDto {
}
exports.CreateOfficialEstimationDto = CreateOfficialEstimationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total concrete amount", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOfficialEstimationDto.prototype, "totalConcrete", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total steel amount", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOfficialEstimationDto.prototype, "totalSteel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Material cost", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOfficialEstimationDto.prototype, "materialCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Labor cost", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOfficialEstimationDto.prototype, "laborCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Additional costs", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOfficialEstimationDto.prototype, "additionalCosts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total cost", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOfficialEstimationDto.prototype, "totalCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Commission", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateOfficialEstimationDto.prototype, "commission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Materials array", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateOfficialEstimationDto.prototype, "materials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Detailed costs array", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateOfficialEstimationDto.prototype, "detailedCosts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Dimension data", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateOfficialEstimationDto.prototype, "dimensionData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Foundation data (array of foundation elements)",
        required: false,
        type: [Object],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateOfficialEstimationDto.prototype, "foundation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Anchor bolts data (array of bolt configurations)",
        required: false,
        type: [Object],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateOfficialEstimationDto.prototype, "anchorBolts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Skid fill data (array of skid fill elements)",
        required: false,
        type: [Object],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateOfficialEstimationDto.prototype, "skidFill", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Calculation results", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateOfficialEstimationDto.prototype, "calculationResults", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Estimated materials array", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateOfficialEstimationDto.prototype, "estimatedMaterials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Version name", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOfficialEstimationDto.prototype, "versionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Notes", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOfficialEstimationDto.prototype, "notes", void 0);
class UpdateOfficialEstimationDto {
}
exports.UpdateOfficialEstimationDto = UpdateOfficialEstimationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Total concrete amount",
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateOfficialEstimationDto.prototype, "totalConcrete", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Total steel amount",
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateOfficialEstimationDto.prototype, "totalSteel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Material cost", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateOfficialEstimationDto.prototype, "materialCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Labor cost", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateOfficialEstimationDto.prototype, "laborCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Additional costs", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateOfficialEstimationDto.prototype, "additionalCosts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total cost", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateOfficialEstimationDto.prototype, "totalCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Commission", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateOfficialEstimationDto.prototype, "commission", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Materials array", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateOfficialEstimationDto.prototype, "materials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Detailed costs array", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateOfficialEstimationDto.prototype, "detailedCosts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Dimension data", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateOfficialEstimationDto.prototype, "dimensionData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Foundation data", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateOfficialEstimationDto.prototype, "foundation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Anchor bolts data", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateOfficialEstimationDto.prototype, "anchorBolts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Skid fill data", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateOfficialEstimationDto.prototype, "skidFill", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Calculation results", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateOfficialEstimationDto.prototype, "calculationResults", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Estimated materials array", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateOfficialEstimationDto.prototype, "estimatedMaterials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Version name", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOfficialEstimationDto.prototype, "versionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Notes", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOfficialEstimationDto.prototype, "notes", void 0);
//# sourceMappingURL=official-estimation.dto.js.map
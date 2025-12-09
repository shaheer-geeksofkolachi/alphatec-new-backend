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
exports.UpdateDetailedCostDto = exports.CreateDetailedCostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDetailedCostDto {
}
exports.CreateDetailedCostDto = CreateDetailedCostDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Type of cost" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDetailedCostDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Description of the cost", required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDetailedCostDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Material Type" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDetailedCostDto.prototype, "materialType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unit cost", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateDetailedCostDto.prototype, "unitCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Quantity", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateDetailedCostDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Markup percentage applied to unit cost", required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDetailedCostDto.prototype, "markUp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Markup percentage applied to unit cost", required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDetailedCostDto.prototype, "finalCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Real Usage", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateDetailedCostDto.prototype, "realUsage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of days", minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateDetailedCostDto.prototype, "days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Tab where cost was added (números, estimado, progresso)", required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDetailedCostDto.prototype, "tab", void 0);
class UpdateDetailedCostDto {
}
exports.UpdateDetailedCostDto = UpdateDetailedCostDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Type of cost", required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDetailedCostDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Description of the cost", required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDetailedCostDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unit cost", minimum: 0, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDetailedCostDto.prototype, "unitCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Material Type", required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDetailedCostDto.prototype, "materialType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Quantity", minimum: 0, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDetailedCostDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Number of days", minimum: 0, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDetailedCostDto.prototype, "days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Markup percentage applied to unit cost", required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDetailedCostDto.prototype, "markUp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Real Usage is required", required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDetailedCostDto.prototype, "realUsage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Final cost after markup", required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDetailedCostDto.prototype, "finalCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Quoted price per unit (can be different from calculated price)", required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDetailedCostDto.prototype, "quotedPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Tab where cost was added (números, estimado, progresso)", required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDetailedCostDto.prototype, "tab", void 0);
//# sourceMappingURL=detailed-costs.dto.js.map
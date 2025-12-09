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
exports.UploadReferenceProjectImagesDto = exports.ReferenceProjectQueryDto = exports.UpdateReferenceProjectDto = exports.CreateReferenceProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateReferenceProjectDto {
}
exports.CreateReferenceProjectDto = CreateReferenceProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Name of the reference project" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReferenceProjectDto.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Client ID (MongoDB ObjectId)" }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReferenceProjectDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Category ID (MongoDB ObjectId)" }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReferenceProjectDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project location" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReferenceProjectDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project country" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReferenceProjectDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project description", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReferenceProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Type of project" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReferenceProjectDto.prototype, "projectType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Type of work" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReferenceProjectDto.prototype, "workType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Type of machine used" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReferenceProjectDto.prototype, "machineType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Estimated budget for the project" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReferenceProjectDto.prototype, "estimatedBudget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Final cost of the project" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReferenceProjectDto.prototype, "finalCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Margin achieved (0-100)" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReferenceProjectDto.prototype, "marginAchieved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project duration in days" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReferenceProjectDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Team size for the project" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateReferenceProjectDto.prototype, "teamSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Satisfaction rate (0-10)" }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], CreateReferenceProjectDto.prototype, "satisfactionRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Whether project was delivered on time" }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateReferenceProjectDto.prototype, "deliveryOnTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Whether to use as project template" }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateReferenceProjectDto.prototype, "useAsProjectTemplate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Before images", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateReferenceProjectDto.prototype, "beforeImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "After images", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateReferenceProjectDto.prototype, "afterImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Image descriptions", required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateReferenceProjectDto.prototype, "imageDescriptions", void 0);
class UpdateReferenceProjectDto {
}
exports.UpdateReferenceProjectDto = UpdateReferenceProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the reference project",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReferenceProjectDto.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Client ID (MongoDB ObjectId)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateReferenceProjectDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Category ID (MongoDB ObjectId)",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateReferenceProjectDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project location", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReferenceProjectDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project country", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReferenceProjectDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project description", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReferenceProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Type of project", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReferenceProjectDto.prototype, "projectType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Type of work", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReferenceProjectDto.prototype, "workType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Type of machine used", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReferenceProjectDto.prototype, "machineType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Estimated budget for the project",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateReferenceProjectDto.prototype, "estimatedBudget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Final cost of the project", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateReferenceProjectDto.prototype, "finalCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Margin achieved (0-100)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateReferenceProjectDto.prototype, "marginAchieved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project duration in days", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateReferenceProjectDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Team size for the project", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateReferenceProjectDto.prototype, "teamSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Satisfaction rate (0-10)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateReferenceProjectDto.prototype, "satisfactionRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether project was delivered on time",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateReferenceProjectDto.prototype, "deliveryOnTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether to use as project template",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateReferenceProjectDto.prototype, "useAsProjectTemplate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Before images", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateReferenceProjectDto.prototype, "beforeImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "After images", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateReferenceProjectDto.prototype, "afterImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Image descriptions", required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateReferenceProjectDto.prototype, "imageDescriptions", void 0);
class ReferenceProjectQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.ReferenceProjectQueryDto = ReferenceProjectQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Filter by client ID", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ReferenceProjectQueryDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Filter by category ID", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ReferenceProjectQueryDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Filter by project type", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReferenceProjectQueryDto.prototype, "projectType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Filter by work type", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReferenceProjectQueryDto.prototype, "workType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Filter by machine type", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReferenceProjectQueryDto.prototype, "machineType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Filter by use as template", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === "true"),
    __metadata("design:type", Boolean)
], ReferenceProjectQueryDto.prototype, "useAsProjectTemplate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Page number", required: false, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReferenceProjectQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Items per page", required: false, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReferenceProjectQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Search term", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReferenceProjectQueryDto.prototype, "search", void 0);
class UploadReferenceProjectImagesDto {
}
exports.UploadReferenceProjectImagesDto = UploadReferenceProjectImagesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Image type - before or after",
        enum: ["before", "after"],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadReferenceProjectImagesDto.prototype, "imageType", void 0);
//# sourceMappingURL=reference-project.dto.js.map
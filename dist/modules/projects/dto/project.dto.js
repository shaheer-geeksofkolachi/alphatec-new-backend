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
exports.RevokeProjectRightsDto = exports.AssignProjectRightsDto = exports.UploadProjectImagesDto = exports.ProjectQueryDto = exports.UpdateProjectFinancialStatusDto = exports.UpdateProjectStatusDto = exports.UpdateProjectDto = exports.CreateProjectDto = exports.ContactDto = exports.CONTACT_TYPE = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const class_transformer_2 = require("class-transformer");
const project_constant_1 = require("../../../constants/project.constant");
var CONTACT_TYPE;
(function (CONTACT_TYPE) {
    CONTACT_TYPE["PRIMARY"] = "PRIMARY";
    CONTACT_TYPE["SECONDARY"] = "SECONDARY";
})(CONTACT_TYPE || (exports.CONTACT_TYPE = CONTACT_TYPE = {}));
class ContactDto {
}
exports.ContactDto = ContactDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Full name of the contact" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Position of the contact", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Email address of the contact", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Phone number of the contact", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Type of contact (PRIMARY or SECONDARY)",
        required: false,
        enum: CONTACT_TYPE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(CONTACT_TYPE),
    __metadata("design:type", String)
], ContactDto.prototype, "contactType", void 0);
class CreateProjectDto {
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Name of the project" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Client ID (MongoDB ObjectId)" }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project location" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Project status",
        enum: project_constant_1.PROJECT_STATUS,
        default: project_constant_1.PROJECT_STATUS.PROPOSAL,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(project_constant_1.PROJECT_STATUS),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Project financial status",
        enum: project_constant_1.PROJECT_FINANCIAL_STATUS,
        default: project_constant_1.PROJECT_FINANCIAL_STATUS.BUDGET_PENDING,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(project_constant_1.PROJECT_FINANCIAL_STATUS),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "financialStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique project code" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "projectCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project description", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
class UpdateProjectDto {
}
exports.UpdateProjectDto = UpdateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Name of the project", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Client ID (MongoDB ObjectId)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project location", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Project status",
        enum: project_constant_1.PROJECT_STATUS,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(project_constant_1.PROJECT_STATUS),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Project financial status",
        enum: project_constant_1.PROJECT_FINANCIAL_STATUS,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(project_constant_1.PROJECT_FINANCIAL_STATUS),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "financialStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique project code", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "projectCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project description", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Estimated budget", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateProjectDto.prototype, "presupuestoEstimado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Estimated margin", minimum: 0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateProjectDto.prototype, "margenEstimado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Service type", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "tipoServicio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Cost responsible person ID",
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateProjectDto.prototype, "responsableCostos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project type", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "projectType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Project types (multiple)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateProjectDto.prototype, "projectTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Work types", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateProjectDto.prototype, "workTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Machine types", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateProjectDto.prototype, "machineTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Before images", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateProjectDto.prototype, "beforeImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "After images", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateProjectDto.prototype, "afterImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Image descriptions", required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateProjectDto.prototype, "imageDescriptions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of contacts related to the project",
        required: false,
        type: [ContactDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_2.Type)(() => ContactDto),
    __metadata("design:type", Array)
], UpdateProjectDto.prototype, "contacts", void 0);
class UpdateProjectStatusDto {
}
exports.UpdateProjectStatusDto = UpdateProjectStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Project status",
        enum: project_constant_1.PROJECT_STATUS,
    }),
    (0, class_validator_1.IsEnum)(project_constant_1.PROJECT_STATUS),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProjectStatusDto.prototype, "status", void 0);
class UpdateProjectFinancialStatusDto {
}
exports.UpdateProjectFinancialStatusDto = UpdateProjectFinancialStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Project financial status",
        enum: project_constant_1.PROJECT_FINANCIAL_STATUS,
    }),
    (0, class_validator_1.IsEnum)(project_constant_1.PROJECT_FINANCIAL_STATUS),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProjectFinancialStatusDto.prototype, "financialStatus", void 0);
class ProjectQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.ProjectQueryDto = ProjectQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Filter by status", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(project_constant_1.PROJECT_STATUS),
    __metadata("design:type", String)
], ProjectQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Filter by financial status", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(project_constant_1.PROJECT_FINANCIAL_STATUS),
    __metadata("design:type", String)
], ProjectQueryDto.prototype, "financialStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Filter by client ID", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ProjectQueryDto.prototype, "clientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Page number", required: false, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProjectQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Items per page", required: false, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProjectQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Search term", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectQueryDto.prototype, "search", void 0);
class UploadProjectImagesDto {
}
exports.UploadProjectImagesDto = UploadProjectImagesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Image type - before or after",
        enum: ["before", "after"],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadProjectImagesDto.prototype, "imageType", void 0);
class AssignProjectRightsDto {
}
exports.AssignProjectRightsDto = AssignProjectRightsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User ID to assign rights to", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], AssignProjectRightsDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Email address to invite (if user doesn't exist)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignProjectRightsDto.prototype, "email", void 0);
class RevokeProjectRightsDto {
}
exports.RevokeProjectRightsDto = RevokeProjectRightsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "User ID to revoke rights from" }),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RevokeProjectRightsDto.prototype, "userId", void 0);
//# sourceMappingURL=project.dto.js.map
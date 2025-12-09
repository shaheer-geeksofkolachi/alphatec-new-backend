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
exports.ClientQueryDto = exports.UpdateClientDto = exports.CreateClientDto = exports.ContactDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_constant_1 = require("../../../constants/client.constant");
class ContactDto {
}
exports.ContactDto = ContactDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Full name of the contact" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ContactDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Position of the contact" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ContactDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Email address of the contact" }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ContactDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Phone number of the contact" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ContactDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Type of contact",
        enum: client_constant_1.CONTACT_TYPE,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ContactDto.prototype, "contactType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Notes about the contact", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "LinkedIn URL of the contact", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDto.prototype, "linkedInUrl", void 0);
class CreateClientDto {
}
exports.CreateClientDto = CreateClientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Company name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "CIF/NIT (Tax identification number)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateClientDto.prototype, "cifNit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "VAT (Value Added Tax)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "vat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Website URL", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Country" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "City" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Location/Address" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Additional notes", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of contacts",
        type: [ContactDto],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ContactDto),
    __metadata("design:type", Array)
], CreateClientDto.prototype, "contacts", void 0);
class UpdateClientDto {
}
exports.UpdateClientDto = UpdateClientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Company name", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "CIF/NIT (Tax identification number)",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "cifNit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "VAT (Value Added Tax)", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "vat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Website URL", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Country", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "City", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Location/Address", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Additional notes", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of contacts",
        type: [ContactDto],
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ContactDto),
    __metadata("design:type", Array)
], UpdateClientDto.prototype, "contacts", void 0);
class ClientQueryDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.ClientQueryDto = ClientQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Filter by country", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientQueryDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Filter by city", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientQueryDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Page number", required: false, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], ClientQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Items per page", required: false, default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], ClientQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Search term", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientQueryDto.prototype, "search", void 0);
//# sourceMappingURL=client.dto.js.map
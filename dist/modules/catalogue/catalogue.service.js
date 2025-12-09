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
exports.CatalogueService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const serializer_1 = require("../../utils/serializer");
const catalogue_schema_1 = require("./catalogue.schema");
const catalogue_response_1 = require("../../constants/api-response/catalogue.response");
let CatalogueService = class CatalogueService {
    constructor(catalogueModel) {
        this.catalogueModel = catalogueModel;
    }
    async create(createCatalogueDto) {
        const existingItem = await this.catalogueModel.findOne({
            partNumber: createCatalogueDto.partNumber,
        });
        if (existingItem) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, catalogue_response_1.CatalogueErrorMessages.ALREADY_EXISTS);
        }
        const catalogueItem = await this.catalogueModel.create(createCatalogueDto);
        return (0, serializer_1.SerializeHttpResponse)(catalogueItem, common_1.HttpStatus.CREATED, catalogue_response_1.CatalogueSuccessMessages.CREATED);
    }
    async findAll(queryDto = {}) {
        const { page = 1, limit = 10, search, categoryId, manufacturer } = queryDto;
        const filter = {};
        if (search) {
            filter.$or = [
                { itemName: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { partNumber: { $regex: search, $options: "i" } },
                { modelNumber: { $regex: search, $options: "i" } },
                { manufacturer: { $regex: search, $options: "i" } },
            ];
        }
        if (categoryId) {
            filter.categoryId = categoryId;
        }
        if (manufacturer) {
            filter.manufacturer = { $regex: manufacturer, $options: "i" };
        }
        const skip = (page - 1) * limit;
        console.log("filter ", filter);
        const [catalogueItems, total] = await Promise.all([
            this.catalogueModel
                .find(filter)
                .populate("categoryId", "name")
                .sort({ createdAt: -1 }),
            this.catalogueModel.countDocuments(filter),
        ]);
        console.log("total ", catalogueItems);
        const result = {
            catalogueItems,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
        return (0, serializer_1.SerializeHttpResponse)(result, common_1.HttpStatus.OK, catalogue_response_1.CatalogueSuccessMessages.RETRIEVED_ALL);
    }
    async findOne(id) {
        const catalogueItem = await this.catalogueModel
            .findById(id)
            .populate("categoryId", "name");
        if (!catalogueItem) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, catalogue_response_1.CatalogueErrorMessages.NOT_FOUND);
        }
        return (0, serializer_1.SerializeHttpResponse)(catalogueItem, common_1.HttpStatus.OK, catalogue_response_1.CatalogueSuccessMessages.RETRIEVED);
    }
    async update(id, updateCatalogueDto) {
        const catalogueItem = await this.catalogueModel.findById(id);
        if (!catalogueItem) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, catalogue_response_1.CatalogueErrorMessages.NOT_FOUND);
        }
        if (updateCatalogueDto.partNumber &&
            updateCatalogueDto.partNumber !== catalogueItem.partNumber) {
            const existingItem = await this.catalogueModel.findOne({
                partNumber: updateCatalogueDto.partNumber,
                _id: { $ne: id },
            });
            if (existingItem) {
                return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, catalogue_response_1.CatalogueErrorMessages.ALREADY_EXISTS);
            }
        }
        const updatedCatalogueItem = await this.catalogueModel
            .findByIdAndUpdate(id, updateCatalogueDto, { new: true })
            .populate("categoryId", "name");
        return (0, serializer_1.SerializeHttpResponse)(updatedCatalogueItem, common_1.HttpStatus.OK, catalogue_response_1.CatalogueSuccessMessages.UPDATED);
    }
    async remove(id) {
        const catalogueItem = await this.catalogueModel.findById(id);
        if (!catalogueItem) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, catalogue_response_1.CatalogueErrorMessages.NOT_FOUND);
        }
        await this.catalogueModel.findByIdAndDelete(id);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, catalogue_response_1.CatalogueSuccessMessages.DELETED);
    }
};
exports.CatalogueService = CatalogueService;
exports.CatalogueService = CatalogueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(catalogue_schema_1.Catalogue.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CatalogueService);
//# sourceMappingURL=catalogue.service.js.map
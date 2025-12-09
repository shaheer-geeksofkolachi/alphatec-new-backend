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
exports.MaterialsService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const serializer_1 = require("../../utils/serializer");
const materials_schema_1 = require("./materials.schema");
const materials_response_1 = require("../../constants/api-response/materials.response");
let MaterialsService = class MaterialsService {
    constructor(materialsModel) {
        this.materialsModel = materialsModel;
    }
    async create(createMaterialsDto) {
        const existingMaterial = await this.materialsModel.findOne({
            name: createMaterialsDto.name,
        });
        if (existingMaterial) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, materials_response_1.MaterialsErrorMessages.ALREADY_EXISTS);
        }
        const material = await this.materialsModel.create(createMaterialsDto);
        return (0, serializer_1.SerializeHttpResponse)(material, common_1.HttpStatus.CREATED, materials_response_1.MaterialsSuccessMessages.CREATED);
    }
    async findAll(queryDto = {}) {
        const { page = 1, limit = 10, search, categoryId, unit, calculationMethod, } = queryDto;
        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { unit: { $regex: search, $options: "i" } },
                { calculationMethod: { $regex: search, $options: "i" } },
            ];
        }
        if (categoryId) {
            filter.categoryId = categoryId;
        }
        if (unit) {
            filter.unit = { $regex: unit, $options: "i" };
        }
        if (calculationMethod) {
            filter.calculationMethod = { $regex: calculationMethod, $options: "i" };
        }
        const skip = (page - 1) * limit;
        const [materials, total] = await Promise.all([
            this.materialsModel
                .find(filter)
                .populate("categoryId", "name color")
                .sort({ createdAt: -1 })
                .lean(),
            this.materialsModel.countDocuments(filter),
        ]);
        const result = {
            materials,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
        return (0, serializer_1.SerializeHttpResponse)(result, common_1.HttpStatus.OK, materials_response_1.MaterialsSuccessMessages.RETRIEVED_ALL);
    }
    async findOne(id) {
        const material = await this.materialsModel
            .findById(id)
            .populate("categoryId", "name");
        if (!material) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, materials_response_1.MaterialsErrorMessages.NOT_FOUND);
        }
        return (0, serializer_1.SerializeHttpResponse)(material, common_1.HttpStatus.OK, materials_response_1.MaterialsSuccessMessages.RETRIEVED);
    }
    async update(id, updateMaterialsDto) {
        const material = await this.materialsModel.findById(id);
        if (!material) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, materials_response_1.MaterialsErrorMessages.NOT_FOUND);
        }
        if (updateMaterialsDto.name && updateMaterialsDto.name !== material.name) {
            const existingMaterial = await this.materialsModel.findOne({
                name: updateMaterialsDto.name,
                _id: { $ne: id },
            });
            if (existingMaterial) {
                return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, materials_response_1.MaterialsErrorMessages.ALREADY_EXISTS);
            }
        }
        const updatedMaterial = await this.materialsModel
            .findByIdAndUpdate(id, updateMaterialsDto, { new: true })
            .populate("categoryId", "name");
        return (0, serializer_1.SerializeHttpResponse)(updatedMaterial, common_1.HttpStatus.OK, materials_response_1.MaterialsSuccessMessages.UPDATED);
    }
    async remove(id) {
        const material = await this.materialsModel.findById(id);
        if (!material) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, materials_response_1.MaterialsErrorMessages.NOT_FOUND);
        }
        await this.materialsModel.findByIdAndDelete(id);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, materials_response_1.MaterialsSuccessMessages.DELETED);
    }
};
exports.MaterialsService = MaterialsService;
exports.MaterialsService = MaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(materials_schema_1.Materials.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], MaterialsService);
//# sourceMappingURL=materials.service.js.map
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
exports.CategoriesService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const serializer_1 = require("../../utils/serializer");
const categories_schema_1 = require("./categories.schema");
const category_response_1 = require("../../constants/api-response/category.response");
let CategoriesService = class CategoriesService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async create(createCategoryDto) {
        console.log("createCategoryDto in service: ", createCategoryDto);
        const existingCategory = await this.categoryModel.findOne({
            name: { $regex: new RegExp(`^${createCategoryDto.name}$`, "i") },
        });
        if (existingCategory) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, category_response_1.CategoryErrorMessages.ALREADY_EXISTS);
        }
        const category = await this.categoryModel.create(createCategoryDto);
        return (0, serializer_1.SerializeHttpResponse)(category, common_1.HttpStatus.CREATED, category_response_1.CategorySuccessMessages.CREATED);
    }
    async findAll(queryDto = {}) {
        const { page = 1, limit = 10, search } = queryDto;
        const filter = {};
        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }
        const skip = (page - 1) * limit;
        const [categories, total] = await Promise.all([
            this.categoryModel
                .find(filter)
                .sort({ createdAt: -1 }),
            this.categoryModel.countDocuments(filter),
        ]);
        const result = {
            categories,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
        return (0, serializer_1.SerializeHttpResponse)(result, common_1.HttpStatus.OK, category_response_1.CategorySuccessMessages.RETRIEVED_ALL);
    }
    async findOne(id) {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, category_response_1.CategoryErrorMessages.NOT_FOUND);
        }
        return (0, serializer_1.SerializeHttpResponse)(category, common_1.HttpStatus.OK, category_response_1.CategorySuccessMessages.RETRIEVED);
    }
    async update(id, updateCategoryDto) {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, category_response_1.CategoryErrorMessages.NOT_FOUND);
        }
        if (updateCategoryDto.name &&
            updateCategoryDto.name.toLowerCase() !== category.name.toLowerCase()) {
            const existingCategory = await this.categoryModel.findOne({
                name: { $regex: new RegExp(`^${updateCategoryDto.name}$`, "i") },
                _id: { $ne: id },
            });
            if (existingCategory) {
                return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, category_response_1.CategoryErrorMessages.ALREADY_EXISTS);
            }
        }
        const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
        return (0, serializer_1.SerializeHttpResponse)(updatedCategory, common_1.HttpStatus.OK, category_response_1.CategorySuccessMessages.UPDATED);
    }
    async remove(id) {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, category_response_1.CategoryErrorMessages.NOT_FOUND);
        }
        await this.categoryModel.findByIdAndDelete(id);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, category_response_1.CategorySuccessMessages.DELETED);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(categories_schema_1.Categories.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map
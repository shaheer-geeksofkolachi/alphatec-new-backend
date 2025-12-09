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
exports.DetailedCostsService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const serializer_1 = require("../../../utils/serializer");
const detailed_costs_schema_1 = require("../schemas/detailed-costs.schema");
const projects_service_1 = require("../projects.service");
let DetailedCostsService = class DetailedCostsService {
    constructor(detailedCostsModel, projectsService) {
        this.detailedCostsModel = detailedCostsModel;
        this.projectsService = projectsService;
    }
    async create(projectId, createDto) {
        const project = await this.projectsService.findOne(projectId);
        if (!project || project.status !== common_1.HttpStatus.OK) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Project not found");
        }
        const payload = {
            ...createDto,
            projectId: new mongoose_1.Types.ObjectId(projectId),
        };
        console.log("payload create: ", payload);
        const detailedCost = await this.detailedCostsModel.create(payload);
        console.log("payload: ", detailedCost);
        return (0, serializer_1.SerializeHttpResponse)(detailedCost, common_1.HttpStatus.CREATED, "Detailed cost created successfully");
    }
    async findAll(projectId) {
        const project = await this.projectsService.findOne(projectId);
        if (!project || project.status !== common_1.HttpStatus.OK) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Project not found");
        }
        const detailedCosts = await this.detailedCostsModel
            .find({ projectId: new mongoose_1.Types.ObjectId(projectId) })
            .sort({ createdAt: -1 });
        return (0, serializer_1.SerializeHttpResponse)(detailedCosts, common_1.HttpStatus.OK, "Detailed costs retrieved successfully");
    }
    async findOne(projectId, costId) {
        const detailedCost = await this.detailedCostsModel.findOne({
            _id: new mongoose_1.Types.ObjectId(costId),
            projectId: new mongoose_1.Types.ObjectId(projectId),
        });
        if (!detailedCost) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Detailed cost not found");
        }
        return (0, serializer_1.SerializeHttpResponse)(detailedCost, common_1.HttpStatus.OK, "Detailed cost retrieved successfully");
    }
    async update(projectId, costId, updateDto) {
        console.log("inside update of detailed costs");
        const detailedCost = await this.detailedCostsModel.findOne({
            _id: new mongoose_1.Types.ObjectId(costId),
            projectId: new mongoose_1.Types.ObjectId(projectId),
        });
        if (!detailedCost) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Detailed cost not found");
        }
        const updatedDetailedCost = await this.detailedCostsModel
            .findByIdAndUpdate(costId, updateDto, { new: true })
            .exec();
        return (0, serializer_1.SerializeHttpResponse)(updatedDetailedCost, common_1.HttpStatus.OK, "Detailed cost updated successfully");
    }
    async remove(projectId, costId) {
        const detailedCost = await this.detailedCostsModel.findOne({
            _id: new mongoose_1.Types.ObjectId(costId),
            projectId: new mongoose_1.Types.ObjectId(projectId),
        });
        if (!detailedCost) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Detailed cost not found");
        }
        await this.detailedCostsModel.findByIdAndDelete(costId);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, "Detailed cost deleted successfully");
    }
};
exports.DetailedCostsService = DetailedCostsService;
exports.DetailedCostsService = DetailedCostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(detailed_costs_schema_1.DetailedCosts.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        projects_service_1.ProjectsService])
], DetailedCostsService);
//# sourceMappingURL=detailed-costs.service.js.map
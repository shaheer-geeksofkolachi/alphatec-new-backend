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
exports.OfficialEstimationService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const serializer_1 = require("../../../utils/serializer");
const official_estimation_schema_1 = require("../schemas/official-estimation.schema");
const projects_service_1 = require("../projects.service");
let OfficialEstimationService = class OfficialEstimationService {
    constructor(officialEstimationModel, projectsService) {
        this.officialEstimationModel = officialEstimationModel;
        this.projectsService = projectsService;
    }
    async create(projectId, createDto, userId) {
        const project = await this.projectsService.findOne(projectId);
        if (!project || project.status !== common_1.HttpStatus.OK) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Project not found");
        }
        const existingEstimation = await this.officialEstimationModel.findOne({
            projectId: new mongoose_1.Types.ObjectId(projectId),
        });
        if (existingEstimation) {
            const updatedEstimation = await this.officialEstimationModel
                .findByIdAndUpdate(existingEstimation._id, createDto, { new: true })
                .populate("creadoPor", "name email")
                .exec();
            return (0, serializer_1.SerializeHttpResponse)(updatedEstimation, common_1.HttpStatus.OK, "Official estimation updated successfully");
        }
        const payload = {
            ...createDto,
            projectId: new mongoose_1.Types.ObjectId(projectId),
            creadoPor: new mongoose_1.Types.ObjectId(userId),
        };
        console.log('here 4 ');
        const estimation = await this.officialEstimationModel.create(payload);
        return (0, serializer_1.SerializeHttpResponse)(estimation, common_1.HttpStatus.CREATED, "Official estimation created successfully");
    }
    async findOne(projectId) {
        const project = await this.projectsService.findOne(projectId);
        if (!project || project.status !== common_1.HttpStatus.OK) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Project not found");
        }
        const estimation = await this.officialEstimationModel
            .findOne({ projectId: new mongoose_1.Types.ObjectId(projectId) })
            .populate("creadoPor", "name email");
        if (!estimation) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Official estimation not found");
        }
        return (0, serializer_1.SerializeHttpResponse)(estimation, common_1.HttpStatus.OK, "Official estimation retrieved successfully");
    }
    async update(projectId, updateDto) {
        const estimation = await this.officialEstimationModel.findOne({
            projectId: new mongoose_1.Types.ObjectId(projectId),
        });
        if (!estimation) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Official estimation not found");
        }
        const updatedEstimation = await this.officialEstimationModel
            .findByIdAndUpdate(estimation._id, updateDto, { new: true })
            .populate("creadoPor", "name email")
            .exec();
        return (0, serializer_1.SerializeHttpResponse)(updatedEstimation, common_1.HttpStatus.OK, "Official estimation updated successfully");
    }
    async remove(projectId) {
        const estimation = await this.officialEstimationModel.findOne({
            projectId: new mongoose_1.Types.ObjectId(projectId),
        });
        if (!estimation) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Official estimation not found");
        }
        await this.officialEstimationModel.findByIdAndDelete(estimation._id);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, "Official estimation deleted successfully");
    }
};
exports.OfficialEstimationService = OfficialEstimationService;
exports.OfficialEstimationService = OfficialEstimationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(official_estimation_schema_1.OfficialEstimation.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        projects_service_1.ProjectsService])
], OfficialEstimationService);
//# sourceMappingURL=official-estimation.service.js.map
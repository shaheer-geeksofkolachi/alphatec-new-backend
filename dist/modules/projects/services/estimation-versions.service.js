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
exports.EstimationVersionsService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const serializer_1 = require("../../../utils/serializer");
const estimation_versions_schema_1 = require("../schemas/estimation-versions.schema");
const projects_service_1 = require("../projects.service");
let EstimationVersionsService = class EstimationVersionsService {
    constructor(estimationVersionsModel, projectsService) {
        this.estimationVersionsModel = estimationVersionsModel;
        this.projectsService = projectsService;
    }
    async create(projectId, createDto, userId) {
        const project = await this.projectsService.findOne(projectId);
        if (!project || project.status !== common_1.HttpStatus.OK) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Project not found");
        }
        const payload = {
            ...createDto,
            projectId: new mongoose_1.Types.ObjectId(projectId),
            creadoPor: new mongoose_1.Types.ObjectId(userId),
        };
        const version = await this.estimationVersionsModel.create(payload);
        return (0, serializer_1.SerializeHttpResponse)(version, common_1.HttpStatus.CREATED, "Estimation version created successfully");
    }
    async findAll(projectId) {
        const project = await this.projectsService.findOne(projectId);
        if (!project || project.status !== common_1.HttpStatus.OK) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Project not found");
        }
        const versions = await this.estimationVersionsModel
            .find({ projectId: new mongoose_1.Types.ObjectId(projectId) })
            .populate("creadoPor", "name email")
            .sort({ createdAt: -1 });
        return (0, serializer_1.SerializeHttpResponse)(versions, common_1.HttpStatus.OK, "Estimation versions retrieved successfully");
    }
    async findOne(projectId, versionId) {
        const version = await this.estimationVersionsModel
            .findOne({
            _id: new mongoose_1.Types.ObjectId(versionId),
            projectId: new mongoose_1.Types.ObjectId(projectId),
        })
            .populate("creadoPor", "name email");
        if (!version) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Estimation version not found");
        }
        return (0, serializer_1.SerializeHttpResponse)(version, common_1.HttpStatus.OK, "Estimation version retrieved successfully");
    }
    async update(projectId, versionId, updateDto) {
        const version = await this.estimationVersionsModel.findOne({
            _id: new mongoose_1.Types.ObjectId(versionId),
            projectId: new mongoose_1.Types.ObjectId(projectId),
        });
        if (!version) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Estimation version not found");
        }
        const updatedVersion = await this.estimationVersionsModel
            .findByIdAndUpdate(versionId, updateDto, { new: true })
            .populate("creadoPor", "name email")
            .exec();
        return (0, serializer_1.SerializeHttpResponse)(updatedVersion, common_1.HttpStatus.OK, "Estimation version updated successfully");
    }
    async remove(projectId, versionId) {
        const version = await this.estimationVersionsModel.findOne({
            _id: new mongoose_1.Types.ObjectId(versionId),
            projectId: new mongoose_1.Types.ObjectId(projectId),
        });
        if (!version) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Estimation version not found");
        }
        await this.estimationVersionsModel.findByIdAndDelete(versionId);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, "Estimation version deleted successfully");
    }
};
exports.EstimationVersionsService = EstimationVersionsService;
exports.EstimationVersionsService = EstimationVersionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(estimation_versions_schema_1.EstimationVersions.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        projects_service_1.ProjectsService])
], EstimationVersionsService);
//# sourceMappingURL=estimation-versions.service.js.map
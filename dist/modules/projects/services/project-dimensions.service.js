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
exports.ProjectDimensionsService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const serializer_1 = require("../../../utils/serializer");
const project_dimensions_schema_1 = require("../schemas/project-dimensions.schema");
const projects_service_1 = require("../projects.service");
let ProjectDimensionsService = class ProjectDimensionsService {
    constructor(projectDimensionsModel, projectsService) {
        this.projectDimensionsModel = projectDimensionsModel;
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
        const dimensions = await this.projectDimensionsModel.create(payload);
        return (0, serializer_1.SerializeHttpResponse)(dimensions, common_1.HttpStatus.CREATED, "Project dimensions created successfully");
    }
    async findAll(projectId) {
        const project = await this.projectsService.findOne(projectId);
        if (!project || project.status !== common_1.HttpStatus.OK) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Project not found");
        }
        const dimensions = await this.projectDimensionsModel
            .find({ projectId: new mongoose_1.Types.ObjectId(projectId) })
            .sort({ createdAt: -1 });
        return (0, serializer_1.SerializeHttpResponse)(dimensions, common_1.HttpStatus.OK, "Project dimensions retrieved successfully");
    }
    async findOne(projectId, dimensionId) {
        const dimension = await this.projectDimensionsModel.findOne({
            _id: new mongoose_1.Types.ObjectId(dimensionId),
            projectId: new mongoose_1.Types.ObjectId(projectId),
        });
        if (!dimension) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Project dimension not found");
        }
        return (0, serializer_1.SerializeHttpResponse)(dimension, common_1.HttpStatus.OK, "Project dimension retrieved successfully");
    }
    async update(projectId, dimensionId, updateDto) {
        const dimension = await this.projectDimensionsModel.findOne({
            _id: new mongoose_1.Types.ObjectId(dimensionId),
            projectId: new mongoose_1.Types.ObjectId(projectId),
        });
        if (!dimension) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Project dimension not found");
        }
        const updatedDimension = await this.projectDimensionsModel
            .findByIdAndUpdate(dimensionId, updateDto, { new: true })
            .exec();
        return (0, serializer_1.SerializeHttpResponse)(updatedDimension, common_1.HttpStatus.OK, "Project dimension updated successfully");
    }
    async remove(projectId, dimensionId) {
        const dimension = await this.projectDimensionsModel.findOne({
            _id: new mongoose_1.Types.ObjectId(dimensionId),
            projectId: new mongoose_1.Types.ObjectId(projectId),
        });
        if (!dimension) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Project dimension not found");
        }
        await this.projectDimensionsModel.findByIdAndDelete(dimensionId);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, "Project dimension deleted successfully");
    }
};
exports.ProjectDimensionsService = ProjectDimensionsService;
exports.ProjectDimensionsService = ProjectDimensionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(project_dimensions_schema_1.ProjectDimensions.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        projects_service_1.ProjectsService])
], ProjectDimensionsService);
//# sourceMappingURL=project-dimensions.service.js.map
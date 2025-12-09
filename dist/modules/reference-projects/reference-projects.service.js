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
exports.ReferenceProjectsService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const serializer_1 = require("../../utils/serializer");
const categories_service_1 = require("../categories/categories.service");
const reference_projects_schema_1 = require("./reference-projects.schema");
const reference_project_response_1 = require("../../constants/api-response/reference-project.response");
const clients_service_1 = require("../clients/clients.service");
const media_service_1 = require("../media/media.service");
const media_constant_1 = require("../../constants/media.constant");
let ReferenceProjectsService = class ReferenceProjectsService {
    constructor(referenceProjectModel, categoriesService, clientService, mediaService) {
        this.referenceProjectModel = referenceProjectModel;
        this.categoriesService = categoriesService;
        this.clientService = clientService;
        this.mediaService = mediaService;
    }
    async create(createReferenceProjectDto) {
        const client = await this.clientService.findOne(createReferenceProjectDto.clientId);
        if (!client || client.status !== common_1.HttpStatus.OK) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, reference_project_response_1.ReferenceProjectErrorMessages.INVALID_CLIENT);
        }
        const category = await this.categoriesService.findOne(createReferenceProjectDto.categoryId);
        if (!category || category.status !== common_1.HttpStatus.OK) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, reference_project_response_1.ReferenceProjectErrorMessages.INVALID_CATEGORY);
        }
        const payload = {
            ...createReferenceProjectDto,
            clientId: new mongoose_1.Types.ObjectId(createReferenceProjectDto.clientId),
            categoryId: new mongoose_1.Types.ObjectId(createReferenceProjectDto.categoryId),
        };
        const referenceProject = await this.referenceProjectModel.create(payload);
        await referenceProject.populate([
            { path: "clientId", select: "name email phone" },
            { path: "categoryId", select: "name description" },
        ]);
        return (0, serializer_1.SerializeHttpResponse)(referenceProject, common_1.HttpStatus.CREATED, reference_project_response_1.ReferenceProjectSuccessMessages.CREATED);
    }
    async findAll(queryDto = {}) {
        const { clientId, categoryId, projectType, workType, machineType, useAsProjectTemplate, page = 1, limit = 10, search, } = queryDto;
        const filter = {};
        if (clientId)
            filter.clientId = new mongoose_1.Types.ObjectId(clientId);
        if (categoryId)
            filter.categoryId = new mongoose_1.Types.ObjectId(categoryId);
        if (projectType)
            filter.projectType = projectType;
        if (workType)
            filter.workType = workType;
        if (machineType)
            filter.machineType = machineType;
        if (useAsProjectTemplate !== undefined)
            filter.useAsProjectTemplate = useAsProjectTemplate;
        if (search) {
            filter.$or = [
                { projectName: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { projectType: { $regex: search, $options: "i" } },
                { workType: { $regex: search, $options: "i" } },
                { machineType: { $regex: search, $options: "i" } },
            ];
        }
        const skip = (page - 1) * limit;
        const [referenceProjects, total] = await Promise.all([
            this.referenceProjectModel
                .find(filter)
                .populate([
                { path: "clientId", select: "name email phone" },
                { path: "categoryId", select: "name description" },
            ])
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            this.referenceProjectModel.countDocuments(filter),
        ]);
        const result = {
            referenceProjects,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
        return (0, serializer_1.SerializeHttpResponse)(result, common_1.HttpStatus.OK, reference_project_response_1.ReferenceProjectSuccessMessages.RETRIEVED_ALL);
    }
    async findOne(id) {
        const referenceProject = await this.referenceProjectModel
            .findById(id)
            .populate([
            { path: "clientId", select: "name email phone" },
            { path: "categoryId", select: "name description" },
        ]);
        if (!referenceProject) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, reference_project_response_1.ReferenceProjectErrorMessages.NOT_FOUND);
        }
        return (0, serializer_1.SerializeHttpResponse)(referenceProject, common_1.HttpStatus.OK, reference_project_response_1.ReferenceProjectSuccessMessages.RETRIEVED);
    }
    async update(id, updateReferenceProjectDto) {
        const referenceProject = await this.referenceProjectModel.findById(id);
        if (!referenceProject) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, reference_project_response_1.ReferenceProjectErrorMessages.NOT_FOUND);
        }
        if (updateReferenceProjectDto.clientId) {
            const client = await this.clientService.findOne(updateReferenceProjectDto.clientId);
            if (!client || client.status !== common_1.HttpStatus.OK) {
                return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, reference_project_response_1.ReferenceProjectErrorMessages.INVALID_CLIENT);
            }
        }
        if (updateReferenceProjectDto.categoryId) {
            const category = await this.categoriesService.findOne(updateReferenceProjectDto.categoryId);
            if (!category || category.status !== common_1.HttpStatus.OK) {
                return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, reference_project_response_1.ReferenceProjectErrorMessages.INVALID_CATEGORY);
            }
        }
        const payload = { ...updateReferenceProjectDto };
        if (updateReferenceProjectDto.clientId) {
            payload.clientId = new mongoose_1.Types.ObjectId(updateReferenceProjectDto.clientId);
        }
        if (updateReferenceProjectDto.categoryId) {
            payload.categoryId = new mongoose_1.Types.ObjectId(updateReferenceProjectDto.categoryId);
        }
        const updatedReferenceProject = await this.referenceProjectModel
            .findByIdAndUpdate(id, payload, { new: true })
            .populate([
            { path: "clientId", select: "name email phone" },
            { path: "categoryId", select: "name description" },
        ]);
        return (0, serializer_1.SerializeHttpResponse)(updatedReferenceProject, common_1.HttpStatus.OK, reference_project_response_1.ReferenceProjectSuccessMessages.UPDATED);
    }
    async remove(id) {
        const referenceProject = await this.referenceProjectModel.findById(id);
        if (!referenceProject) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, reference_project_response_1.ReferenceProjectErrorMessages.NOT_FOUND);
        }
        await this.referenceProjectModel.findByIdAndDelete(id);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, reference_project_response_1.ReferenceProjectSuccessMessages.DELETED);
    }
    async findTemplates() {
        const templates = await this.referenceProjectModel
            .find({ useAsProjectTemplate: true })
            .populate([
            { path: "clientId", select: "name email phone" },
            { path: "categoryId", select: "name description" },
        ])
            .sort({ createdAt: -1 });
        return (0, serializer_1.SerializeHttpResponse)(templates, common_1.HttpStatus.OK, reference_project_response_1.ReferenceProjectSuccessMessages.RETRIEVED_ALL);
    }
    async uploadImages(id, files, imageType) {
        const referenceProject = await this.referenceProjectModel.findById(id);
        if (!referenceProject) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, reference_project_response_1.ReferenceProjectErrorMessages.NOT_FOUND);
        }
        if (!files || files.length === 0) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, "No files provided");
        }
        const uploadPromises = files.map(async (file) => {
            const timestamp = Date.now();
            const fileName = `${id}_${imageType}_${timestamp}_${file.originalname}`;
            const result = await this.mediaService.uploadProfile(media_constant_1.FOLDER_NAME.REFERENCE_PROJECTS, file, fileName);
            return result?.url || null;
        });
        const uploadedUrls = (await Promise.all(uploadPromises)).filter((url) => url !== null);
        if (uploadedUrls.length === 0) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload images");
        }
        const fieldToUpdate = imageType === "before" ? "beforeImages" : "afterImages";
        const currentImages = referenceProject[fieldToUpdate] || [];
        const updatedImages = [...currentImages, ...uploadedUrls];
        const updatedReferenceProject = await this.referenceProjectModel
            .findByIdAndUpdate(id, { [fieldToUpdate]: updatedImages }, { new: true })
            .populate([
            { path: "clientId", select: "name email phone" },
            { path: "categoryId", select: "name description" },
        ]);
        return (0, serializer_1.SerializeHttpResponse)({ referenceProject: updatedReferenceProject, uploadedUrls }, common_1.HttpStatus.OK, `Successfully uploaded ${uploadedUrls.length} ${imageType} image(s)`);
    }
    async deleteImage(id, imageUrl, imageType) {
        const referenceProject = await this.referenceProjectModel.findById(id);
        if (!referenceProject) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, reference_project_response_1.ReferenceProjectErrorMessages.NOT_FOUND);
        }
        const fieldToUpdate = imageType === "before" ? "beforeImages" : "afterImages";
        const currentImages = referenceProject[fieldToUpdate] || [];
        const updatedImages = currentImages.filter((url) => url !== imageUrl);
        if (currentImages.length === updatedImages.length) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Image URL not found in reference project");
        }
        try {
            const urlParts = imageUrl.split("/");
            const fileName = urlParts.slice(3).join("/");
            await this.mediaService.deleteImage(fileName);
        }
        catch (error) {
            console.error("Error deleting image from S3:", error);
        }
        const updatedReferenceProject = await this.referenceProjectModel
            .findByIdAndUpdate(id, { [fieldToUpdate]: updatedImages }, { new: true })
            .populate([
            { path: "clientId", select: "name email phone" },
            { path: "categoryId", select: "name description" },
        ]);
        return (0, serializer_1.SerializeHttpResponse)(updatedReferenceProject, common_1.HttpStatus.OK, `Successfully deleted ${imageType} image`);
    }
};
exports.ReferenceProjectsService = ReferenceProjectsService;
exports.ReferenceProjectsService = ReferenceProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(reference_projects_schema_1.ReferenceProject.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        categories_service_1.CategoriesService,
        clients_service_1.ClientsService,
        media_service_1.MediaService])
], ReferenceProjectsService);
//# sourceMappingURL=reference-projects.service.js.map
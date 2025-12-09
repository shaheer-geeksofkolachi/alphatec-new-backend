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
exports.ProjectsService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const serializer_1 = require("../../utils/serializer");
const projects_schema_1 = require("./projects.schema");
const project_response_1 = require("../../constants/api-response/project.response");
const clients_service_1 = require("../clients/clients.service");
const media_service_1 = require("../media/media.service");
const media_constant_1 = require("../../constants/media.constant");
const official_estimation_schema_1 = require("./schemas/official-estimation.schema");
const project_types_schema_1 = require("./project-types.schema");
const work_types_schema_1 = require("./work-types.schema");
const user_service_1 = require("../user/user.service");
const email_service_1 = require("../email/email.service");
const user_schema_1 = require("../user/user.schema");
let ProjectsService = class ProjectsService {
    constructor(projectModel, officialEstimationModel, clientsService, mediaService, projectTypeModel, workTypeModel, userService, emailService, userModel) {
        this.projectModel = projectModel;
        this.officialEstimationModel = officialEstimationModel;
        this.clientsService = clientsService;
        this.mediaService = mediaService;
        this.projectTypeModel = projectTypeModel;
        this.workTypeModel = workTypeModel;
        this.userService = userService;
        this.emailService = emailService;
        this.userModel = userModel;
    }
    async create(createProjectDto) {
        const existingProject = await this.projectModel.findOne({
            projectCode: createProjectDto.projectCode.toUpperCase(),
        });
        if (existingProject) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, project_response_1.ProjectErrorMessages.ALREADY_EXISTS);
        }
        const client = await this.clientsService.findOne(createProjectDto.clientId);
        if (!client || client.status !== common_1.HttpStatus.OK) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, project_response_1.ProjectErrorMessages.INVALID_CLIENT);
        }
        const payload = {
            ...createProjectDto,
            projectCode: createProjectDto.projectCode.toUpperCase(),
            clientId: new mongoose_1.Types.ObjectId(createProjectDto.clientId),
        };
        const project = await this.projectModel.create(payload);
        await project.populate([{ path: "clientId", select: "name email phone" }]);
        return (0, serializer_1.SerializeHttpResponse)(project, common_1.HttpStatus.CREATED, project_response_1.ProjectSuccessMessages.CREATED);
    }
    async findAll(queryDto = {}, currentUserId, currentUserEmail) {
        const { status, financialStatus, clientId, page = 1, limit = 10, search, } = queryDto;
        const filter = {};
        if (status)
            filter.status = status;
        if (financialStatus)
            filter.financialStatus = financialStatus;
        if (clientId)
            filter.clientId = new mongoose_1.Types.ObjectId(clientId);
        if (currentUserEmail?.toLowerCase() !== "shaheer@geeksofkolachi.com" && currentUserId) {
            filter.allowedUsers = new mongoose_1.Types.ObjectId(currentUserId);
        }
        if (search) {
            const searchFilter = [
                { projectName: { $regex: search, $options: "i" } },
                { projectCode: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
            if (filter.allowedUsers) {
                filter.$and = [
                    { allowedUsers: filter.allowedUsers },
                    { $or: searchFilter }
                ];
                delete filter.allowedUsers;
            }
            else {
                filter.$or = searchFilter;
            }
        }
        const skip = (page - 1) * limit;
        const [projects, total] = await Promise.all([
            this.projectModel
                .find(filter)
                .populate("clientId")
                .populate("allowedUsers")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            this.projectModel.countDocuments(filter),
        ]);
        const result = {
            projects,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
        return (0, serializer_1.SerializeHttpResponse)(result, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.RETRIEVED_ALL);
    }
    async findOne(id) {
        const project = await this.projectModel.findById(id).populate("clientId");
        if (!project) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        return (0, serializer_1.SerializeHttpResponse)(project, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.RETRIEVED);
    }
    async findByCode(projectCode) {
        const project = await this.projectModel
            .findOne({ projectCode })
            .populate("clientId");
        if (!project) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        return (0, serializer_1.SerializeHttpResponse)(project, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.RETRIEVED);
    }
    async update(id, updateProjectDto) {
        const project = await this.projectModel.findById(id);
        console.log("inside update ", project);
        if (!project) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        if (updateProjectDto.projectCode &&
            updateProjectDto.projectCode !== project.projectCode) {
            const existingProject = await this.projectModel.findOne({
                projectCode: updateProjectDto.projectCode.toUpperCase(),
                _id: { $ne: id },
            });
            if (existingProject) {
                return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, project_response_1.ProjectErrorMessages.ALREADY_EXISTS);
            }
        }
        if (updateProjectDto.clientId) {
            const client = await this.clientsService.findOne(updateProjectDto.clientId);
            if (!client || client.status !== common_1.HttpStatus.OK) {
                return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, project_response_1.ProjectErrorMessages.INVALID_CLIENT);
            }
        }
        const payload = { ...updateProjectDto };
        if (updateProjectDto.clientId) {
            payload.clientId = new mongoose_1.Types.ObjectId(updateProjectDto.clientId);
        }
        const updatedProject = await this.projectModel
            .findByIdAndUpdate(id, payload, { new: true })
            .populate([{ path: "clientId", select: "name email phone" }]);
        return (0, serializer_1.SerializeHttpResponse)(updatedProject, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.UPDATED);
    }
    async updateStatus(id, updateStatusDto) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        const updatedProject = await this.projectModel
            .findByIdAndUpdate(id, { status: updateStatusDto.status }, { new: true })
            .populate([{ path: "clientId", select: "name email phone" }]);
        return (0, serializer_1.SerializeHttpResponse)(updatedProject, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.STATUS_UPDATED);
    }
    async updateFinancialStatus(id, updateFinancialStatusDto) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        const updatedProject = await this.projectModel
            .findByIdAndUpdate(id, { financialStatus: updateFinancialStatusDto.financialStatus }, { new: true })
            .populate([{ path: "clientId", select: "name email phone" }]);
        return (0, serializer_1.SerializeHttpResponse)(updatedProject, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.FINANCIAL_STATUS_UPDATED);
    }
    async remove(id) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        await this.projectModel.findByIdAndDelete(id);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.DELETED);
    }
    async uploadImages(id, files, imageType) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        if (!files || files.length === 0) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, "No files provided");
        }
        console.log("files provided : ", files);
        const uploadPromises = files.map(async (file) => {
            const timestamp = Date.now();
            const fileName = `${id}_${imageType}_${timestamp}_${file.originalname}`;
            const result = await this.mediaService.uploadProfile(media_constant_1.FOLDER_NAME.PROJECTS, file, fileName);
            return result?.url || null;
        });
        const uploadedUrls = (await Promise.all(uploadPromises)).filter((url) => url !== null);
        console.log("uploadedUrls : ", uploadedUrls);
        if (uploadedUrls.length === 0) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload images");
        }
        const fieldToUpdate = imageType === "before" ? "beforeImages" : "afterImages";
        const currentImages = project[fieldToUpdate] || [];
        const updatedImages = [...currentImages, ...uploadedUrls];
        const updatedProject = await this.projectModel
            .findByIdAndUpdate(id, { [fieldToUpdate]: updatedImages }, { new: true })
            .populate([{ path: "clientId", select: "name email phone" }]);
        return (0, serializer_1.SerializeHttpResponse)({ project: updatedProject, uploadedUrls }, common_1.HttpStatus.OK, `Successfully uploaded ${uploadedUrls.length} ${imageType} image(s)`);
    }
    async deleteImage(id, imageUrl, imageType) {
        const project = await this.projectModel.findById(id);
        if (!project) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        const fieldToUpdate = imageType === "before" ? "beforeImages" : "afterImages";
        const currentImages = project[fieldToUpdate] || [];
        const updatedImages = currentImages.filter((url) => url !== imageUrl);
        if (currentImages.length === updatedImages.length) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, "Image URL not found in project");
        }
        try {
            const urlParts = imageUrl.split("/");
            const fileName = urlParts.slice(3).join("/");
            await this.mediaService.deleteImage(fileName);
        }
        catch (error) {
            console.error("Error deleting image from S3:", error);
        }
        const updatedProject = await this.projectModel
            .findByIdAndUpdate(id, { [fieldToUpdate]: updatedImages }, { new: true })
            .populate([{ path: "clientId", select: "name email phone" }]);
        return (0, serializer_1.SerializeHttpResponse)(updatedProject, common_1.HttpStatus.OK, `Successfully deleted ${imageType} image`);
    }
    async importProjectsWithEstimations(projectsArray) {
        if (!Array.isArray(projectsArray) || projectsArray.length === 0) {
            throw new common_1.BadRequestException("No project data provided");
        }
        const createdProjects = [];
        for (const p of projectsArray) {
            const projectData = {
                projectName: p.projectName,
                projectCode: p.projectCode,
                clientId: p.clientId ? new mongoose_1.Types.ObjectId(p.clientId) : undefined,
                description: p.description,
                location: p.location,
                country: p.country,
                status: p.status?.toUpperCase() || "PROPOSAL",
                projectType: p.projectType,
                workTypes: p.workTypes?.split(",") || [],
                machineTypes: p.machineTypes?.split(",") || [],
                presupuestoEstimado: p.presupuestoEstimado || 0,
                margenEstimado: p.margenEstimado || 0,
                createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
                updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
            };
            createdProjects.push(projectData);
        }
        let insertedProjects = [];
        try {
            insertedProjects = await this.projectModel.insertMany(createdProjects, {
                ordered: false,
            });
            console.log("✅ Inserted projects count:", insertedProjects.length);
        }
        catch (err) {
            console.error("❌ Insert error:", err);
            if (err.writeErrors) {
                err.writeErrors.forEach((e, i) => {
                    console.log(`Error ${i + 1}:`, e.err.op);
                    console.log("Validation message:", e.err.errmsg);
                });
            }
            if (err.mongoose?.validationErrors) {
                console.log("Mongoose validation errors:", err.mongoose.validationErrors);
            }
            if (err.result?.result?.insertedIds) {
                const insertedIds = Object.values(err.result.result.insertedIds);
                insertedProjects = await this.projectModel.find({
                    _id: { $in: insertedIds },
                });
            }
        }
        console.log("📦 Inserted Projects:", insertedProjects.map((p) => p._id));
        const estimationsToInsert = insertedProjects.map((project, index) => {
            const original = projectsArray[index];
            return {
                projectId: project._id,
                versionName: "Official Estimation",
                notes: original.notes || "",
                foundation: {
                    length: original.foundationLength?.toString() || "",
                    width: original.foundationWidth?.toString() || "",
                    height: original.foundationHeight?.toString() || "",
                    quantity: original.foundationQuantity?.toString() || "",
                    notes: original.foundationNotes || "",
                },
                anchorBolts: {
                    numberOfBolts: original.anchorBoltQuantity?.toString() || "",
                    length: original.anchorBoltLength?.toString() || "",
                    boltType: original.anchorBoltDiameter?.toString() || "",
                    notes: original.anchorBoltNotes || "",
                },
                skidFill: {
                    length: original.skidLength?.toString() || "",
                    width: original.skidWidth?.toString() || "",
                    height: original.skidHeight?.toString() || "",
                    fillPercentage: original.fillPercentage || 0,
                    notes: original.skidNotes || "",
                },
                totalConcrete: 0,
                totalSteel: 0,
                materialCost: 0,
                laborCost: 0,
                additionalCosts: 0,
                totalCost: 0,
                creadoPor: "",
                calculationResults: {
                    materials: 0,
                    labor: 0,
                    total: 0,
                },
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });
        if (estimationsToInsert.length > 0) {
            try {
                const insertedEstimations = await this.officialEstimationModel.insertMany(estimationsToInsert, {
                    ordered: false,
                    rawResult: true,
                });
                console.log("here : ", insertedEstimations.mongoose.validationErrors);
                console.log(`✅ Successfully inserted ${insertedEstimations.insertedCount || estimationsToInsert.length} official estimations`);
            }
            catch (err) {
                console.error("❌ Error inserting official estimations:", err);
                if (err.writeErrors && Array.isArray(err.writeErrors)) {
                    console.error(`🧩 Found ${err.writeErrors.length} write errors:`);
                    err.writeErrors.forEach((we, idx) => {
                        console.error(`  ${idx + 1}. Message: ${we.err.errmsg || we.err.message}`);
                        console.error("     Failed document:", we.err.op);
                    });
                }
                if (err.mongoose?.validationErrors?.length) {
                    console.error("🧠 Mongoose validation errors:");
                    err.mongoose.validationErrors.forEach((ve, idx) => {
                        console.error(`  ${idx + 1}. ${ve.message}`);
                    });
                }
                if (err.message)
                    console.error("📄 Error message:", err.message);
                if (err.stack)
                    console.error("📜 Stack trace:", err.stack);
            }
        }
        else {
            console.warn("⚠️ No estimations to insert.");
        }
        return {
            message: `Successfully imported ${insertedProjects.length} projects and linked estimations`,
            totalInserted: insertedProjects.length,
        };
    }
    async getProjectTypes() {
        const projectTypes = await this.projectTypeModel
            .find()
            .populate("clientId");
        return (0, serializer_1.SerializeHttpResponse)(projectTypes, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.RETRIEVED_ALL);
    }
    async createProjectType(createProjectTypeDto) {
        const projectType = await this.projectTypeModel.create(createProjectTypeDto);
        return (0, serializer_1.SerializeHttpResponse)(projectType, common_1.HttpStatus.CREATED, project_response_1.ProjectSuccessMessages.CREATED);
    }
    async updateProjectType(id, updateProjectTypeDto) {
        const projectType = await this.projectTypeModel.findByIdAndUpdate(id, updateProjectTypeDto, { new: true });
        if (!projectType) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        return (0, serializer_1.SerializeHttpResponse)(projectType, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.UPDATED);
    }
    async deleteProjectType(id) {
        const projectType = await this.projectTypeModel.findById(id);
        if (!projectType) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        const deletebyid = await this.projectTypeModel.findByIdAndDelete(id);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.DELETED);
    }
    async getWorkTypes() {
        const projectTypes = await this.workTypeModel
            .find()
            .populate("clientId");
        return (0, serializer_1.SerializeHttpResponse)(projectTypes, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.RETRIEVED_ALL);
    }
    async createWorkType(createProjectTypeDto) {
        const projectType = await this.workTypeModel.create(createProjectTypeDto);
        return (0, serializer_1.SerializeHttpResponse)(projectType, common_1.HttpStatus.CREATED, project_response_1.ProjectSuccessMessages.CREATED);
    }
    async updateWorkType(id, updateProjectTypeDto) {
        const projectType = await this.workTypeModel.findByIdAndUpdate(id, updateProjectTypeDto, { new: true });
        if (!projectType) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        return (0, serializer_1.SerializeHttpResponse)(projectType, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.UPDATED);
    }
    async deleteWorkType(id) {
        const projectType = await this.workTypeModel.findById(id);
        if (!projectType) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        const deletebyid = await this.workTypeModel.findByIdAndDelete(id);
        return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.OK, project_response_1.ProjectSuccessMessages.DELETED);
    }
    async assignProjectRights(projectId, assignDto, currentUserEmail) {
        const project = await this.projectModel.findById(projectId);
        if (!project) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        if (currentUserEmail.toLowerCase() !== "shaheer@geeksofkolachi.com") {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.FORBIDDEN, "Only admin can assign project rights");
        }
        let userId;
        if (assignDto.userId) {
            userId = new mongoose_1.Types.ObjectId(assignDto.userId);
            if (!project.allowedUsers) {
                project.allowedUsers = [];
            }
            if (!project.allowedUsers.some((id) => id.toString() === userId.toString())) {
                project.allowedUsers.push(userId);
                await project.save();
            }
        }
        else if (assignDto.email) {
            const existingUser = await this.userModel.findOne({ email: assignDto.email.toLowerCase() });
            if (existingUser) {
                userId = existingUser._id;
                if (!project.allowedUsers) {
                    project.allowedUsers = [];
                }
                if (!project.allowedUsers.some((id) => id.toString() === userId.toString())) {
                    project.allowedUsers.push(userId);
                    await project.save();
                }
            }
            else {
                const signupUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/register?email=${encodeURIComponent(assignDto.email)}&projectId=${projectId}`;
                await this.emailService.sendEmail({
                    to: assignDto.email,
                    subject: `Invitation to access project: ${project.projectName}`,
                    html: `
            <p>You have been invited to access the project: <strong>${project.projectName}</strong></p>
            <p>Click the link below to sign up and access the project:</p>
            <p><a href="${signupUrl}">Sign Up and Access Project</a></p>
          `,
                });
                return (0, serializer_1.SerializeHttpResponse)({ message: "Invitation sent successfully" }, common_1.HttpStatus.OK, "Invitation sent to email");
            }
        }
        else {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.BAD_REQUEST, "Either userId or email must be provided");
        }
        return (0, serializer_1.SerializeHttpResponse)(project, common_1.HttpStatus.OK, "Project rights assigned successfully");
    }
    async revokeProjectRights(projectId, revokeDto, currentUserEmail) {
        const project = await this.projectModel.findById(projectId);
        if (!project) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        if (currentUserEmail.toLowerCase() !== "shaheer@geeksofkolachi.com") {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.FORBIDDEN, "Only admin can revoke project rights");
        }
        if (project.allowedUsers) {
            project.allowedUsers = project.allowedUsers.filter((id) => id.toString() !== revokeDto.userId);
            await project.save();
        }
        return (0, serializer_1.SerializeHttpResponse)(project, common_1.HttpStatus.OK, "Project rights revoked successfully");
    }
    async getProjectAllowedUsers(projectId) {
        const project = await this.projectModel.findById(projectId).populate("allowedUsers");
        if (!project) {
            return (0, serializer_1.SerializeHttpResponse)(null, common_1.HttpStatus.NOT_FOUND, project_response_1.ProjectErrorMessages.NOT_FOUND);
        }
        return (0, serializer_1.SerializeHttpResponse)({ allowedUsers: project.allowedUsers || [] }, common_1.HttpStatus.OK, "Project allowed users retrieved successfully");
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(projects_schema_1.Project.name)),
    __param(1, (0, mongoose_2.InjectModel)(official_estimation_schema_1.OfficialEstimation.name)),
    __param(4, (0, mongoose_2.InjectModel)(project_types_schema_1.ProjectType.name)),
    __param(5, (0, mongoose_2.InjectModel)(work_types_schema_1.WorkType.name)),
    __param(8, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        clients_service_1.ClientsService,
        media_service_1.MediaService,
        mongoose_1.Model,
        mongoose_1.Model,
        user_service_1.UserService,
        email_service_1.EmailService,
        mongoose_1.Model])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map
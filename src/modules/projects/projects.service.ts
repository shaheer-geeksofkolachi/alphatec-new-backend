import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, HttpStatus, BadRequestException } from "@nestjs/common";
import { SerializeHttpResponse } from "src/utils/serializer";
import {
  CreateProjectDto,
  UpdateProjectDto,
  UpdateProjectStatusDto,
  UpdateProjectFinancialStatusDto,
  ProjectQueryDto,
} from "./dto/project.dto";
import { Project, ProjectDocument } from "./projects.schema";
import {
  ProjectErrorMessages,
  ProjectSuccessMessages,
} from "src/constants/api-response/project.response";
import { ClientsService } from "../clients/clients.service";
import { MediaService } from "../media/media.service";
import { FOLDER_NAME } from "src/constants/media.constant";
import { OfficialEstimation } from "./schemas/official-estimation.schema";
import { ProjectType } from "./project-types.schema";
import {
  CreateProjectTypeDto,
  UpdateProjectTypeDto,
} from "./dto/create-project-type.dto";
import { WorkType } from "./work-types.schema";
import { CreateWorkTypeDto, UpdateWorkTypeDto } from "./dto/create-work-type.dto";
import { UserService } from "../user/user.service";
import { EmailService } from "../email/email.service";
import { AssignProjectRightsDto, RevokeProjectRightsDto } from "./dto/project.dto";
import { User } from "../user/user.schema";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
    @InjectModel(OfficialEstimation.name)
    private readonly officialEstimationModel: Model<OfficialEstimation>,
    private readonly clientsService: ClientsService,
    private readonly mediaService: MediaService,
    @InjectModel(ProjectType.name)
    private readonly projectTypeModel: Model<ProjectType>,
    @InjectModel(WorkType.name)
    private readonly workTypeModel: Model<WorkType>,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {}

  //  constructor(
  //   @InjectModel(Project.name) private projectModel: Model<Project>,
  //   @InjectModel(OfficialEstimation.name)
  //   private officialEstimationModel: Model<OfficialEstimation>
  // ) {}

  async create(createProjectDto: CreateProjectDto) {
    // Check if project code already exists
    const existingProject = await this.projectModel.findOne({
      projectCode: createProjectDto.projectCode.toUpperCase(),
    });

    if (existingProject) {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        ProjectErrorMessages.ALREADY_EXISTS
      );
    }

    // Verify client exists
    const client = await this.clientsService.findOne(createProjectDto.clientId);
    if (!client || client.status !== HttpStatus.OK) {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        ProjectErrorMessages.INVALID_CLIENT
      );
    }

    const payload: any = {
      ...createProjectDto,
      projectCode: createProjectDto.projectCode.toUpperCase(),
      clientId: new Types.ObjectId(createProjectDto.clientId),
    };

    const project = await this.projectModel.create(payload);
    await project.populate([{ path: "clientId", select: "name email phone" }]);

    return SerializeHttpResponse(
      project,
      HttpStatus.CREATED,
      ProjectSuccessMessages.CREATED
    );
  }

  async findAll(queryDto: ProjectQueryDto = {}, currentUserId?: string, currentUserEmail?: string) {
    const {
      status,
      financialStatus,
      clientId,
      page = 1,
      limit = 10,
      search,
    } = queryDto;

    const filter: any = {};

    if (status) filter.status = status;
    if (financialStatus) filter.financialStatus = financialStatus;
    if (clientId) filter.clientId = new Types.ObjectId(clientId);

    // Filter by user access - admin sees all, others only see projects they have access to
    if (currentUserEmail?.toLowerCase() !== "shaheer@geeksofkolachi.com" && currentUserId) {
      filter.allowedUsers = new Types.ObjectId(currentUserId);
    }

    if (search) {
      const searchFilter = [
        { projectName: { $regex: search, $options: "i" } },
        { projectCode: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
      if (filter.allowedUsers) {
        // Combine search with user filter
        filter.$and = [
          { allowedUsers: filter.allowedUsers },
          { $or: searchFilter }
        ];
        delete filter.allowedUsers;
      } else {
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

    return SerializeHttpResponse(
      result,
      HttpStatus.OK,
      ProjectSuccessMessages.RETRIEVED_ALL
    );
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id).populate("clientId");

    if (!project) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    return SerializeHttpResponse(
      project,
      HttpStatus.OK,
      ProjectSuccessMessages.RETRIEVED
    );
  }

  async findByCode(projectCode: string) {
    const project = await this.projectModel
      .findOne({ projectCode })
      .populate("clientId");

    if (!project) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    return SerializeHttpResponse(
      project,
      HttpStatus.OK,
      ProjectSuccessMessages.RETRIEVED
    );
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectModel.findById(id);

    console.log("inside update ", project)

    if (!project) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    // Check if project code is being updated and if it already exists
    if (
      updateProjectDto.projectCode &&
      updateProjectDto.projectCode !== project.projectCode
    ) {
      const existingProject = await this.projectModel.findOne({
        projectCode: updateProjectDto.projectCode.toUpperCase(),
        _id: { $ne: id },
      });

      if (existingProject) {
        return SerializeHttpResponse(
          null,
          HttpStatus.BAD_REQUEST,
          ProjectErrorMessages.ALREADY_EXISTS
        );
      }
    }

    // Verify client exists if being updated
    if (updateProjectDto.clientId) {
      const client = await this.clientsService.findOne(
        updateProjectDto.clientId
      );
      if (!client || client.status !== HttpStatus.OK) {
        return SerializeHttpResponse(
          null,
          HttpStatus.BAD_REQUEST,
          ProjectErrorMessages.INVALID_CLIENT
        );
      }
    }

    const payload: any = { ...updateProjectDto };

    // Convert ObjectIds
    if (updateProjectDto.clientId) {
      payload.clientId = new Types.ObjectId(updateProjectDto.clientId);
    }

    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, payload, { new: true })
      .populate([{ path: "clientId", select: "name email phone" }]);

    return SerializeHttpResponse(
      updatedProject,
      HttpStatus.OK,
      ProjectSuccessMessages.UPDATED
    );
  }

  async updateStatus(id: string, updateStatusDto: UpdateProjectStatusDto) {
    const project = await this.projectModel.findById(id);

    if (!project) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, { status: updateStatusDto.status }, { new: true })
      .populate([{ path: "clientId", select: "name email phone" }]);

    return SerializeHttpResponse(
      updatedProject,
      HttpStatus.OK,
      ProjectSuccessMessages.STATUS_UPDATED
    );
  }

  async updateFinancialStatus(
    id: string,
    updateFinancialStatusDto: UpdateProjectFinancialStatusDto
  ) {
    const project = await this.projectModel.findById(id);

    if (!project) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    const updatedProject = await this.projectModel
      .findByIdAndUpdate(
        id,
        { financialStatus: updateFinancialStatusDto.financialStatus },
        { new: true }
      )
      .populate([{ path: "clientId", select: "name email phone" }]);

    return SerializeHttpResponse(
      updatedProject,
      HttpStatus.OK,
      ProjectSuccessMessages.FINANCIAL_STATUS_UPDATED
    );
  }

  async remove(id: string) {
    const project = await this.projectModel.findById(id);

    if (!project) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    await this.projectModel.findByIdAndDelete(id);

    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      ProjectSuccessMessages.DELETED
    );
  }

  async uploadImages(
    id: string,
    files: Express.Multer.File[],
    imageType: "before" | "after"
  ) {
    const project = await this.projectModel.findById(id);

    if (!project) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    if (!files || files.length === 0) {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        "No files provided"
      );
    }

    console.log("files provided : ", files);

    // Upload files to S3
    const uploadPromises = files.map(async (file) => {
      const timestamp = Date.now();
      const fileName = `${id}_${imageType}_${timestamp}_${file.originalname}`;

      const result = await this.mediaService.uploadProfile(
        FOLDER_NAME.PROJECTS,
        file,
        fileName
      );
      return result?.url || null;
    });

    const uploadedUrls = (await Promise.all(uploadPromises)).filter(
      (url) => url !== null
    );

    console.log("uploadedUrls : ", uploadedUrls);

    if (uploadedUrls.length === 0) {
      return SerializeHttpResponse(
        null,
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to upload images"
      );
    }

    // Update project with new image URLs
    const fieldToUpdate =
      imageType === "before" ? "beforeImages" : "afterImages";
    const currentImages = project[fieldToUpdate] || [];
    const updatedImages = [...currentImages, ...uploadedUrls];

    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, { [fieldToUpdate]: updatedImages }, { new: true })
      .populate([{ path: "clientId", select: "name email phone" }]);

    return SerializeHttpResponse(
      { project: updatedProject, uploadedUrls },
      HttpStatus.OK,
      `Successfully uploaded ${uploadedUrls.length} ${imageType} image(s)`
    );
  }

  async deleteImage(
    id: string,
    imageUrl: string,
    imageType: "before" | "after"
  ) {
    const project = await this.projectModel.findById(id);

    if (!project) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    const fieldToUpdate =
      imageType === "before" ? "beforeImages" : "afterImages";
    const currentImages = project[fieldToUpdate] || [];
    const updatedImages = currentImages.filter((url) => url !== imageUrl);

    if (currentImages.length === updatedImages.length) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Image URL not found in project"
      );
    }

    // Extract the file key from S3 URL and delete from S3
    try {
      const urlParts = imageUrl.split("/");
      const fileName = urlParts.slice(3).join("/"); // Get everything after the domain

      await this.mediaService.deleteImage(fileName);
    } catch (error) {
      console.error("Error deleting image from S3:", error);
      // Continue with database update even if S3 deletion fails
    }

    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, { [fieldToUpdate]: updatedImages }, { new: true })
      .populate([{ path: "clientId", select: "name email phone" }]);

    return SerializeHttpResponse(
      updatedProject,
      HttpStatus.OK,
      `Successfully deleted ${imageType} image`
    );
  }

  async importProjectsWithEstimations(projectsArray: any[]) {
    if (!Array.isArray(projectsArray) || projectsArray.length === 0) {
      throw new BadRequestException("No project data provided");
    }

    const createdProjects: any[] = [];

    for (const p of projectsArray) {
      const projectData: any = {
        projectName: p.projectName,
        projectCode: p.projectCode,
        clientId: p.clientId ? new Types.ObjectId(p.clientId) : undefined,
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

    let insertedProjects: ProjectDocument[] = [];

    try {
      insertedProjects = await this.projectModel.insertMany(createdProjects, {
        ordered: false,
      });
      console.log("✅ Inserted projects count:", insertedProjects.length);
    } catch (err) {
      console.error("❌ Insert error:", err);

      // Mongo bulk write errors (e.g., duplicates)
      if (err.writeErrors) {
        err.writeErrors.forEach((e, i) => {
          console.log(`Error ${i + 1}:`, e.err.op);
          console.log("Validation message:", e.err.errmsg);
        });
      }

      if (err.mongoose?.validationErrors) {
        console.log(
          "Mongoose validation errors:",
          err.mongoose.validationErrors
        );
      }

      if (err.result?.result?.insertedIds) {
        const insertedIds = Object.values(err.result.result.insertedIds);
        insertedProjects = await this.projectModel.find({
          _id: { $in: insertedIds },
        });
      }
    }

    console.log(
      "📦 Inserted Projects:",
      insertedProjects.map((p) => p._id)
    );

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
        const insertedEstimations =
          await this.officialEstimationModel.insertMany(estimationsToInsert, {
            ordered: false,
            rawResult: true,
          });

        console.log("here : ", insertedEstimations.mongoose.validationErrors);

        console.log(
          `✅ Successfully inserted ${
            insertedEstimations.insertedCount || estimationsToInsert.length
          } official estimations`
        );
      } catch (err) {
        console.error("❌ Error inserting official estimations:", err);

        if (err.writeErrors && Array.isArray(err.writeErrors)) {
          console.error(`🧩 Found ${err.writeErrors.length} write errors:`);
          err.writeErrors.forEach((we, idx) => {
            console.error(
              `  ${idx + 1}. Message: ${we.err.errmsg || we.err.message}`
            );
            console.error("     Failed document:", we.err.op);
          });
        }

        if (err.mongoose?.validationErrors?.length) {
          console.error("🧠 Mongoose validation errors:");
          err.mongoose.validationErrors.forEach((ve, idx) => {
            console.error(`  ${idx + 1}. ${ve.message}`);
          });
        }

        if (err.message) console.error("📄 Error message:", err.message);
        if (err.stack) console.error("📜 Stack trace:", err.stack);
      }
    } else {
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

    return SerializeHttpResponse(
      projectTypes,
      HttpStatus.OK,
      ProjectSuccessMessages.RETRIEVED_ALL
    );
  }

  async createProjectType(createProjectTypeDto: CreateProjectTypeDto) {
    const projectType =
      await this.projectTypeModel.create(createProjectTypeDto);
    return SerializeHttpResponse(
      projectType,
      HttpStatus.CREATED,
      ProjectSuccessMessages.CREATED
    );
  }

  async updateProjectType(
    id: string,
    updateProjectTypeDto: UpdateProjectTypeDto
  ) {
    const projectType = await this.projectTypeModel.findByIdAndUpdate(
      id,
      updateProjectTypeDto,
      { new: true }
    );

    if (!projectType) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    return SerializeHttpResponse(
      projectType,
      HttpStatus.OK,
      ProjectSuccessMessages.UPDATED
    );
  }

  async deleteProjectType(id: string) {
    const projectType = await this.projectTypeModel.findById(id);

    if (!projectType) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }
    const deletebyid = await this.projectTypeModel.findByIdAndDelete(id);
    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      ProjectSuccessMessages.DELETED
    );
  }

  async getWorkTypes() {
    const projectTypes = await this.workTypeModel
      .find()
      .populate("clientId");

    return SerializeHttpResponse(
      projectTypes,
      HttpStatus.OK,
      ProjectSuccessMessages.RETRIEVED_ALL
    );
  }

  async createWorkType(createProjectTypeDto: CreateWorkTypeDto) {
    const projectType =
      await this.workTypeModel.create(createProjectTypeDto);
    return SerializeHttpResponse(
      projectType,
      HttpStatus.CREATED,
      ProjectSuccessMessages.CREATED
    );
  }

  async updateWorkType(
    id: string,
    updateProjectTypeDto: UpdateWorkTypeDto
  ) {
    const projectType = await this.workTypeModel.findByIdAndUpdate(
      id,
      updateProjectTypeDto,
      { new: true }
    );

    if (!projectType) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    return SerializeHttpResponse(
      projectType,
      HttpStatus.OK,
      ProjectSuccessMessages.UPDATED
    );
  }

  async deleteWorkType(id: string) {
    const projectType = await this.workTypeModel.findById(id);

    if (!projectType) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }
    const deletebyid = await this.workTypeModel.findByIdAndDelete(id);
    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      ProjectSuccessMessages.DELETED
    );
  }

  async assignProjectRights(projectId: string, assignDto: AssignProjectRightsDto, currentUserEmail: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    // Check if admin (shaheer@geeksofkolachi.com) - they have full access
    if (currentUserEmail.toLowerCase() !== "shaheer@geeksofkolachi.com") {
      return SerializeHttpResponse(
        null,
        HttpStatus.FORBIDDEN,
        "Only admin can assign project rights"
      );
    }

    let userId: Types.ObjectId;

    if (assignDto.userId) {
      // User exists, assign rights
      userId = new Types.ObjectId(assignDto.userId);
      if (!project.allowedUsers) {
        project.allowedUsers = [];
      }
      if (!project.allowedUsers.some((id) => id.toString() === userId.toString())) {
        project.allowedUsers.push(userId);
        await project.save();
      }
    } else if (assignDto.email) {
      // Check if user exists with this email
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
      } else {
        // Send invitation email
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
        return SerializeHttpResponse(
          { message: "Invitation sent successfully" },
          HttpStatus.OK,
          "Invitation sent to email"
        );
      }
    } else {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        "Either userId or email must be provided"
      );
    }

    return SerializeHttpResponse(
      project,
      HttpStatus.OK,
      "Project rights assigned successfully"
    );
  }

  async revokeProjectRights(projectId: string, revokeDto: RevokeProjectRightsDto, currentUserEmail: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    // Check if admin
    if (currentUserEmail.toLowerCase() !== "shaheer@geeksofkolachi.com") {
      return SerializeHttpResponse(
        null,
        HttpStatus.FORBIDDEN,
        "Only admin can revoke project rights"
      );
    }

    if (project.allowedUsers) {
      project.allowedUsers = project.allowedUsers.filter(
        (id) => id.toString() !== revokeDto.userId
      );
      await project.save();
    }

    return SerializeHttpResponse(
      project,
      HttpStatus.OK,
      "Project rights revoked successfully"
    );
  }

  async getProjectAllowedUsers(projectId: string) {
    
    const project = await this.projectModel.findById(projectId).populate("allowedUsers");
    if (!project) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ProjectErrorMessages.NOT_FOUND
      );
    }

    return SerializeHttpResponse(
      { allowedUsers: project.allowedUsers || [] },
      HttpStatus.OK,
      "Project allowed users retrieved successfully"
    );
  }
}

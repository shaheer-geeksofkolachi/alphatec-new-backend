import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, HttpStatus } from "@nestjs/common";
import { SerializeHttpResponse } from "src/utils/serializer";
import {
  CreateReferenceProjectDto,
  UpdateReferenceProjectDto,
  ReferenceProjectQueryDto,
} from "./dto/reference-project.dto";
import { CategoriesService } from "../categories/categories.service";
import { ReferenceProject } from "./reference-projects.schema";
import {
  ReferenceProjectErrorMessages,
  ReferenceProjectSuccessMessages,
} from "src/constants/api-response/reference-project.response";
import { ClientsService } from "../clients/clients.service";
import { MediaService } from "../media/media.service";
import { FOLDER_NAME } from "src/constants/media.constant";

@Injectable()
export class ReferenceProjectsService {
  constructor(
    @InjectModel(ReferenceProject.name)
    private readonly referenceProjectModel: Model<ReferenceProject>,
    private readonly categoriesService: CategoriesService,
    private readonly clientService: ClientsService,
    private readonly mediaService: MediaService
  ) {}

  async create(createReferenceProjectDto: CreateReferenceProjectDto) {
    // Verify client exists
    const client = await this.clientService.findOne(
      createReferenceProjectDto.clientId
    );
    if (!client || client.status !== HttpStatus.OK) {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        ReferenceProjectErrorMessages.INVALID_CLIENT
      );
    }

    // Verify category exists
    const category = await this.categoriesService.findOne(
      createReferenceProjectDto.categoryId
    );
    if (!category || category.status !== HttpStatus.OK) {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        ReferenceProjectErrorMessages.INVALID_CATEGORY
      );
    }

    const payload: any = {
      ...createReferenceProjectDto,
      clientId: new Types.ObjectId(createReferenceProjectDto.clientId),
      categoryId: new Types.ObjectId(createReferenceProjectDto.categoryId),
    };

    const referenceProject = await this.referenceProjectModel.create(payload);
    await referenceProject.populate([
      { path: "clientId", select: "name email phone" },
      { path: "categoryId", select: "name description" },
    ]);

    return SerializeHttpResponse(
      referenceProject,
      HttpStatus.CREATED,
      ReferenceProjectSuccessMessages.CREATED
    );
  }

  async findAll(queryDto: ReferenceProjectQueryDto = {}) {
    const {
      clientId,
      categoryId,
      projectType,
      workType,
      machineType,
      useAsProjectTemplate,
      page = 1,
      limit = 10,
      search,
    } = queryDto;

    const filter: any = {};

    if (clientId) filter.clientId = new Types.ObjectId(clientId);
    if (categoryId) filter.categoryId = new Types.ObjectId(categoryId);
    if (projectType) filter.projectType = projectType;
    if (workType) filter.workType = workType;
    if (machineType) filter.machineType = machineType;
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

    return SerializeHttpResponse(
      result,
      HttpStatus.OK,
      ReferenceProjectSuccessMessages.RETRIEVED_ALL
    );
  }

  async findOne(id: string) {
    const referenceProject = await this.referenceProjectModel
      .findById(id)
      .populate([
        { path: "clientId", select: "name email phone" },
        { path: "categoryId", select: "name description" },
      ]);

    if (!referenceProject) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ReferenceProjectErrorMessages.NOT_FOUND
      );
    }

    return SerializeHttpResponse(
      referenceProject,
      HttpStatus.OK,
      ReferenceProjectSuccessMessages.RETRIEVED
    );
  }

  async update(
    id: string,
    updateReferenceProjectDto: UpdateReferenceProjectDto
  ) {
    const referenceProject = await this.referenceProjectModel.findById(id);

    if (!referenceProject) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ReferenceProjectErrorMessages.NOT_FOUND
      );
    }

    // Verify client exists if being updated
    if (updateReferenceProjectDto.clientId) {
      const client = await this.clientService.findOne(
        updateReferenceProjectDto.clientId
      );
      if (!client || client.status !== HttpStatus.OK) {
        return SerializeHttpResponse(
          null,
          HttpStatus.BAD_REQUEST,
          ReferenceProjectErrorMessages.INVALID_CLIENT
        );
      }
    }

    // Verify category exists if being updated
    if (updateReferenceProjectDto.categoryId) {
      const category = await this.categoriesService.findOne(
        updateReferenceProjectDto.categoryId
      );
      if (!category || category.status !== HttpStatus.OK) {
        return SerializeHttpResponse(
          null,
          HttpStatus.BAD_REQUEST,
          ReferenceProjectErrorMessages.INVALID_CATEGORY
        );
      }
    }

    const payload: any = { ...updateReferenceProjectDto };

    // Convert ObjectIds
    if (updateReferenceProjectDto.clientId) {
      payload.clientId = new Types.ObjectId(updateReferenceProjectDto.clientId);
    }
    if (updateReferenceProjectDto.categoryId) {
      payload.categoryId = new Types.ObjectId(
        updateReferenceProjectDto.categoryId
      );
    }

    const updatedReferenceProject = await this.referenceProjectModel
      .findByIdAndUpdate(id, payload, { new: true })
      .populate([
        { path: "clientId", select: "name email phone" },
        { path: "categoryId", select: "name description" },
      ]);

    return SerializeHttpResponse(
      updatedReferenceProject,
      HttpStatus.OK,
      ReferenceProjectSuccessMessages.UPDATED
    );
  }

  async remove(id: string) {
    const referenceProject = await this.referenceProjectModel.findById(id);

    if (!referenceProject) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ReferenceProjectErrorMessages.NOT_FOUND
      );
    }

    await this.referenceProjectModel.findByIdAndDelete(id);

    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      ReferenceProjectSuccessMessages.DELETED
    );
  }

  async findTemplates() {
    const templates = await this.referenceProjectModel
      .find({ useAsProjectTemplate: true })
      .populate([
        { path: "clientId", select: "name email phone" },
        { path: "categoryId", select: "name description" },
      ])
      .sort({ createdAt: -1 });

    return SerializeHttpResponse(
      templates,
      HttpStatus.OK,
      ReferenceProjectSuccessMessages.RETRIEVED_ALL
    );
  }

  async uploadImages(
    id: string,
    files: Express.Multer.File[],
    imageType: "before" | "after"
  ) {
    const referenceProject = await this.referenceProjectModel.findById(id);

    if (!referenceProject) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ReferenceProjectErrorMessages.NOT_FOUND
      );
    }

    if (!files || files.length === 0) {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        "No files provided"
      );
    }

    // Upload files to S3
    const uploadPromises = files.map(async (file) => {
      const timestamp = Date.now();
      const fileName = `${id}_${imageType}_${timestamp}_${file.originalname}`;
      const result = await this.mediaService.uploadProfile(
        FOLDER_NAME.REFERENCE_PROJECTS,
        file,
        fileName
      );
      return result?.url || null;
    });

    const uploadedUrls = (await Promise.all(uploadPromises)).filter(
      (url) => url !== null
    );

    if (uploadedUrls.length === 0) {
      return SerializeHttpResponse(
        null,
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to upload images"
      );
    }

    // Update reference project with new image URLs
    const fieldToUpdate =
      imageType === "before" ? "beforeImages" : "afterImages";
    const currentImages = referenceProject[fieldToUpdate] || [];
    const updatedImages = [...currentImages, ...uploadedUrls];

    const updatedReferenceProject = await this.referenceProjectModel
      .findByIdAndUpdate(id, { [fieldToUpdate]: updatedImages }, { new: true })
      .populate([
        { path: "clientId", select: "name email phone" },
        { path: "categoryId", select: "name description" },
      ]);

    return SerializeHttpResponse(
      { referenceProject: updatedReferenceProject, uploadedUrls },
      HttpStatus.OK,
      `Successfully uploaded ${uploadedUrls.length} ${imageType} image(s)`
    );
  }

  async deleteImage(
    id: string,
    imageUrl: string,
    imageType: "before" | "after"
  ) {
    const referenceProject = await this.referenceProjectModel.findById(id);

    if (!referenceProject) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        ReferenceProjectErrorMessages.NOT_FOUND
      );
    }

    const fieldToUpdate =
      imageType === "before" ? "beforeImages" : "afterImages";
    const currentImages = referenceProject[fieldToUpdate] || [];
    const updatedImages = currentImages.filter((url) => url !== imageUrl);

    if (currentImages.length === updatedImages.length) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Image URL not found in reference project"
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

    const updatedReferenceProject = await this.referenceProjectModel
      .findByIdAndUpdate(id, { [fieldToUpdate]: updatedImages }, { new: true })
      .populate([
        { path: "clientId", select: "name email phone" },
        { path: "categoryId", select: "name description" },
      ]);

    return SerializeHttpResponse(
      updatedReferenceProject,
      HttpStatus.OK,
      `Successfully deleted ${imageType} image`
    );
  }
}

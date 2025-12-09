import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, HttpStatus } from "@nestjs/common";
import { SerializeHttpResponse } from "src/utils/serializer";
import {
  CreateEstimationVersionDto,
  UpdateEstimationVersionDto,
} from "../dto/estimation-versions.dto";
import { EstimationVersions } from "../schemas/estimation-versions.schema";
import { ProjectsService } from "../projects.service";

@Injectable()
export class EstimationVersionsService {
  constructor(
    @InjectModel(EstimationVersions.name)
    private readonly estimationVersionsModel: Model<EstimationVersions>,
    private readonly projectsService: ProjectsService
  ) {}

  async create(
    projectId: string,
    createDto: CreateEstimationVersionDto,
    userId: string
  ) {
    // Verify project exists
    const project = await this.projectsService.findOne(projectId);
    if (!project || project.status !== HttpStatus.OK) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Project not found"
      );
    }

    const payload = {
      ...createDto,
      projectId: new Types.ObjectId(projectId),
      creadoPor: new Types.ObjectId(userId),
    };

    const version = await this.estimationVersionsModel.create(payload);

    return SerializeHttpResponse(
      version,
      HttpStatus.CREATED,
      "Estimation version created successfully"
    );
  }

  async findAll(projectId: string) {
    // Verify project exists
    const project = await this.projectsService.findOne(projectId);
    if (!project || project.status !== HttpStatus.OK) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Project not found"
      );
    }

    const versions = await this.estimationVersionsModel
      .find({ projectId: new Types.ObjectId(projectId) })
      .populate("creadoPor", "name email")
      .sort({ createdAt: -1 });

    return SerializeHttpResponse(
      versions,
      HttpStatus.OK,
      "Estimation versions retrieved successfully"
    );
  }

  async findOne(projectId: string, versionId: string) {
    const version = await this.estimationVersionsModel
      .findOne({
        _id: new Types.ObjectId(versionId),
        projectId: new Types.ObjectId(projectId),
      })
      .populate("creadoPor", "name email");

    if (!version) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Estimation version not found"
      );
    }

    return SerializeHttpResponse(
      version,
      HttpStatus.OK,
      "Estimation version retrieved successfully"
    );
  }

  async update(
    projectId: string,
    versionId: string,
    updateDto: UpdateEstimationVersionDto
  ) {
    const version = await this.estimationVersionsModel.findOne({
      _id: new Types.ObjectId(versionId),
      projectId: new Types.ObjectId(projectId),
    });

    if (!version) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Estimation version not found"
      );
    }

    const updatedVersion = await this.estimationVersionsModel
      .findByIdAndUpdate(versionId, updateDto, { new: true })
      .populate("creadoPor", "name email")
      .exec();

    return SerializeHttpResponse(
      updatedVersion,
      HttpStatus.OK,
      "Estimation version updated successfully"
    );
  }

  async remove(projectId: string, versionId: string) {
    const version = await this.estimationVersionsModel.findOne({
      _id: new Types.ObjectId(versionId),
      projectId: new Types.ObjectId(projectId),
    });

    if (!version) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Estimation version not found"
      );
    }

    await this.estimationVersionsModel.findByIdAndDelete(versionId);

    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      "Estimation version deleted successfully"
    );
  }
}

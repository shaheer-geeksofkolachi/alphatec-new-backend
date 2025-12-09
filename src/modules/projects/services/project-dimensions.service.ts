import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, HttpStatus } from "@nestjs/common";
import { SerializeHttpResponse } from "src/utils/serializer";
import {
  CreateProjectDimensionsDto,
  UpdateProjectDimensionsDto,
} from "../dto/project-dimensions.dto";
import { ProjectDimensions } from "../schemas/project-dimensions.schema";
import { ProjectsService } from "../projects.service";

@Injectable()
export class ProjectDimensionsService {
  constructor(
    @InjectModel(ProjectDimensions.name)
    private readonly projectDimensionsModel: Model<ProjectDimensions>,
    private readonly projectsService: ProjectsService
  ) {}

  async create(projectId: string, createDto: CreateProjectDimensionsDto) {
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
    };

    const dimensions = await this.projectDimensionsModel.create(payload);

    return SerializeHttpResponse(
      dimensions,
      HttpStatus.CREATED,
      "Project dimensions created successfully"
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

    const dimensions = await this.projectDimensionsModel
      .find({ projectId: new Types.ObjectId(projectId) })
      .sort({ createdAt: -1 });

    return SerializeHttpResponse(
      dimensions,
      HttpStatus.OK,
      "Project dimensions retrieved successfully"
    );
  }

  async findOne(projectId: string, dimensionId: string) {
    const dimension = await this.projectDimensionsModel.findOne({
      _id: new Types.ObjectId(dimensionId),
      projectId: new Types.ObjectId(projectId),
    });

    if (!dimension) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Project dimension not found"
      );
    }

    return SerializeHttpResponse(
      dimension,
      HttpStatus.OK,
      "Project dimension retrieved successfully"
    );
  }

  async update(
    projectId: string,
    dimensionId: string,
    updateDto: UpdateProjectDimensionsDto
  ) {
    const dimension = await this.projectDimensionsModel.findOne({
      _id: new Types.ObjectId(dimensionId),
      projectId: new Types.ObjectId(projectId),
    });

    if (!dimension) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Project dimension not found"
      );
    }

    const updatedDimension = await this.projectDimensionsModel
      .findByIdAndUpdate(dimensionId, updateDto, { new: true })
      .exec();

    return SerializeHttpResponse(
      updatedDimension,
      HttpStatus.OK,
      "Project dimension updated successfully"
    );
  }

  async remove(projectId: string, dimensionId: string) {
    const dimension = await this.projectDimensionsModel.findOne({
      _id: new Types.ObjectId(dimensionId),
      projectId: new Types.ObjectId(projectId),
    });

    if (!dimension) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Project dimension not found"
      );
    }

    await this.projectDimensionsModel.findByIdAndDelete(dimensionId);

    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      "Project dimension deleted successfully"
    );
  }
}

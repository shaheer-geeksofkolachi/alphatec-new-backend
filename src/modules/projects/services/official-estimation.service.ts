import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, HttpStatus } from "@nestjs/common";
import { SerializeHttpResponse } from "src/utils/serializer";
import {
  CreateOfficialEstimationDto,
  UpdateOfficialEstimationDto,
} from "../dto/official-estimation.dto";
import { OfficialEstimation } from "../schemas/official-estimation.schema";
import { ProjectsService } from "../projects.service";

@Injectable()
export class OfficialEstimationService {
  constructor(
    @InjectModel(OfficialEstimation.name)
    private readonly officialEstimationModel: Model<OfficialEstimation>,
    private readonly projectsService: ProjectsService
  ) {}

  async create(
    projectId: string,
    createDto: CreateOfficialEstimationDto,
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

    // Check if official estimation already exists for this project
    const existingEstimation = await this.officialEstimationModel.findOne({
      projectId: new Types.ObjectId(projectId),
    });

    if (existingEstimation) {
      // Update existing estimation
      const updatedEstimation = await this.officialEstimationModel
        .findByIdAndUpdate(existingEstimation._id, createDto, { new: true })
        .populate("creadoPor", "name email")
        .exec();

      return SerializeHttpResponse(
        updatedEstimation,
        HttpStatus.OK,
        "Official estimation updated successfully"
      );
    }

    const payload = {
      ...createDto,
      projectId: new Types.ObjectId(projectId),
      creadoPor: new Types.ObjectId(userId),
    };

            console.log('here 4 ')


    const estimation = await this.officialEstimationModel.create(payload);

    return SerializeHttpResponse(
      estimation,
      HttpStatus.CREATED,
      "Official estimation created successfully"
    );
  }

  async findOne(projectId: string) {
    // Verify project exists
    const project = await this.projectsService.findOne(projectId);
    if (!project || project.status !== HttpStatus.OK) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Project not found"
      );
    }

    const estimation = await this.officialEstimationModel
      .findOne({ projectId: new Types.ObjectId(projectId) })
      .populate("creadoPor", "name email");

    if (!estimation) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Official estimation not found"
      );
    }

    return SerializeHttpResponse(
      estimation,
      HttpStatus.OK,
      "Official estimation retrieved successfully"
    );
  }

  async update(projectId: string, updateDto: UpdateOfficialEstimationDto) {
    const estimation = await this.officialEstimationModel.findOne({
      projectId: new Types.ObjectId(projectId),
    });

    if (!estimation) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Official estimation not found"
      );
    }

    const updatedEstimation = await this.officialEstimationModel
      .findByIdAndUpdate(estimation._id, updateDto, { new: true })
      .populate("creadoPor", "name email")
      .exec();

    return SerializeHttpResponse(
      updatedEstimation,
      HttpStatus.OK,
      "Official estimation updated successfully"
    );
  }

  async remove(projectId: string) {
    const estimation = await this.officialEstimationModel.findOne({
      projectId: new Types.ObjectId(projectId),
    });

    if (!estimation) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Official estimation not found"
      );
    }

    await this.officialEstimationModel.findByIdAndDelete(estimation._id);

    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      "Official estimation deleted successfully"
    );
  }
}

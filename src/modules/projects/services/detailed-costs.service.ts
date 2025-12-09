import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, HttpStatus } from "@nestjs/common";
import { SerializeHttpResponse } from "src/utils/serializer";
import {
  CreateDetailedCostDto,
  UpdateDetailedCostDto,
} from "../dto/detailed-costs.dto";
import { DetailedCosts } from "../schemas/detailed-costs.schema";
import { ProjectsService } from "../projects.service";

@Injectable()
export class DetailedCostsService {
  constructor(
    @InjectModel(DetailedCosts.name)
    private readonly detailedCostsModel: Model<DetailedCosts>,
    private readonly projectsService: ProjectsService
  ) {}

  async create(projectId: string, createDto: CreateDetailedCostDto) {
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

    console.log("payload create: ", payload);

    const detailedCost = await this.detailedCostsModel.create(payload);

    console.log("payload: ", detailedCost);

    return SerializeHttpResponse(
      detailedCost,
      HttpStatus.CREATED,
      "Detailed cost created successfully"
    );
  }

  async findAll(projectId: string) {
    // console.log("inside fillAll detailed");
    // Verify project exists
    const project = await this.projectsService.findOne(projectId);
    // console.log("inside fillAll detailed 1 ", project);

    if (!project || project.status !== HttpStatus.OK) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Project not found"
      );
    }

    const detailedCosts = await this.detailedCostsModel
      .find({ projectId: new Types.ObjectId(projectId) })
      .sort({ createdAt: -1 });

    return SerializeHttpResponse(
      detailedCosts,
      HttpStatus.OK,
      "Detailed costs retrieved successfully"
    );
  }

  async findOne(projectId: string, costId: string) {
    const detailedCost = await this.detailedCostsModel.findOne({
      _id: new Types.ObjectId(costId),
      projectId: new Types.ObjectId(projectId),
    });

    if (!detailedCost) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Detailed cost not found"
      );
    }

    return SerializeHttpResponse(
      detailedCost,
      HttpStatus.OK,
      "Detailed cost retrieved successfully"
    );
  }

  async update(
    projectId: string,
    costId: string,
    updateDto: UpdateDetailedCostDto
  ) {
    console.log("inside update of detailed costs");
    const detailedCost = await this.detailedCostsModel.findOne({
      _id: new Types.ObjectId(costId),
      projectId: new Types.ObjectId(projectId),
    });

    if (!detailedCost) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Detailed cost not found"
      );
    }

    const updatedDetailedCost = await this.detailedCostsModel
      .findByIdAndUpdate(costId, updateDto, { new: true })
      .exec();

    return SerializeHttpResponse(
      updatedDetailedCost,
      HttpStatus.OK,
      "Detailed cost updated successfully"
    );
  }

  async remove(projectId: string, costId: string) {
    const detailedCost = await this.detailedCostsModel.findOne({
      _id: new Types.ObjectId(costId),
      projectId: new Types.ObjectId(projectId),
    });

    if (!detailedCost) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        "Detailed cost not found"
      );
    }

    await this.detailedCostsModel.findByIdAndDelete(costId);

    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      "Detailed cost deleted successfully"
    );
  }
}

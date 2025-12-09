import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, HttpStatus } from "@nestjs/common";
import { SerializeHttpResponse } from "src/utils/serializer";
import {
  CreateMaterialsDto,
  UpdateMaterialsDto,
  MaterialsQueryDto,
} from "./dto/materials.dto";
import { Materials } from "./materials.schema";
import {
  MaterialsErrorMessages,
  MaterialsSuccessMessages,
} from "src/constants/api-response/materials.response";

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Materials.name)
    private readonly materialsModel: Model<Materials>
  ) {}

  async create(createMaterialsDto: CreateMaterialsDto) {
    // Check if material name already exists
    const existingMaterial = await this.materialsModel.findOne({
      name: createMaterialsDto.name,
    });

    if (existingMaterial) {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        MaterialsErrorMessages.ALREADY_EXISTS
      );
    }

    const material = await this.materialsModel.create(createMaterialsDto);

    return SerializeHttpResponse(
      material,
      HttpStatus.CREATED,
      MaterialsSuccessMessages.CREATED
    );
  }

  async findAll(queryDto: MaterialsQueryDto = {}) {
    const {
      page = 1,
      limit = 10,
      search,
      categoryId,
      unit,
      calculationMethod,
    } = queryDto;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { unit: { $regex: search, $options: "i" } },
        { calculationMethod: { $regex: search, $options: "i" } },
      ];
    }

    if (categoryId) {
      filter.categoryId = categoryId;
    }

    if (unit) {
      filter.unit = { $regex: unit, $options: "i" };
    }

    if (calculationMethod) {
      filter.calculationMethod = { $regex: calculationMethod, $options: "i" };
    }

    const skip = (page - 1) * limit;

    // const [materials, total] = await Promise.all([
    //   this.materialsModel
    //     .find(filter)
    //     .populate("categoryId", "name")
    //     .sort({ createdAt: -1 })
    //     .skip(skip)
    //     .limit(limit),
    //   this.materialsModel.countDocuments(filter),
    // ]);

    const [materials, total] = await Promise.all([
      this.materialsModel
        .find(filter)
        .populate("categoryId", "name color")
        .sort({ createdAt: -1 })
        .lean(),
      this.materialsModel.countDocuments(filter),
    ]);

    const result = {
      materials,
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
      MaterialsSuccessMessages.RETRIEVED_ALL
    );
  }

  async findOne(id: string) {
    const material = await this.materialsModel
      .findById(id)
      .populate("categoryId", "name");

    if (!material) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        MaterialsErrorMessages.NOT_FOUND
      );
    }

    return SerializeHttpResponse(
      material,
      HttpStatus.OK,
      MaterialsSuccessMessages.RETRIEVED
    );
  }

  async update(id: string, updateMaterialsDto: UpdateMaterialsDto) {
    const material = await this.materialsModel.findById(id);

    if (!material) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        MaterialsErrorMessages.NOT_FOUND
      );
    }

    // Check if material name is being updated and if it already exists
    if (updateMaterialsDto.name && updateMaterialsDto.name !== material.name) {
      const existingMaterial = await this.materialsModel.findOne({
        name: updateMaterialsDto.name,
        _id: { $ne: id },
      });

      if (existingMaterial) {
        return SerializeHttpResponse(
          null,
          HttpStatus.BAD_REQUEST,
          MaterialsErrorMessages.ALREADY_EXISTS
        );
      }
    }

    const updatedMaterial = await this.materialsModel
      .findByIdAndUpdate(id, updateMaterialsDto, { new: true })
      .populate("categoryId", "name");

    return SerializeHttpResponse(
      updatedMaterial,
      HttpStatus.OK,
      MaterialsSuccessMessages.UPDATED
    );
  }

  async remove(id: string) {
    const material = await this.materialsModel.findById(id);

    if (!material) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        MaterialsErrorMessages.NOT_FOUND
      );
    }

    await this.materialsModel.findByIdAndDelete(id);

    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      MaterialsSuccessMessages.DELETED
    );
  }
}

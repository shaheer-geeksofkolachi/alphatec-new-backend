import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, HttpStatus } from "@nestjs/common";
import { SerializeHttpResponse } from "src/utils/serializer";
import {
  CreateCatalogueDto,
  UpdateCatalogueDto,
  CatalogueQueryDto,
} from "./dto/catalogue.dto";
import { Catalogue, CatalogueDocument } from "./catalogue.schema";
import {
  CatalogueErrorMessages,
  CatalogueSuccessMessages,
} from "src/constants/api-response/catalogue.response";

@Injectable()
export class CatalogueService {
  constructor(
    @InjectModel(Catalogue.name)
    private readonly catalogueModel: Model<Catalogue>
  ) {}

  async create(createCatalogueDto: CreateCatalogueDto) {
    // Check if part number already exists
    const existingItem = await this.catalogueModel.findOne({
      partNumber: createCatalogueDto.partNumber,
    });

    if (existingItem) {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        CatalogueErrorMessages.ALREADY_EXISTS
      );
    }

    const catalogueItem = await this.catalogueModel.create(createCatalogueDto);

    return SerializeHttpResponse(
      catalogueItem,
      HttpStatus.CREATED,
      CatalogueSuccessMessages.CREATED
    );
  }

  async findAll(queryDto: CatalogueQueryDto = {}) {
    const { page = 1, limit = 10, search, categoryId, manufacturer } = queryDto;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { itemName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { partNumber: { $regex: search, $options: "i" } },
        { modelNumber: { $regex: search, $options: "i" } },
        { manufacturer: { $regex: search, $options: "i" } },
      ];
    }

    if (categoryId) {
      filter.categoryId = categoryId;
    }

    if (manufacturer) {
      filter.manufacturer = { $regex: manufacturer, $options: "i" };
    }

    const skip = (page - 1) * limit;

    console.log("filter ", filter);

    const [catalogueItems, total] = await Promise.all([
      this.catalogueModel
        .find(filter)
        .populate("categoryId", "name")
        .sort({ createdAt: -1 }),
      // .skip(skip)
      // .limit(limit)
      this.catalogueModel.countDocuments(filter),
    ]);
    console.log("total ", catalogueItems);

    const result = {
      catalogueItems,
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
      CatalogueSuccessMessages.RETRIEVED_ALL
    );
  }

  async findOne(id: string) {
    const catalogueItem = await this.catalogueModel
      .findById(id)
      .populate("categoryId", "name");

    if (!catalogueItem) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        CatalogueErrorMessages.NOT_FOUND
      );
    }

    return SerializeHttpResponse(
      catalogueItem,
      HttpStatus.OK,
      CatalogueSuccessMessages.RETRIEVED
    );
  }

  async update(id: string, updateCatalogueDto: UpdateCatalogueDto) {
    const catalogueItem = await this.catalogueModel.findById(id);

    if (!catalogueItem) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        CatalogueErrorMessages.NOT_FOUND
      );
    }

    // Check if part number is being updated and if it already exists
    if (
      updateCatalogueDto.partNumber &&
      updateCatalogueDto.partNumber !== catalogueItem.partNumber
    ) {
      const existingItem = await this.catalogueModel.findOne({
        partNumber: updateCatalogueDto.partNumber,
        _id: { $ne: id },
      });

      if (existingItem) {
        return SerializeHttpResponse(
          null,
          HttpStatus.BAD_REQUEST,
          CatalogueErrorMessages.ALREADY_EXISTS
        );
      }
    }

    const updatedCatalogueItem = await this.catalogueModel
      .findByIdAndUpdate(id, updateCatalogueDto, { new: true })
      .populate("categoryId", "name");

    return SerializeHttpResponse(
      updatedCatalogueItem,
      HttpStatus.OK,
      CatalogueSuccessMessages.UPDATED
    );
  }

  async remove(id: string) {
    const catalogueItem = await this.catalogueModel.findById(id);

    if (!catalogueItem) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        CatalogueErrorMessages.NOT_FOUND
      );
    }

    await this.catalogueModel.findByIdAndDelete(id);

    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      CatalogueSuccessMessages.DELETED
    );
  }
}

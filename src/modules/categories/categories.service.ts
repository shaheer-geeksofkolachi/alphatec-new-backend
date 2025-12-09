import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, HttpStatus } from "@nestjs/common";
import { SerializeHttpResponse } from "src/utils/serializer";
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryQueryDto,
} from "./dto/category.dto";
import { Categories } from "./categories.schema";
import {
  CategoryErrorMessages,
  CategorySuccessMessages,
} from "src/constants/api-response/category.response";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private readonly categoryModel: Model<Categories>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    console.log("createCategoryDto in service: ", createCategoryDto);
    // Check if category name already exists
    const existingCategory = await this.categoryModel.findOne({
      name: { $regex: new RegExp(`^${createCategoryDto.name}$`, "i") },
    });

    if (existingCategory) {
      return SerializeHttpResponse(
        null,
        HttpStatus.BAD_REQUEST,
        CategoryErrorMessages.ALREADY_EXISTS
      );
    }

    const category = await this.categoryModel.create(createCategoryDto);

    return SerializeHttpResponse(
      category,
      HttpStatus.CREATED,
      CategorySuccessMessages.CREATED
    );
  }

  async findAll(queryDto: CategoryQueryDto = {}) {
    const { page = 1, limit = 10, search } = queryDto;

    const filter: any = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      this.categoryModel
        .find(filter)
        .sort({ createdAt: -1 }),
      this.categoryModel.countDocuments(filter),
    ]);

    const result = {
      categories,
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
      CategorySuccessMessages.RETRIEVED_ALL
    );
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        CategoryErrorMessages.NOT_FOUND
      );
    }

    return SerializeHttpResponse(
      category,
      HttpStatus.OK,
      CategorySuccessMessages.RETRIEVED
    );
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        CategoryErrorMessages.NOT_FOUND
      );
    }

    // Check if name is being updated and if it already exists
    if (
      updateCategoryDto.name &&
      updateCategoryDto.name.toLowerCase() !== category.name.toLowerCase()
    ) {
      const existingCategory = await this.categoryModel.findOne({
        name: { $regex: new RegExp(`^${updateCategoryDto.name}$`, "i") },
        _id: { $ne: id },
      });

      if (existingCategory) {
        return SerializeHttpResponse(
          null,
          HttpStatus.BAD_REQUEST,
          CategoryErrorMessages.ALREADY_EXISTS
        );
      }
    }

    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true }
    );

    return SerializeHttpResponse(
      updatedCategory,
      HttpStatus.OK,
      CategorySuccessMessages.UPDATED
    );
  }

  async remove(id: string) {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      return SerializeHttpResponse(
        null,
        HttpStatus.NOT_FOUND,
        CategoryErrorMessages.NOT_FOUND
      );
    }

    await this.categoryModel.findByIdAndDelete(id);

    return SerializeHttpResponse(
      null,
      HttpStatus.OK,
      CategorySuccessMessages.DELETED
    );
  }
}

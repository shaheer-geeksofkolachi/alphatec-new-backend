import { Model } from "mongoose";
import { HttpStatus } from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto, CategoryQueryDto } from "./dto/category.dto";
import { Categories } from "./categories.schema";
export declare class CategoriesService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Categories>);
    create(createCategoryDto: CreateCategoryDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Categories> & Categories & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.CREATED>>;
    findAll(queryDto?: CategoryQueryDto): Promise<import("src/utils/serializer").Serialized<{
        categories: (import("mongoose").Document<unknown, {}, Categories> & Categories & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }, HttpStatus.OK>>;
    findOne(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Categories> & Categories & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, Categories> & Categories & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    remove(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
}

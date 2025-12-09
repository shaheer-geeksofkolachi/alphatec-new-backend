import { Model } from "mongoose";
import { HttpStatus } from "@nestjs/common";
import { CreateMaterialsDto, UpdateMaterialsDto, MaterialsQueryDto } from "./dto/materials.dto";
import { Materials } from "./materials.schema";
export declare class MaterialsService {
    private readonly materialsModel;
    constructor(materialsModel: Model<Materials>);
    create(createMaterialsDto: CreateMaterialsDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Materials> & Materials & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.CREATED>>;
    findAll(queryDto?: MaterialsQueryDto): Promise<import("src/utils/serializer").Serialized<{
        materials: (import("mongoose").FlattenMaps<{
            name: string;
            categoryId: import("mongoose").Types.ObjectId;
            unit: string;
            price: number;
            calculationMethod?: string | undefined;
            description?: string | undefined;
        }> & {
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
    findOne(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Materials> & Materials & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    update(id: string, updateMaterialsDto: UpdateMaterialsDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, Materials> & Materials & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    remove(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
}

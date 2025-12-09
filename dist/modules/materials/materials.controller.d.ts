import { MaterialsService } from "./materials.service";
import { CreateMaterialsDto, UpdateMaterialsDto, MaterialsQueryDto } from "./dto/materials.dto";
export declare class MaterialsController {
    private readonly materialsService;
    constructor(materialsService: MaterialsService);
    create(createMaterialsDto: CreateMaterialsDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./materials.schema").Materials> & import("./materials.schema").Materials & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.CREATED>>;
    findAll(queryDto: MaterialsQueryDto): Promise<import("../../utils/serializer").Serialized<{
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
    }, import("@nestjs/common").HttpStatus.OK>>;
    findOne(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./materials.schema").Materials> & import("./materials.schema").Materials & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    update(id: string, updateMaterialsDto: UpdateMaterialsDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./materials.schema").Materials> & import("./materials.schema").Materials & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    remove(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
}

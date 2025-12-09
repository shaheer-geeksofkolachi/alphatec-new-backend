import { Model } from "mongoose";
import { HttpStatus } from "@nestjs/common";
import { CreateCatalogueDto, UpdateCatalogueDto, CatalogueQueryDto } from "./dto/catalogue.dto";
import { Catalogue } from "./catalogue.schema";
export declare class CatalogueService {
    private readonly catalogueModel;
    constructor(catalogueModel: Model<Catalogue>);
    create(createCatalogueDto: CreateCatalogueDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Catalogue> & Catalogue & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.CREATED>>;
    findAll(queryDto?: CatalogueQueryDto): Promise<import("src/utils/serializer").Serialized<{
        catalogueItems: (import("mongoose").Document<unknown, {}, Catalogue> & Catalogue & {
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
    findOne(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Catalogue> & Catalogue & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    update(id: string, updateCatalogueDto: UpdateCatalogueDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, Catalogue> & Catalogue & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    remove(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
}

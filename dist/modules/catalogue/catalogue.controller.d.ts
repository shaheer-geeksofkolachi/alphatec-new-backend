import { CatalogueService } from "./catalogue.service";
import { CreateCatalogueDto, UpdateCatalogueDto, CatalogueQueryDto } from "./dto/catalogue.dto";
export declare class CatalogueController {
    private readonly catalogueService;
    constructor(catalogueService: CatalogueService);
    create(createCatalogueDto: CreateCatalogueDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./catalogue.schema").Catalogue> & import("./catalogue.schema").Catalogue & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.CREATED>>;
    findAll(queryDto: CatalogueQueryDto): Promise<import("../../utils/serializer").Serialized<{
        catalogueItems: (import("mongoose").Document<unknown, {}, import("./catalogue.schema").Catalogue> & import("./catalogue.schema").Catalogue & {
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
    findOne(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./catalogue.schema").Catalogue> & import("./catalogue.schema").Catalogue & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    update(id: string, updateCatalogueDto: UpdateCatalogueDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./catalogue.schema").Catalogue> & import("./catalogue.schema").Catalogue & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    remove(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
}

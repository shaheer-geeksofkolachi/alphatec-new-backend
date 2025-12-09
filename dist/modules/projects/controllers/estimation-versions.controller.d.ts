import { EstimationVersionsService } from "../services/estimation-versions.service";
import { CreateEstimationVersionDto, UpdateEstimationVersionDto } from "../dto/estimation-versions.dto";
export declare class EstimationVersionsController {
    private readonly estimationVersionsService;
    constructor(estimationVersionsService: EstimationVersionsService);
    create(projectId: string, createDto: CreateEstimationVersionDto, req: any): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("../schemas/estimation-versions.schema").EstimationVersions> & import("../schemas/estimation-versions.schema").EstimationVersions & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.CREATED>>;
    findAll(projectId: string): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("../schemas/estimation-versions.schema").EstimationVersions> & import("../schemas/estimation-versions.schema").EstimationVersions & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("@nestjs/common").HttpStatus.OK>>;
    findOne(projectId: string, id: string): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("../schemas/estimation-versions.schema").EstimationVersions> & import("../schemas/estimation-versions.schema").EstimationVersions & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    update(projectId: string, id: string, updateDto: UpdateEstimationVersionDto): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("../schemas/estimation-versions.schema").EstimationVersions> & import("../schemas/estimation-versions.schema").EstimationVersions & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    remove(projectId: string, id: string): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
}

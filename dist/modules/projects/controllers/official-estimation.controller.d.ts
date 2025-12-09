import { OfficialEstimationService } from "../services/official-estimation.service";
import { CreateOfficialEstimationDto, UpdateOfficialEstimationDto } from "../dto/official-estimation.dto";
export declare class OfficialEstimationController {
    private readonly officialEstimationService;
    constructor(officialEstimationService: OfficialEstimationService);
    create(projectId: string, createDto: CreateOfficialEstimationDto, req: any): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("../schemas/official-estimation.schema").OfficialEstimation> & import("../schemas/official-estimation.schema").OfficialEstimation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK> | import("../../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("../schemas/official-estimation.schema").OfficialEstimation> & import("../schemas/official-estimation.schema").OfficialEstimation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.CREATED>>;
    findOne(projectId: string): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("../schemas/official-estimation.schema").OfficialEstimation> & import("../schemas/official-estimation.schema").OfficialEstimation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    update(projectId: string, updateDto: UpdateOfficialEstimationDto): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("../schemas/official-estimation.schema").OfficialEstimation> & import("../schemas/official-estimation.schema").OfficialEstimation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    remove(projectId: string): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
}

import { DetailedCostsService } from "../services/detailed-costs.service";
import { CreateDetailedCostDto, UpdateDetailedCostDto } from "../dto/detailed-costs.dto";
export declare class DetailedCostsController {
    private readonly detailedCostsService;
    constructor(detailedCostsService: DetailedCostsService);
    create(projectId: string, createDto: CreateDetailedCostDto): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("../schemas/detailed-costs.schema").DetailedCosts> & import("../schemas/detailed-costs.schema").DetailedCosts & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.CREATED>>;
    findAll(projectId: string): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("../schemas/detailed-costs.schema").DetailedCosts> & import("../schemas/detailed-costs.schema").DetailedCosts & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("@nestjs/common").HttpStatus.OK>>;
    findOne(projectId: string, id: string): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("../schemas/detailed-costs.schema").DetailedCosts> & import("../schemas/detailed-costs.schema").DetailedCosts & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    update(projectId: string, id: string, updateDto: UpdateDetailedCostDto): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("../schemas/detailed-costs.schema").DetailedCosts> & import("../schemas/detailed-costs.schema").DetailedCosts & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    remove(projectId: string, id: string): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
}

import { Model } from "mongoose";
import { HttpStatus } from "@nestjs/common";
import { CreateDetailedCostDto, UpdateDetailedCostDto } from "../dto/detailed-costs.dto";
import { DetailedCosts } from "../schemas/detailed-costs.schema";
import { ProjectsService } from "../projects.service";
export declare class DetailedCostsService {
    private readonly detailedCostsModel;
    private readonly projectsService;
    constructor(detailedCostsModel: Model<DetailedCosts>, projectsService: ProjectsService);
    create(projectId: string, createDto: CreateDetailedCostDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, DetailedCosts> & DetailedCosts & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, HttpStatus.CREATED>>;
    findAll(projectId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, DetailedCosts> & DetailedCosts & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], HttpStatus.OK>>;
    findOne(projectId: string, costId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, DetailedCosts> & DetailedCosts & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, HttpStatus.OK>>;
    update(projectId: string, costId: string, updateDto: UpdateDetailedCostDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, DetailedCosts> & DetailedCosts & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    remove(projectId: string, costId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
}

import { Model, Types } from "mongoose";
import { HttpStatus } from "@nestjs/common";
import { CreateOfficialEstimationDto, UpdateOfficialEstimationDto } from "../dto/official-estimation.dto";
import { OfficialEstimation } from "../schemas/official-estimation.schema";
import { ProjectsService } from "../projects.service";
export declare class OfficialEstimationService {
    private readonly officialEstimationModel;
    private readonly projectsService;
    constructor(officialEstimationModel: Model<OfficialEstimation>, projectsService: ProjectsService);
    create(projectId: string, createDto: CreateOfficialEstimationDto, userId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, OfficialEstimation> & OfficialEstimation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, OfficialEstimation> & OfficialEstimation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.CREATED>>;
    findOne(projectId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, OfficialEstimation> & OfficialEstimation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    update(projectId: string, updateDto: UpdateOfficialEstimationDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, OfficialEstimation> & OfficialEstimation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    remove(projectId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
}

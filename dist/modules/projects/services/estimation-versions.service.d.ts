import { Model, Types } from "mongoose";
import { HttpStatus } from "@nestjs/common";
import { CreateEstimationVersionDto, UpdateEstimationVersionDto } from "../dto/estimation-versions.dto";
import { EstimationVersions } from "../schemas/estimation-versions.schema";
import { ProjectsService } from "../projects.service";
export declare class EstimationVersionsService {
    private readonly estimationVersionsModel;
    private readonly projectsService;
    constructor(estimationVersionsModel: Model<EstimationVersions>, projectsService: ProjectsService);
    create(projectId: string, createDto: CreateEstimationVersionDto, userId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, EstimationVersions> & EstimationVersions & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.CREATED>>;
    findAll(projectId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, EstimationVersions> & EstimationVersions & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[], HttpStatus.OK>>;
    findOne(projectId: string, versionId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, EstimationVersions> & EstimationVersions & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    update(projectId: string, versionId: string, updateDto: UpdateEstimationVersionDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, EstimationVersions> & EstimationVersions & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    remove(projectId: string, versionId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
}

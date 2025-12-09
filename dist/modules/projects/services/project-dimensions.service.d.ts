import { Model, Types } from "mongoose";
import { HttpStatus } from "@nestjs/common";
import { CreateProjectDimensionsDto, UpdateProjectDimensionsDto } from "../dto/project-dimensions.dto";
import { ProjectDimensions } from "../schemas/project-dimensions.schema";
import { ProjectsService } from "../projects.service";
export declare class ProjectDimensionsService {
    private readonly projectDimensionsModel;
    private readonly projectsService;
    constructor(projectDimensionsModel: Model<ProjectDimensions>, projectsService: ProjectsService);
    create(projectId: string, createDto: CreateProjectDimensionsDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, ProjectDimensions> & ProjectDimensions & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.CREATED>>;
    findAll(projectId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, ProjectDimensions> & ProjectDimensions & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[], HttpStatus.OK>>;
    findOne(projectId: string, dimensionId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, ProjectDimensions> & ProjectDimensions & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    update(projectId: string, dimensionId: string, updateDto: UpdateProjectDimensionsDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, ProjectDimensions> & ProjectDimensions & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    remove(projectId: string, dimensionId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
}

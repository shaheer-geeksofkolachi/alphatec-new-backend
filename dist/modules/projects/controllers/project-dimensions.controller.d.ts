import { ProjectDimensionsService } from "../services/project-dimensions.service";
import { CreateProjectDimensionsDto, UpdateProjectDimensionsDto } from "../dto/project-dimensions.dto";
export declare class ProjectDimensionsController {
    private readonly projectDimensionsService;
    constructor(projectDimensionsService: ProjectDimensionsService);
    create(projectId: string, createDto: CreateProjectDimensionsDto): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("../schemas/project-dimensions.schema").ProjectDimensions> & import("../schemas/project-dimensions.schema").ProjectDimensions & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.CREATED>>;
    findAll(projectId: string): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("../schemas/project-dimensions.schema").ProjectDimensions> & import("../schemas/project-dimensions.schema").ProjectDimensions & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("@nestjs/common").HttpStatus.OK>>;
    findOne(projectId: string, id: string): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("../schemas/project-dimensions.schema").ProjectDimensions> & import("../schemas/project-dimensions.schema").ProjectDimensions & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    update(projectId: string, id: string, updateDto: UpdateProjectDimensionsDto): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("../schemas/project-dimensions.schema").ProjectDimensions> & import("../schemas/project-dimensions.schema").ProjectDimensions & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    remove(projectId: string, id: string): Promise<import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
}

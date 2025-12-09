import { ProjectsService } from "./projects.service";
import { CreateProjectDto, UpdateProjectDto, UpdateProjectStatusDto, UpdateProjectFinancialStatusDto, ProjectQueryDto, UploadProjectImagesDto, AssignProjectRightsDto, RevokeProjectRightsDto } from "./dto/project.dto";
import { CreateProjectTypeDto, UpdateProjectTypeDto } from "./dto/create-project-type.dto";
import { CreateWorkTypeDto, UpdateWorkTypeDto } from "./dto/create-work-type.dto";
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./projects.schema").Project> & import("./projects.schema").Project & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.CREATED>>;
    findAll(queryDto: ProjectQueryDto, userId: string, userEmail: string): Promise<import("../../utils/serializer").Serialized<{
        projects: (import("mongoose").Document<unknown, {}, import("./projects.schema").Project> & import("./projects.schema").Project & {
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
    findOne(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./projects.schema").Project> & import("./projects.schema").Project & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    findByCode(projectCode: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./projects.schema").Project> & import("./projects.schema").Project & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./projects.schema").Project> & import("./projects.schema").Project & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    updateStatus(id: string, updateStatusDto: UpdateProjectStatusDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./projects.schema").Project> & import("./projects.schema").Project & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    updateFinancialStatus(id: string, updateFinancialStatusDto: UpdateProjectFinancialStatusDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./projects.schema").Project> & import("./projects.schema").Project & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    remove(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
    importFromExcel(body: {
        projects: any[];
    }): Promise<{
        message: string;
        totalInserted: number;
    }>;
    uploadImages(id: string, uploadDto: UploadProjectImagesDto, files: Express.Multer.File[]): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.INTERNAL_SERVER_ERROR> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<{
        project: (import("mongoose").Document<unknown, {}, import("./projects.schema").Project> & import("./projects.schema").Project & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
        uploadedUrls: string[];
    }, import("@nestjs/common").HttpStatus.OK>>;
    deleteImage(id: string, body: {
        imageUrl: string;
        imageType: "before" | "after";
    }): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./projects.schema").Project> & import("./projects.schema").Project & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    getProjectTypes(): Promise<import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./project-types.schema").ProjectType> & import("./project-types.schema").ProjectType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("@nestjs/common").HttpStatus.OK>>;
    createProjectType(createProjectTypeDto: CreateProjectTypeDto): Promise<import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./project-types.schema").ProjectType> & import("./project-types.schema").ProjectType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.CREATED>>;
    updateProjectType(id: string, updateProjectTypeDto: UpdateProjectTypeDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./project-types.schema").ProjectType> & import("./project-types.schema").ProjectType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    deleteProjectType(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
    getWorkTypes(): Promise<import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./work-types.schema").WorkType> & import("./work-types.schema").WorkType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("@nestjs/common").HttpStatus.OK>>;
    createWorkType(createProjectTypeDto: CreateWorkTypeDto): Promise<import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./work-types.schema").WorkType> & import("./work-types.schema").WorkType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.CREATED>>;
    updateWorkType(id: string, updateProjectTypeDto: UpdateWorkTypeDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./work-types.schema").WorkType> & import("./work-types.schema").WorkType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    deleteWorkType(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
    assignProjectRights(projectId: string, assignDto: AssignProjectRightsDto, userEmail: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.FORBIDDEN> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./projects.schema").Project> & import("./projects.schema").Project & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK> | import("../../utils/serializer").Serialized<{
        message: string;
    }, import("@nestjs/common").HttpStatus.OK>>;
    revokeProjectRights(projectId: string, revokeDto: RevokeProjectRightsDto, userEmail: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.FORBIDDEN> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./projects.schema").Project> & import("./projects.schema").Project & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    getProjectAllowedUsers(projectId: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<{
        allowedUsers: import("mongoose").Types.ObjectId[];
    }, import("@nestjs/common").HttpStatus.OK>>;
}

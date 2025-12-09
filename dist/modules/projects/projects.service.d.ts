import { Model, Types } from "mongoose";
import { HttpStatus } from "@nestjs/common";
import { CreateProjectDto, UpdateProjectDto, UpdateProjectStatusDto, UpdateProjectFinancialStatusDto, ProjectQueryDto } from "./dto/project.dto";
import { Project } from "./projects.schema";
import { ClientsService } from "../clients/clients.service";
import { MediaService } from "../media/media.service";
import { OfficialEstimation } from "./schemas/official-estimation.schema";
import { ProjectType } from "./project-types.schema";
import { CreateProjectTypeDto, UpdateProjectTypeDto } from "./dto/create-project-type.dto";
import { WorkType } from "./work-types.schema";
import { CreateWorkTypeDto, UpdateWorkTypeDto } from "./dto/create-work-type.dto";
import { UserService } from "../user/user.service";
import { EmailService } from "../email/email.service";
import { AssignProjectRightsDto, RevokeProjectRightsDto } from "./dto/project.dto";
import { User } from "../user/user.schema";
export declare class ProjectsService {
    private readonly projectModel;
    private readonly officialEstimationModel;
    private readonly clientsService;
    private readonly mediaService;
    private readonly projectTypeModel;
    private readonly workTypeModel;
    private readonly userService;
    private readonly emailService;
    private readonly userModel;
    constructor(projectModel: Model<Project>, officialEstimationModel: Model<OfficialEstimation>, clientsService: ClientsService, mediaService: MediaService, projectTypeModel: Model<ProjectType>, workTypeModel: Model<WorkType>, userService: UserService, emailService: EmailService, userModel: Model<User>);
    create(createProjectDto: CreateProjectDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Project> & Project & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.CREATED>>;
    findAll(queryDto?: ProjectQueryDto, currentUserId?: string, currentUserEmail?: string): Promise<import("src/utils/serializer").Serialized<{
        projects: (import("mongoose").Document<unknown, {}, Project> & Project & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }, HttpStatus.OK>>;
    findOne(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Project> & Project & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    findByCode(projectCode: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Project> & Project & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, Project> & Project & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    updateStatus(id: string, updateStatusDto: UpdateProjectStatusDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, Project> & Project & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    updateFinancialStatus(id: string, updateFinancialStatusDto: UpdateProjectFinancialStatusDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, Project> & Project & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    remove(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
    uploadImages(id: string, files: Express.Multer.File[], imageType: "before" | "after"): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.INTERNAL_SERVER_ERROR> | import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<{
        project: (import("mongoose").Document<unknown, {}, Project> & Project & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }) | null;
        uploadedUrls: string[];
    }, HttpStatus.OK>>;
    deleteImage(id: string, imageUrl: string, imageType: "before" | "after"): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, Project> & Project & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    importProjectsWithEstimations(projectsArray: any[]): Promise<{
        message: string;
        totalInserted: number;
    }>;
    getProjectTypes(): Promise<import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, ProjectType> & ProjectType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[], HttpStatus.OK>>;
    createProjectType(createProjectTypeDto: CreateProjectTypeDto): Promise<import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, ProjectType> & ProjectType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.CREATED>>;
    updateProjectType(id: string, updateProjectTypeDto: UpdateProjectTypeDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, ProjectType> & ProjectType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    deleteProjectType(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
    getWorkTypes(): Promise<import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, WorkType> & WorkType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[], HttpStatus.OK>>;
    createWorkType(createProjectTypeDto: CreateWorkTypeDto): Promise<import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, WorkType> & WorkType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.CREATED>>;
    updateWorkType(id: string, updateProjectTypeDto: UpdateWorkTypeDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, WorkType> & WorkType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    deleteWorkType(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
    assignProjectRights(projectId: string, assignDto: AssignProjectRightsDto, currentUserEmail: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.FORBIDDEN> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Project> & Project & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK> | import("src/utils/serializer").Serialized<{
        message: string;
    }, HttpStatus.OK>>;
    revokeProjectRights(projectId: string, revokeDto: RevokeProjectRightsDto, currentUserEmail: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.FORBIDDEN> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, Project> & Project & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    getProjectAllowedUsers(projectId: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<{
        allowedUsers: Types.ObjectId[];
    }, HttpStatus.OK>>;
}

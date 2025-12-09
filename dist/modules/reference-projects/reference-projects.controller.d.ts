import { ReferenceProjectsService } from "./reference-projects.service";
import { CreateReferenceProjectDto, UpdateReferenceProjectDto, ReferenceProjectQueryDto, UploadReferenceProjectImagesDto } from "./dto/reference-project.dto";
export declare class ReferenceProjectsController {
    private readonly referenceProjectsService;
    constructor(referenceProjectsService: ReferenceProjectsService);
    create(createReferenceProjectDto: CreateReferenceProjectDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./reference-projects.schema").ReferenceProject> & import("./reference-projects.schema").ReferenceProject & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.CREATED>>;
    findAll(queryDto: ReferenceProjectQueryDto): Promise<import("../../utils/serializer").Serialized<{
        referenceProjects: (import("mongoose").Document<unknown, {}, import("./reference-projects.schema").ReferenceProject> & import("./reference-projects.schema").ReferenceProject & {
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
    findTemplates(): Promise<import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./reference-projects.schema").ReferenceProject> & import("./reference-projects.schema").ReferenceProject & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("@nestjs/common").HttpStatus.OK>>;
    findOne(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./reference-projects.schema").ReferenceProject> & import("./reference-projects.schema").ReferenceProject & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    update(id: string, updateReferenceProjectDto: UpdateReferenceProjectDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./reference-projects.schema").ReferenceProject> & import("./reference-projects.schema").ReferenceProject & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    remove(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
    uploadImages(id: string, uploadDto: UploadReferenceProjectImagesDto, files: Express.Multer.File[]): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.INTERNAL_SERVER_ERROR> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<{
        referenceProject: (import("mongoose").Document<unknown, {}, import("./reference-projects.schema").ReferenceProject> & import("./reference-projects.schema").ReferenceProject & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
        uploadedUrls: string[];
    }, import("@nestjs/common").HttpStatus.OK>>;
    deleteImage(id: string, body: {
        imageUrl: string;
        imageType: "before" | "after";
    }): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./reference-projects.schema").ReferenceProject> & import("./reference-projects.schema").ReferenceProject & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
}

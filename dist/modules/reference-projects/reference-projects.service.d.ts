import { Model, Types } from "mongoose";
import { HttpStatus } from "@nestjs/common";
import { CreateReferenceProjectDto, UpdateReferenceProjectDto, ReferenceProjectQueryDto } from "./dto/reference-project.dto";
import { CategoriesService } from "../categories/categories.service";
import { ReferenceProject } from "./reference-projects.schema";
import { ClientsService } from "../clients/clients.service";
import { MediaService } from "../media/media.service";
export declare class ReferenceProjectsService {
    private readonly referenceProjectModel;
    private readonly categoriesService;
    private readonly clientService;
    private readonly mediaService;
    constructor(referenceProjectModel: Model<ReferenceProject>, categoriesService: CategoriesService, clientService: ClientsService, mediaService: MediaService);
    create(createReferenceProjectDto: CreateReferenceProjectDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, ReferenceProject> & ReferenceProject & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.CREATED>>;
    findAll(queryDto?: ReferenceProjectQueryDto): Promise<import("src/utils/serializer").Serialized<{
        referenceProjects: (import("mongoose").Document<unknown, {}, ReferenceProject> & ReferenceProject & {
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
    findOne(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, ReferenceProject> & ReferenceProject & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    update(id: string, updateReferenceProjectDto: UpdateReferenceProjectDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, ReferenceProject> & ReferenceProject & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    remove(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
    findTemplates(): Promise<import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, ReferenceProject> & ReferenceProject & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[], HttpStatus.OK>>;
    uploadImages(id: string, files: Express.Multer.File[], imageType: "before" | "after"): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.INTERNAL_SERVER_ERROR> | import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<{
        referenceProject: (import("mongoose").Document<unknown, {}, ReferenceProject> & ReferenceProject & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }) | null;
        uploadedUrls: string[];
    }, HttpStatus.OK>>;
    deleteImage(id: string, imageUrl: string, imageType: "before" | "after"): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, ReferenceProject> & ReferenceProject & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
}

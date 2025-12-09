import { Model, Types } from "mongoose";
import { User } from "./user.schema";
import { HttpStatus } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto, ChangeEmailDto } from "./dto/user.dto";
import { MediaService } from "../media/media.service";
import { EmailService } from "../email/email.service";
export declare class UserService {
    private readonly userModel;
    private readonly mediaService;
    private readonly sesEmailService;
    constructor(userModel: Model<User>, mediaService: MediaService, sesEmailService: EmailService);
    create(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.CREATED>>;
    sendOnBoardingEmail(payload: {
        email: string;
        invitedUserName: string;
        password: string;
    }): Promise<void>;
    findAll(): Promise<import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[], HttpStatus.OK>>;
    findAllUsers(organizationId: string): Promise<import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[], HttpStatus.OK>>;
    findOne(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK>>;
    update(id: string, updateUserDto: UpdateUserDto, file: Express.Multer.File): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null, HttpStatus.OK>>;
    remove(id: string): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
    changeEmail(userId: string, changeEmailDto: ChangeEmailDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, HttpStatus.OK> | import("src/utils/serializer").Serialized<null, HttpStatus.UNAUTHORIZED>>;
}

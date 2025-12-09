import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, ChangeEmailDto } from "./dto/user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.CREATED>>;
    findAll(): Promise<import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("@nestjs/common").HttpStatus.OK>>;
    findAllUsers(organizationId: string): Promise<import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("@nestjs/common").HttpStatus.OK>>;
    findOne(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    changeEmail(userId: string, changeEmailDto: ChangeEmailDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.UNAUTHORIZED>>;
    update(id: string, updateUserDto: UpdateUserDto, file: Express.Multer.File): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<(import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("@nestjs/common").HttpStatus.OK>>;
    remove(id: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
}

import { Document, Types } from "mongoose";
import { USER_ROLES, USER_STATUS } from "src/constants/user.constant";
export declare class User {
    name: string;
    email: string;
    phone: string;
    role: [USER_ROLES];
    password: string;
    emailVerified: boolean;
    status: USER_STATUS;
    avatar: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type UserDocument = User & Document;

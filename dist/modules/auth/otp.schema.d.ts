import { Document } from 'mongoose';
import { OTP_TYPE } from 'src/types/otp.type';
export declare class Otp {
    email: string;
    otp: string;
    accessType: OTP_TYPE;
    isVerified: boolean;
}
export declare const OtpSchema: import("mongoose").Schema<Otp, import("mongoose").Model<Otp, any, any, any, Document<unknown, any, Otp> & Otp & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Otp, Document<unknown, {}, import("mongoose").FlatRecord<Otp>> & import("mongoose").FlatRecord<Otp> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type OtpDocument = Otp & Document;

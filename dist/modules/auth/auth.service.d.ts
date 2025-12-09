import { Model, Types } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { OtpService } from "./otp.service";
import { SignupDto } from "./dto/signup.dto";
import { ConfigService } from "@nestjs/config";
import { UserEmailDto, VerifyResetPasswordDto } from "./dto/forgot-password.dto";
import { SignInDto } from "./dto/signin.dto";
import { AUTH_ERRORS, AUTH_SUCCESS } from "src/constants/api-response/auth.response";
import { HttpStatus } from "@nestjs/common";
import { TOKEN_TYPES } from "src/constants/auth.constant";
import { User } from "../user/user.schema";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { SESMailService } from "../email/ses-email.service";
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    private readonly otpService;
    private readonly sesEmailService;
    private readonly configService;
    constructor(userModel: Model<User>, jwtService: JwtService, otpService: OtpService, sesEmailService: SESMailService, configService: ConfigService);
    verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<any>;
    validateUser(email: string, password: string): Promise<any>;
    verifyToken(token: string, type: TOKEN_TYPES): Promise<{
        success: boolean;
        msg: AUTH_ERRORS;
    } | {
        success: boolean;
        msg: AUTH_SUCCESS;
    }>;
    generateToken(userId: string, email: string, expiresIn: string, type: TOKEN_TYPES): string;
    signup(data: SignupDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<boolean, HttpStatus.CREATED>>;
    signIn(data: SignInDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.UNAUTHORIZED> | import("src/utils/serializer").Serialized<{
        token: string;
        user: import("mongoose").FlattenMaps<User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }>;
    }, HttpStatus.OK>>;
    forgotPassword(data: UserEmailDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
    verifyResetPassword(data: VerifyResetPasswordDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.OK> | import("src/utils/serializer").Serialized<null, HttpStatus.FORBIDDEN>>;
    changePassword(userId: string, data: ChangePasswordDto): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.BAD_REQUEST> | import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<null, HttpStatus.OK>>;
}

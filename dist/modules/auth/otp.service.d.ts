import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { HttpStatus } from "@nestjs/common";
import { Otp } from "./otp.schema";
import { EmailService } from "../email/email.service";
import { OtpDto } from "./dto/otp.dto";
import { OTP_TYPE } from "src/types/otp.type";
import { EMAIL_SUBJECT } from "src/types/email.type";
import { TOKEN_TYPES } from "src/constants/auth.constant";
import { JwtService } from "@nestjs/jwt";
import { UserEmailDto } from "./dto/forgot-password.dto";
import { User } from "../user/user.schema";
export declare class OtpService {
    private readonly userModel;
    private readonly otpModel;
    private readonly emailService;
    private readonly configService;
    private readonly jwtService;
    constructor(userModel: Model<User>, otpModel: Model<Otp>, emailService: EmailService, configService: ConfigService, jwtService: JwtService);
    generateOTP(userInput: UserEmailDto, accessType: OTP_TYPE, subject: EMAIL_SUBJECT): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.NOT_FOUND> | import("src/utils/serializer").Serialized<boolean, HttpStatus.OK>>;
    generateToken(userId: string, email: string, expiresIn: string, type: TOKEN_TYPES): string;
    validateOTP(userInput: OtpDto, accessType: OTP_TYPE): Promise<import("src/utils/serializer").Serialized<null, HttpStatus.FORBIDDEN> | import("src/utils/serializer").Serialized<{
        resetToken: string;
    }, HttpStatus.OK>>;
    verifySignupOtp(userInput: OtpDto): Promise<import("src/utils/serializer").Serialized<boolean, HttpStatus.OK> | import("src/utils/serializer").Serialized<null, HttpStatus.FORBIDDEN>>;
}

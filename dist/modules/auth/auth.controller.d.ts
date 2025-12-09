import { UserEmailDto, VerifyResetPasswordDto } from "./dto/forgot-password.dto";
import { OtpDto } from "./dto/otp.dto";
import { OtpService } from "./otp.service";
import { SignupDto } from "./dto/signup.dto";
import { SignInDto } from "./dto/signin.dto";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { ChangePasswordDto } from "./dto/change-password.dto";
export declare class AuthController {
    private authService;
    private readonly otpService;
    private readonly userService;
    constructor(authService: AuthService, otpService: OtpService, userService: UserService);
    getAuthenticatedUser(userId: string): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<import("mongoose").Document<unknown, {}, import("../user/user.schema").User> & import("../user/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, import("@nestjs/common").HttpStatus.OK>>;
    signup(signUpDto: SignupDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<boolean, import("@nestjs/common").HttpStatus.CREATED>>;
    login(signInDto: SignInDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.UNAUTHORIZED> | import("../../utils/serializer").Serialized<{
        token: string;
        user: import("mongoose").FlattenMaps<import("../user/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }>;
    }, import("@nestjs/common").HttpStatus.OK>>;
    forgotPassword(data: UserEmailDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<boolean, import("@nestjs/common").HttpStatus.OK>>;
    verifyForgotPasswordOtp(userInput: OtpDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.FORBIDDEN> | import("../../utils/serializer").Serialized<{
        resetToken: string;
    }, import("@nestjs/common").HttpStatus.OK>>;
    verifyResetPassword(data: VerifyResetPasswordDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.FORBIDDEN>>;
    verifySignupOtp(userInput: OtpDto): Promise<import("../../utils/serializer").Serialized<boolean, import("@nestjs/common").HttpStatus.OK> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.FORBIDDEN>>;
    changePassword(userId: string, data: ChangePasswordDto): Promise<import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.BAD_REQUEST> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.NOT_FOUND> | import("../../utils/serializer").Serialized<null, import("@nestjs/common").HttpStatus.OK>>;
}

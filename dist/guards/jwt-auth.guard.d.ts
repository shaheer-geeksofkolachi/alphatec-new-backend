import { Model } from "mongoose";
import { ExecutionContext, HttpStatus, CanActivate } from "@nestjs/common";
import { User } from "src/modules/user/user.schema";
export declare class JwtAuthGuard implements CanActivate {
    private userModel;
    constructor(userModel: Model<User>);
    canActivate(context: ExecutionContext): Promise<true | import("src/utils/serializer").Serialized<null, HttpStatus.UNAUTHORIZED>>;
}

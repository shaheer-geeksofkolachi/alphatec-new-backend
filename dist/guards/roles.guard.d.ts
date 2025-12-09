import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Model } from "mongoose";
import { Reflector } from "@nestjs/core";
import { User } from "src/modules/user/user.schema";
export declare class RolesGuard implements CanActivate {
    private reflector;
    private userModel;
    constructor(reflector: Reflector, userModel: Model<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

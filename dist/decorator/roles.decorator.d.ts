import { USER_ROLES } from 'src/constants/user.constant';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: USER_ROLES[]) => import("@nestjs/common").CustomDecorator<string>;

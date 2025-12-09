import { USER_ROLES } from 'src/constants/user.constant';
export declare class CreateUserDto {
    name: string;
    email: string;
    phone: string;
    role: USER_ROLES;
    organization: string;
}
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    phone?: string;
    role?: USER_ROLES;
    password?: string;
}
export declare class ChangeEmailDto {
    email: string;
    password: string;
}

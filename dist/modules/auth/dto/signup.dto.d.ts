import { USER_ROLES } from "src/constants/user.constant";
export declare class SignupDto {
    name: string;
    email: string;
    phone: string;
    password: string;
    roles: USER_ROLES[];
}

export declare const createHashPassword: (password: string) => Promise<any>;
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<any>;
export declare const generateRandomString: (length?: number) => string;
export declare const generateRandomOTPNumber: (length: number) => string;
export declare const generatePassword: () => string;

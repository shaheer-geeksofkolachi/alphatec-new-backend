"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserErrorMessages = exports.UserSuccessMessages = void 0;
var UserSuccessMessages;
(function (UserSuccessMessages) {
    UserSuccessMessages["CREATED"] = "User created successfully";
    UserSuccessMessages["RETRIEVED"] = "User retrieved successfully";
    UserSuccessMessages["RETRIEVED_ALL"] = "Users retrieved successfully";
    UserSuccessMessages["UPDATED"] = "User updated successfully";
    UserSuccessMessages["DELETED"] = "User deleted successfully";
    UserSuccessMessages["EMAIL_UPDATED"] = "Email updated successfully";
})(UserSuccessMessages || (exports.UserSuccessMessages = UserSuccessMessages = {}));
var UserErrorMessages;
(function (UserErrorMessages) {
    UserErrorMessages["NOT_FOUND"] = "User not found";
    UserErrorMessages["ALREADY_EXISTS"] = "User with this email already exists";
    UserErrorMessages["INVALID_CREDENTIALS"] = "Invalid credentials";
    UserErrorMessages["UNAUTHORIZED"] = "Unauthorized access";
    UserErrorMessages["INVALID_TOKEN"] = "Invalid or expired token";
    UserErrorMessages["INVALID_PASSWORD"] = "Invalid password";
})(UserErrorMessages || (exports.UserErrorMessages = UserErrorMessages = {}));
//# sourceMappingURL=user.response.js.map
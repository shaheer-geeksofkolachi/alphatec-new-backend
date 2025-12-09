"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_ERRORS = exports.AUTH_SUCCESS = void 0;
var AUTH_SUCCESS;
(function (AUTH_SUCCESS) {
    AUTH_SUCCESS["ACCOUNT_CREATION"] = "Your account has been successfully created. Please check your email address for the otp.";
    AUTH_SUCCESS["GOOGLE_ACCOUNT_CREATION"] = "Your account has been successfully created.";
    AUTH_SUCCESS["ACCOUNT_LOGIN"] = "Your account has been logged in successfully.";
    AUTH_SUCCESS["FORGOT_PASSWORD"] = "The password reset email has been sent successfully.";
    AUTH_SUCCESS["RESET_PASSWORD"] = "The password has been successfully reset.";
    AUTH_SUCCESS["VALID_TOKEN"] = "Successfully validate the token.";
    AUTH_SUCCESS["PASSWORD_CHANGED"] = "Your password has been successfully changed.";
})(AUTH_SUCCESS || (exports.AUTH_SUCCESS = AUTH_SUCCESS = {}));
var AUTH_ERRORS;
(function (AUTH_ERRORS) {
    AUTH_ERRORS["INCORRECT_CREDENTIALS"] = "Incorrect email or password.";
    AUTH_ERRORS["USER_NOT_FOUND"] = "Unable to find the user.";
    AUTH_ERRORS["DUPLICATE_EMAIL"] = "User with same email already exist.";
    AUTH_ERRORS["ACCOUNT_CREATION"] = "An error occurred while creating new user.";
    AUTH_ERRORS["ACCOUNT_LOGIN"] = "An error occurred while logging the account.";
    AUTH_ERRORS["UNAUTHORIZED"] = "You are not authorized to access this operation.";
    AUTH_ERRORS["FORGOT_PASSWORD"] = "An error occurred while resetting user password.";
    AUTH_ERRORS["INVALID_TOKEN"] = "Your token is not validate.";
    AUTH_ERRORS["EMAIL_NOT_VERIFIED"] = "Your email is not verified.";
    AUTH_ERRORS["INCORRECT_CURRENT_PASSWORD"] = "Incorrect current password.";
})(AUTH_ERRORS || (exports.AUTH_ERRORS = AUTH_ERRORS = {}));
//# sourceMappingURL=auth.response.js.map
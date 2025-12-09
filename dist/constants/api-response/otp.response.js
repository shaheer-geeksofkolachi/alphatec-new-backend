"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP_ERROR = exports.OTP_SUCCESS = void 0;
var OTP_SUCCESS;
(function (OTP_SUCCESS) {
    OTP_SUCCESS["GENERATE_OTP"] = "OTP has been sent to your email.";
    OTP_SUCCESS["VERIFIED_OTP"] = "OTP has been verified successfully.";
})(OTP_SUCCESS || (exports.OTP_SUCCESS = OTP_SUCCESS = {}));
var OTP_ERROR;
(function (OTP_ERROR) {
    OTP_ERROR["OTP_NOT_VERIFIED"] = "OTP verification failed.";
    OTP_ERROR["OTP_EXPIRED"] = "This OTP has expired.";
})(OTP_ERROR || (exports.OTP_ERROR = OTP_ERROR = {}));
//# sourceMappingURL=otp.response.js.map
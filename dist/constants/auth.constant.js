"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_PROVIDER = exports.TOKEN_TYPES = void 0;
var TOKEN_TYPES;
(function (TOKEN_TYPES) {
    TOKEN_TYPES["SIGNIN_TOKEN"] = "SIGNIN_TOKEN";
    TOKEN_TYPES["RESET_PASSWORD_TOKEN"] = "RESET_PASSWORD_TOKEN";
})(TOKEN_TYPES || (exports.TOKEN_TYPES = TOKEN_TYPES = {}));
var AUTH_PROVIDER;
(function (AUTH_PROVIDER) {
    AUTH_PROVIDER["GOOGLE"] = "GOOGLE";
    AUTH_PROVIDER["APPLE"] = "APPLE";
    AUTH_PROVIDER["CUSTOM"] = "CUSTOM";
})(AUTH_PROVIDER || (exports.AUTH_PROVIDER = AUTH_PROVIDER = {}));
//# sourceMappingURL=auth.constant.js.map
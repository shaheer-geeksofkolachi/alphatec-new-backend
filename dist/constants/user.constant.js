"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT_ALLOWED_USERS = exports.USER_STATUS = exports.USER_ROLES = void 0;
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["SUPER_ADMIN"] = "SUPER_ADMIN";
    USER_ROLES["MANAGER"] = "MANAGER";
    USER_ROLES["ENGINEER"] = "ENGINEER";
    USER_ROLES["VIEWER"] = "VIEWER";
})(USER_ROLES || (exports.USER_ROLES = USER_ROLES = {}));
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS["ACTIVE"] = "ACTIVE";
    USER_STATUS["INACTIVE"] = "INACTIVE";
    USER_STATUS["PENDING"] = "PENDING";
    USER_STATUS["UNAPPROVED"] = "UNAPPROVED";
})(USER_STATUS || (exports.USER_STATUS = USER_STATUS = {}));
exports.NOT_ALLOWED_USERS = [
    USER_STATUS.INACTIVE,
    USER_STATUS.UNAPPROVED,
    USER_STATUS.PENDING,
];
//# sourceMappingURL=user.constant.js.map
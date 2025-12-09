"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceErrorMessages = exports.WorkspaceSuccessMessages = void 0;
var WorkspaceSuccessMessages;
(function (WorkspaceSuccessMessages) {
    WorkspaceSuccessMessages["CREATED"] = "Workspace created successfully";
    WorkspaceSuccessMessages["RETRIEVED"] = "Workspace retrieved successfully";
    WorkspaceSuccessMessages["RETRIEVED_ALL"] = "Workspaces retrieved successfully";
    WorkspaceSuccessMessages["UPDATED"] = "Workspace updated successfully";
    WorkspaceSuccessMessages["DELETED"] = "Workspace deleted successfully";
})(WorkspaceSuccessMessages || (exports.WorkspaceSuccessMessages = WorkspaceSuccessMessages = {}));
var WorkspaceErrorMessages;
(function (WorkspaceErrorMessages) {
    WorkspaceErrorMessages["NOT_FOUND"] = "Workspace not found";
    WorkspaceErrorMessages["ALREADY_EXISTS"] = "Workspace already exists";
    WorkspaceErrorMessages["INVALID_ORG"] = "Invalid organization ID";
    WorkspaceErrorMessages["UNAUTHORIZED"] = "Unauthorized to access this workspace";
})(WorkspaceErrorMessages || (exports.WorkspaceErrorMessages = WorkspaceErrorMessages = {}));
//# sourceMappingURL=workspace.response.js.map
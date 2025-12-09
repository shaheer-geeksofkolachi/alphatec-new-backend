"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectErrorMessages = exports.ProjectSuccessMessages = void 0;
var ProjectSuccessMessages;
(function (ProjectSuccessMessages) {
    ProjectSuccessMessages["CREATED"] = "Project created successfully";
    ProjectSuccessMessages["RETRIEVED"] = "Project retrieved successfully";
    ProjectSuccessMessages["RETRIEVED_ALL"] = "Projects retrieved successfully";
    ProjectSuccessMessages["UPDATED"] = "Project updated successfully";
    ProjectSuccessMessages["DELETED"] = "Project deleted successfully";
    ProjectSuccessMessages["STATUS_UPDATED"] = "Project status updated successfully";
    ProjectSuccessMessages["FINANCIAL_STATUS_UPDATED"] = "Project financial status updated successfully";
})(ProjectSuccessMessages || (exports.ProjectSuccessMessages = ProjectSuccessMessages = {}));
var ProjectErrorMessages;
(function (ProjectErrorMessages) {
    ProjectErrorMessages["NOT_FOUND"] = "Project not found";
    ProjectErrorMessages["ALREADY_EXISTS"] = "Project with this code already exists";
    ProjectErrorMessages["INVALID_CLIENT"] = "Invalid client ID";
    ProjectErrorMessages["INVALID_STATUS"] = "Invalid project status";
    ProjectErrorMessages["INVALID_FINANCIAL_STATUS"] = "Invalid financial status";
    ProjectErrorMessages["UNAUTHORIZED"] = "Unauthorized access to project";
})(ProjectErrorMessages || (exports.ProjectErrorMessages = ProjectErrorMessages = {}));
//# sourceMappingURL=project.response.js.map
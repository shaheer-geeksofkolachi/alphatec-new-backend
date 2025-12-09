"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_SUCCESS = exports.AWS_ERROR = void 0;
var AWS_ERROR;
(function (AWS_ERROR) {
    AWS_ERROR["UPLOAD_FILE"] = "An error occurred while uploading the file.";
    AWS_ERROR["DELETE_FILE"] = "An error occurred while deleting the file.";
})(AWS_ERROR || (exports.AWS_ERROR = AWS_ERROR = {}));
var AWS_SUCCESS;
(function (AWS_SUCCESS) {
    AWS_SUCCESS["UPLOAD_FILE"] = "File uploaded successfully.";
    AWS_SUCCESS["DELETE_FILE"] = "File deleted successfully.";
})(AWS_SUCCESS || (exports.AWS_SUCCESS = AWS_SUCCESS = {}));
//# sourceMappingURL=aws.response.js.map
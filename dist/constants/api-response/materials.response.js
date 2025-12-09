"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsErrorMessages = exports.MaterialsSuccessMessages = void 0;
var MaterialsSuccessMessages;
(function (MaterialsSuccessMessages) {
    MaterialsSuccessMessages["CREATED"] = "Material created successfully";
    MaterialsSuccessMessages["RETRIEVED"] = "Material retrieved successfully";
    MaterialsSuccessMessages["RETRIEVED_ALL"] = "Materials retrieved successfully";
    MaterialsSuccessMessages["UPDATED"] = "Material updated successfully";
    MaterialsSuccessMessages["DELETED"] = "Material deleted successfully";
})(MaterialsSuccessMessages || (exports.MaterialsSuccessMessages = MaterialsSuccessMessages = {}));
var MaterialsErrorMessages;
(function (MaterialsErrorMessages) {
    MaterialsErrorMessages["NOT_FOUND"] = "Material not found";
    MaterialsErrorMessages["ALREADY_EXISTS"] = "Material with this name already exists";
    MaterialsErrorMessages["UNAUTHORIZED"] = "Unauthorized access to material";
    MaterialsErrorMessages["INVALID_CATEGORY"] = "Invalid category ID";
})(MaterialsErrorMessages || (exports.MaterialsErrorMessages = MaterialsErrorMessages = {}));
//# sourceMappingURL=materials.response.js.map
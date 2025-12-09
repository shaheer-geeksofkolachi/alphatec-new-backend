"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryErrorMessages = exports.CategorySuccessMessages = void 0;
var CategorySuccessMessages;
(function (CategorySuccessMessages) {
    CategorySuccessMessages["CREATED"] = "Category created successfully";
    CategorySuccessMessages["RETRIEVED"] = "Category retrieved successfully";
    CategorySuccessMessages["RETRIEVED_ALL"] = "Categories retrieved successfully";
    CategorySuccessMessages["UPDATED"] = "Category updated successfully";
    CategorySuccessMessages["DELETED"] = "Category deleted successfully";
})(CategorySuccessMessages || (exports.CategorySuccessMessages = CategorySuccessMessages = {}));
var CategoryErrorMessages;
(function (CategoryErrorMessages) {
    CategoryErrorMessages["NOT_FOUND"] = "Category not found";
    CategoryErrorMessages["ALREADY_EXISTS"] = "Category with this name already exists";
    CategoryErrorMessages["UNAUTHORIZED"] = "Unauthorized access to category";
})(CategoryErrorMessages || (exports.CategoryErrorMessages = CategoryErrorMessages = {}));
//# sourceMappingURL=category.response.js.map
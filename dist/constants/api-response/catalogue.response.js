"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogueErrorMessages = exports.CatalogueSuccessMessages = void 0;
var CatalogueSuccessMessages;
(function (CatalogueSuccessMessages) {
    CatalogueSuccessMessages["CREATED"] = "Catalogue item created successfully";
    CatalogueSuccessMessages["RETRIEVED"] = "Catalogue item retrieved successfully";
    CatalogueSuccessMessages["RETRIEVED_ALL"] = "Catalogue items retrieved successfully";
    CatalogueSuccessMessages["UPDATED"] = "Catalogue item updated successfully";
    CatalogueSuccessMessages["DELETED"] = "Catalogue item deleted successfully";
})(CatalogueSuccessMessages || (exports.CatalogueSuccessMessages = CatalogueSuccessMessages = {}));
var CatalogueErrorMessages;
(function (CatalogueErrorMessages) {
    CatalogueErrorMessages["NOT_FOUND"] = "Catalogue item not found";
    CatalogueErrorMessages["ALREADY_EXISTS"] = "Catalogue item with this part number already exists";
    CatalogueErrorMessages["UNAUTHORIZED"] = "Unauthorized access to catalogue item";
    CatalogueErrorMessages["INVALID_CATEGORY"] = "Invalid category ID";
})(CatalogueErrorMessages || (exports.CatalogueErrorMessages = CatalogueErrorMessages = {}));
//# sourceMappingURL=catalogue.response.js.map
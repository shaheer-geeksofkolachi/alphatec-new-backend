"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientErrorMessages = exports.ClientSuccessMessages = void 0;
var ClientSuccessMessages;
(function (ClientSuccessMessages) {
    ClientSuccessMessages["CREATED"] = "Client created successfully";
    ClientSuccessMessages["RETRIEVED"] = "Client retrieved successfully";
    ClientSuccessMessages["RETRIEVED_ALL"] = "Clients retrieved successfully";
    ClientSuccessMessages["UPDATED"] = "Client updated successfully";
    ClientSuccessMessages["DELETED"] = "Client deleted successfully";
})(ClientSuccessMessages || (exports.ClientSuccessMessages = ClientSuccessMessages = {}));
var ClientErrorMessages;
(function (ClientErrorMessages) {
    ClientErrorMessages["NOT_FOUND"] = "Client not found";
    ClientErrorMessages["ALREADY_EXISTS"] = "Client with this company name already exists";
    ClientErrorMessages["INVALID_CIF"] = "Invalid CIF/NIT format";
    ClientErrorMessages["UNAUTHORIZED"] = "Unauthorized access to client";
})(ClientErrorMessages || (exports.ClientErrorMessages = ClientErrorMessages = {}));
//# sourceMappingURL=client.response.js.map
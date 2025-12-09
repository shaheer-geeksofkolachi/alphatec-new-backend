"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeHttpResponse = SerializeHttpResponse;
const common_1 = require("@nestjs/common");
function SerializeHttpResponse(data, status, message) {
    if (status >= 200 && status < 400) {
        return { data, status, message };
    }
    throw new common_1.HttpException({ status, data, message }, status);
}
//# sourceMappingURL=serializer.js.map
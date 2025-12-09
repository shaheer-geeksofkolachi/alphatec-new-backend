"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrganizationId = void 0;
const common_1 = require("@nestjs/common");
exports.GetOrganizationId = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const organizationId = request.organizationId;
    return organizationId;
});
//# sourceMappingURL=organization.decorator.js.map
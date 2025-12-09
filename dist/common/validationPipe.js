"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class CustomValidationPipe {
    constructor(options) {
        this.validationPipe = new common_1.ValidationPipe({
            ...options,
            exceptionFactory: (validationErrors) => {
                const errors = this.flattenValidationErrors(validationErrors);
                return new common_1.BadRequestException({
                    message: errors[0],
                    status: common_1.HttpStatus.BAD_REQUEST,
                    success: false,
                    data: null,
                });
            },
        });
    }
    async transform(value, metadata) {
        return await this.validationPipe.transform(value, metadata);
    }
    flattenValidationErrors(validationErrors) {
        const result = [];
        validationErrors.forEach((error) => {
            if (error.constraints) {
                result.push(...Object.values(error.constraints));
            }
            if (error.children && error.children.length) {
                result.push(...this.flattenValidationErrors(error.children));
            }
        });
        return result;
    }
}
exports.CustomValidationPipe = CustomValidationPipe;
//# sourceMappingURL=validationPipe.js.map
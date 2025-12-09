"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkTypeSchema = exports.WorkType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const clients_schema_1 = require("../clients/clients.schema");
let WorkType = class WorkType {
};
exports.WorkType = WorkType;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], WorkType.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.Types.ObjectId, ref: clients_schema_1.Client.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], WorkType.prototype, "clientId", void 0);
exports.WorkType = WorkType = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], WorkType);
exports.WorkTypeSchema = mongoose_1.SchemaFactory.createForClass(WorkType);
//# sourceMappingURL=work-types.schema.js.map
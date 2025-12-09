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
exports.EstimationVersionsSchema = exports.EstimationVersions = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let EstimationVersions = class EstimationVersions {
};
exports.EstimationVersions = EstimationVersions;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: "Project" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], EstimationVersions.prototype, "projectId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], EstimationVersions.prototype, "nombreVersion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], EstimationVersions.prototype, "descripcion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Object }),
    __metadata("design:type", Object)
], EstimationVersions.prototype, "dimensionData", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], EstimationVersions.prototype, "costoMaterial", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], EstimationVersions.prototype, "costoPersonal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], EstimationVersions.prototype, "costoTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0, default: 0 }),
    __metadata("design:type", Number)
], EstimationVersions.prototype, "additionalCosts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], EstimationVersions.prototype, "detailedCosts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], EstimationVersions.prototype, "estimatedMaterials", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], EstimationVersions.prototype, "creadoPor", void 0);
exports.EstimationVersions = EstimationVersions = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], EstimationVersions);
exports.EstimationVersionsSchema = mongoose_1.SchemaFactory.createForClass(EstimationVersions);
exports.EstimationVersionsSchema.index({ projectId: 1 });
exports.EstimationVersionsSchema.index({ creadoPor: 1 });
exports.EstimationVersionsSchema.index({ createdAt: -1 });
//# sourceMappingURL=estimation-versions.schema.js.map
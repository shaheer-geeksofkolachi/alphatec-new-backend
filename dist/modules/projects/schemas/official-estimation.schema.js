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
exports.OfficialEstimationSchema = exports.OfficialEstimation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OfficialEstimation = class OfficialEstimation {
};
exports.OfficialEstimation = OfficialEstimation;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: "Project" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OfficialEstimation.prototype, "projectId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], OfficialEstimation.prototype, "totalConcrete", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], OfficialEstimation.prototype, "totalSteel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], OfficialEstimation.prototype, "materialCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], OfficialEstimation.prototype, "laborCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], OfficialEstimation.prototype, "additionalCosts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], OfficialEstimation.prototype, "totalCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, min: 0 }),
    __metadata("design:type", Number)
], OfficialEstimation.prototype, "commission", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], OfficialEstimation.prototype, "materials", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], OfficialEstimation.prototype, "detailedCosts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], OfficialEstimation.prototype, "dimensionData", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                length: { type: Number, default: 0 },
                width: { type: Number, default: 0 },
                height: { type: Number, default: 0 },
                quantity: { type: Number, default: 0 },
                notes: { type: String, default: "" },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], OfficialEstimation.prototype, "foundation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                numberOfBolts: { type: Number, default: 0 },
                quantity: { type: Number, default: 0 },
                diameter: { type: Number, default: 0 },
                boltType: { type: String, default: "" },
                boltClass: { type: String, default: "" },
                length: { type: Number, default: 0 },
                notes: { type: String, default: "" },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], OfficialEstimation.prototype, "anchorBolts", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                length: { type: Number, default: 0 },
                width: { type: Number, default: 0 },
                height: { type: Number, default: 0 },
                fillPercentage: { type: Number, default: 100 },
                notes: { type: String, default: "" },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], OfficialEstimation.prototype, "skidFill", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            materials: { type: Number, default: 0 },
            labor: { type: Number, default: 0 },
            total: { type: Number, default: 0 },
        },
        default: {},
    }),
    __metadata("design:type", Object)
], OfficialEstimation.prototype, "calculationResults", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], OfficialEstimation.prototype, "estimatedMaterials", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "Official Estimation" }),
    __metadata("design:type", String)
], OfficialEstimation.prototype, "versionName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], OfficialEstimation.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OfficialEstimation.prototype, "creadoPor", void 0);
exports.OfficialEstimation = OfficialEstimation = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], OfficialEstimation);
exports.OfficialEstimationSchema = mongoose_1.SchemaFactory.createForClass(OfficialEstimation);
exports.OfficialEstimationSchema.index({ projectId: 1 }, { unique: true });
exports.OfficialEstimationSchema.index({ creadoPor: 1 });
exports.OfficialEstimationSchema.index({ createdAt: -1 });
//# sourceMappingURL=official-estimation.schema.js.map
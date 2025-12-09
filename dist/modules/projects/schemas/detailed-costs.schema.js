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
exports.DetailedCostsSchema = exports.DetailedCosts = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DetailedCosts = class DetailedCosts extends mongoose_2.Document {
};
exports.DetailedCosts = DetailedCosts;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: "Project" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], DetailedCosts.prototype, "projectId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], DetailedCosts.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], DetailedCosts.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], DetailedCosts.prototype, "unitCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], DetailedCosts.prototype, "materialType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], DetailedCosts.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], DetailedCosts.prototype, "days", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0 }),
    __metadata("design:type", Number)
], DetailedCosts.prototype, "subtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], DetailedCosts.prototype, "markUp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0, default: 0 }),
    __metadata("design:type", Number)
], DetailedCosts.prototype, "finalCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0, default: 0 }),
    __metadata("design:type", Number)
], DetailedCosts.prototype, "realUsage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0 }),
    __metadata("design:type", Number)
], DetailedCosts.prototype, "quotedPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], DetailedCosts.prototype, "tab", void 0);
exports.DetailedCosts = DetailedCosts = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DetailedCosts);
exports.DetailedCostsSchema = mongoose_1.SchemaFactory.createForClass(DetailedCosts);
exports.DetailedCostsSchema.index({ projectId: 1 });
exports.DetailedCostsSchema.index({ type: 1 });
exports.DetailedCostsSchema.index({ createdAt: -1 });
exports.DetailedCostsSchema.pre("save", function () {
    this.subtotal = this.unitCost * this.quantity * this.days;
});
//# sourceMappingURL=detailed-costs.schema.js.map
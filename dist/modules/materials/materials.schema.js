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
exports.MaterialsSchema = exports.Materials = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const categories_schema_1 = require("../categories/categories.schema");
let Materials = class Materials {
};
exports.Materials = Materials;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Materials.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: categories_schema_1.Categories.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Materials.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Materials.prototype, "unit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], Materials.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Materials.prototype, "calculationMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Materials.prototype, "description", void 0);
exports.Materials = Materials = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Materials);
exports.MaterialsSchema = mongoose_1.SchemaFactory.createForClass(Materials);
exports.MaterialsSchema.index({ name: 1 });
exports.MaterialsSchema.index({ categoryId: 1 });
exports.MaterialsSchema.index({ unit: 1 });
exports.MaterialsSchema.index({ calculationMethod: 1 });
//# sourceMappingURL=materials.schema.js.map
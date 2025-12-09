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
exports.CatalogueSchema = exports.Catalogue = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const categories_schema_1 = require("../categories/categories.schema");
let Catalogue = class Catalogue {
};
exports.Catalogue = Catalogue;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Catalogue.prototype, "itemName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: categories_schema_1.Categories.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Catalogue.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Catalogue.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Catalogue.prototype, "manufacturer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Catalogue.prototype, "partNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Catalogue.prototype, "modelNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Catalogue.prototype, "revision", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Catalogue.prototype, "recommendedApplications", void 0);
exports.Catalogue = Catalogue = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Catalogue);
exports.CatalogueSchema = mongoose_1.SchemaFactory.createForClass(Catalogue);
exports.CatalogueSchema.index({ itemName: 1 });
exports.CatalogueSchema.index({ categoryId: 1 });
exports.CatalogueSchema.index({ partNumber: 1 });
exports.CatalogueSchema.index({ modelNumber: 1 });
exports.CatalogueSchema.index({ manufacturer: 1 });
//# sourceMappingURL=catalogue.schema.js.map
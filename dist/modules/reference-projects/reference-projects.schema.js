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
exports.ReferenceProjectSchema = exports.ReferenceProject = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const clients_schema_1 = require("../clients/clients.schema");
const categories_schema_1 = require("../categories/categories.schema");
let ReferenceProject = class ReferenceProject {
};
exports.ReferenceProject = ReferenceProject;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], ReferenceProject.prototype, "projectName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: clients_schema_1.Client.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ReferenceProject.prototype, "clientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: categories_schema_1.Categories.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ReferenceProject.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], ReferenceProject.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], ReferenceProject.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], ReferenceProject.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], ReferenceProject.prototype, "projectType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], ReferenceProject.prototype, "workType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], ReferenceProject.prototype, "machineType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], ReferenceProject.prototype, "estimatedBudget", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], ReferenceProject.prototype, "finalCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], ReferenceProject.prototype, "marginAchieved", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], ReferenceProject.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], ReferenceProject.prototype, "teamSize", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], ReferenceProject.prototype, "satisfactionRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], ReferenceProject.prototype, "deliveryOnTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], ReferenceProject.prototype, "useAsProjectTemplate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], ReferenceProject.prototype, "beforeImages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], ReferenceProject.prototype, "afterImages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], ReferenceProject.prototype, "imageDescriptions", void 0);
exports.ReferenceProject = ReferenceProject = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ReferenceProject);
exports.ReferenceProjectSchema = mongoose_1.SchemaFactory.createForClass(ReferenceProject);
exports.ReferenceProjectSchema.index({ clientId: 1 });
exports.ReferenceProjectSchema.index({ categoryId: 1 });
exports.ReferenceProjectSchema.index({ projectType: 1 });
exports.ReferenceProjectSchema.index({ workType: 1 });
exports.ReferenceProjectSchema.index({ machineType: 1 });
exports.ReferenceProjectSchema.index({ useAsProjectTemplate: 1 });
//# sourceMappingURL=reference-projects.schema.js.map
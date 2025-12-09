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
exports.ProjectSchema = exports.Project = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_constant_1 = require("../../constants/project.constant");
const clients_schema_1 = require("../clients/clients.schema");
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Project.prototype, "projectName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.Types.ObjectId, ref: clients_schema_1.Client.name }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Project.prototype, "clientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Project.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: project_constant_1.PROJECT_STATUS.PROPOSAL,
        enum: Object.values(project_constant_1.PROJECT_STATUS),
        type: String,
    }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: project_constant_1.PROJECT_FINANCIAL_STATUS.BUDGET_PENDING,
        enum: Object.values(project_constant_1.PROJECT_FINANCIAL_STATUS),
        type: String,
    }),
    __metadata("design:type", String)
], Project.prototype, "financialStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
        type: String,
    }),
    __metadata("design:type", String)
], Project.prototype, "projectCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                fullName: { type: String, required: true, trim: true },
                position: { type: String, required: false, trim: true },
                email: { type: String, required: false, trim: true },
                phone: { type: String, required: false, trim: true },
                contactType: {
                    type: String,
                    enum: ["PRIMARY", "SECONDARY"],
                    required: false,
                },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], Project.prototype, "contacts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "presupuestoEstimado", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "margenEstimado", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Project.prototype, "tipoServicio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "responsableCostos", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Project.prototype, "projectType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "projectTypes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "workTypes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "machineTypes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "beforeImages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "afterImages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Project.prototype, "imageDescriptions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: "User", default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "allowedUsers", void 0);
exports.Project = Project = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Project);
exports.ProjectSchema = mongoose_1.SchemaFactory.createForClass(Project);
exports.ProjectSchema.index({ projectCode: 1 });
exports.ProjectSchema.index({ clientId: 1 });
exports.ProjectSchema.index({ status: 1 });
exports.ProjectSchema.index({ financialStatus: 1 });
//# sourceMappingURL=projects.schema.js.map
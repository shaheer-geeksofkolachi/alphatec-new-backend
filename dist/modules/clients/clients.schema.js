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
exports.ClientSchema = exports.ContactSchema = exports.Client = exports.Contact = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const client_constant_1 = require("../../constants/client.constant");
let Contact = class Contact {
};
exports.Contact = Contact;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Contact.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Contact.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Contact.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Contact.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        enum: Object.values(client_constant_1.CONTACT_TYPE),
        type: String,
    }),
    __metadata("design:type", String)
], Contact.prototype, "contactType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Contact.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Contact.prototype, "linkedInUrl", void 0);
exports.Contact = Contact = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Contact);
let Client = class Client {
};
exports.Client = Client;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Client.prototype, "companyName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        unique: true,
        sparse: true,
        trim: true,
        type: String,
    }),
    __metadata("design:type", String)
], Client.prototype, "cifNit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Client.prototype, "vat", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Client.prototype, "website", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Client.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, type: String }),
    __metadata("design:type", String)
], Client.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, trim: true, type: String }),
    __metadata("design:type", String)
], Client.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], Client.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Contact], default: [] }),
    __metadata("design:type", Array)
], Client.prototype, "contacts", void 0);
exports.Client = Client = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Client);
exports.ContactSchema = mongoose_1.SchemaFactory.createForClass(Contact);
exports.ClientSchema = mongoose_1.SchemaFactory.createForClass(Client);
exports.ClientSchema.index({ cifNit: 1 });
exports.ClientSchema.index({ companyName: 1 });
exports.ClientSchema.index({ country: 1 });
exports.ClientSchema.index({ city: 1 });
//# sourceMappingURL=clients.schema.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const reference_projects_service_1 = require("./reference-projects.service");
const reference_projects_controller_1 = require("./reference-projects.controller");
const reference_projects_schema_1 = require("./reference-projects.schema");
const user_service_1 = require("../user/user.service");
const user_schema_1 = require("../user/user.schema");
const categories_service_1 = require("../categories/categories.service");
const categories_schema_1 = require("../categories/categories.schema");
const media_service_1 = require("../media/media.service");
const email_service_1 = require("../email/email.service");
const clients_service_1 = require("../clients/clients.service");
const clients_schema_1 = require("../clients/clients.schema");
const MODEL = [
    { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
    { name: categories_schema_1.Categories.name, schema: categories_schema_1.CategoriesSchema },
    { name: reference_projects_schema_1.ReferenceProject.name, schema: reference_projects_schema_1.ReferenceProjectSchema },
    { name: clients_schema_1.Client.name, schema: clients_schema_1.ClientSchema },
];
let ReferenceProjectsModule = class ReferenceProjectsModule {
};
exports.ReferenceProjectsModule = ReferenceProjectsModule;
exports.ReferenceProjectsModule = ReferenceProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature(MODEL)],
        controllers: [reference_projects_controller_1.ReferenceProjectsController],
        providers: [
            reference_projects_service_1.ReferenceProjectsService,
            user_service_1.UserService,
            categories_service_1.CategoriesService,
            media_service_1.MediaService,
            email_service_1.EmailService,
            clients_service_1.ClientsService,
        ],
        exports: [reference_projects_service_1.ReferenceProjectsService],
    })
], ReferenceProjectsModule);
//# sourceMappingURL=reference-projects.module.js.map
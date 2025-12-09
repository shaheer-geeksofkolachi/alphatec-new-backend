"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const config_constant_1 = require("./constants/config.constant");
const auth_module_1 = require("./modules/auth/auth.module");
const media_module_1 = require("./modules/media/media.module");
const projects_module_1 = require("./modules/projects/projects.module");
const clients_module_1 = require("./modules/clients/clients.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const user_module_1 = require("./modules/user/user.module");
const user_schema_1 = require("./modules/user/user.schema");
const categories_module_1 = require("./modules/categories/categories.module");
const catalogue_module_1 = require("./modules/catalogue/catalogue.module");
const materials_module_1 = require("./modules/materials/materials.module");
const reference_projects_module_1 = require("./modules/reference-projects/reference-projects.module");
const MODELS = [{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }];
const CONFIG_MODULE = config_1.ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    envFilePath: `.env.${process.env.NODE_ENV}`,
});
const MONGOOSE_MODULE = mongoose_1.MongooseModule.forRootAsync({
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => ({
        uri: configService.get(config_constant_1.CONFIG.MONGODB_URI),
    }),
    inject: [config_1.ConfigService],
});
const MODULES = [
    user_module_1.UserModule,
    auth_module_1.AuthModule,
    media_module_1.MediaModule,
    projects_module_1.ProjectsModule,
    clients_module_1.ClientsModule,
    categories_module_1.CategoriesModule,
    catalogue_module_1.CatalogueModule,
    materials_module_1.MaterialsModule,
    reference_projects_module_1.ReferenceProjectsModule,
    CONFIG_MODULE,
    MONGOOSE_MODULE,
    mongoose_1.MongooseModule.forFeature(MODELS),
];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: MODULES,
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
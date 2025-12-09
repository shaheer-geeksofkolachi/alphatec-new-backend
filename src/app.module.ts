import { MongooseModule } from "@nestjs/mongoose";
import { CONFIG } from "src/constants/config.constant";
import { AuthModule } from "./modules/auth/auth.module";
import { MediaModule } from "./modules/media/media.module";
import { ProjectsModule } from "./modules/projects/projects.module";
import { ClientsModule } from "./modules/clients/clients.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { UserModule } from "./modules/user/user.module";

import { User, UserSchema } from "./modules/user/user.schema";
import { CategoriesModule } from "./modules/categories/categories.module";
import { CatalogueModule } from "./modules/catalogue/catalogue.module";
import { MaterialsModule } from "./modules/materials/materials.module";
import { ReferenceProjectsModule } from "./modules/reference-projects/reference-projects.module";

const MODELS = [{ name: User.name, schema: UserSchema }];

const CONFIG_MODULE = ConfigModule.forRoot({
  isGlobal: true,
  cache: true,
  envFilePath: `.env.${process.env.NODE_ENV}`,
});
const MONGOOSE_MODULE = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>(CONFIG.MONGODB_URI),
  }),
  inject: [ConfigService],
});

const MODULES = [
  UserModule,
  AuthModule,
  MediaModule,
  ProjectsModule,
  ClientsModule,
  CategoriesModule,
  CatalogueModule,
  MaterialsModule,
  ReferenceProjectsModule,
  CONFIG_MODULE,
  MONGOOSE_MODULE,
  MongooseModule.forFeature(MODELS),
];
@Module({
  imports: MODULES,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

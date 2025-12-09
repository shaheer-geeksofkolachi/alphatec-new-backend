import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReferenceProjectsService } from "./reference-projects.service";
import { ReferenceProjectsController } from "./reference-projects.controller";
import {
  ReferenceProject,
  ReferenceProjectSchema,
} from "./reference-projects.schema";
import { UserService } from "../user/user.service";
import { User, UserSchema } from "../user/user.schema";
import { CategoriesService } from "../categories/categories.service";
import { Categories, CategoriesSchema } from "../categories/categories.schema";
import { MediaService } from "../media/media.service";
import { EmailService } from "../email/email.service";
import { ClientsService } from "../clients/clients.service";
import { Client, ClientSchema } from "../clients/clients.schema";

const MODEL = [
  { name: User.name, schema: UserSchema },
  { name: Categories.name, schema: CategoriesSchema },
  { name: ReferenceProject.name, schema: ReferenceProjectSchema },
  { name: Client.name, schema: ClientSchema },
];

@Module({
  imports: [MongooseModule.forFeature(MODEL)],
  controllers: [ReferenceProjectsController],
  providers: [
    ReferenceProjectsService,
    UserService,
    CategoriesService,
    MediaService,
    EmailService,
    ClientsService,
  ],
  exports: [ReferenceProjectsService],
})
export class ReferenceProjectsModule {}

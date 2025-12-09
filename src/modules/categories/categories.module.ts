import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { Categories, CategoriesSchema } from "./categories.schema";
import { User, UserSchema } from "../user/user.schema";

const MODEL = [
  { name: Categories.name, schema: CategoriesSchema },
  { name: User.name, schema: UserSchema },
];

@Module({
  imports: [MongooseModule.forFeature(MODEL)],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MaterialsService } from "./materials.service";
import { MaterialsController } from "./materials.controller";
import { Materials, MaterialsSchema } from "./materials.schema";
import { User, UserSchema } from "../user/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Materials.name, schema: MaterialsSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [MaterialsController],
  providers: [MaterialsService],
  exports: [MaterialsService],
})
export class MaterialsModule {}

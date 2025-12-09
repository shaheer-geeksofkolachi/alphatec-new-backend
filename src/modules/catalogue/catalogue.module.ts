import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CatalogueService } from "./catalogue.service";
import { CatalogueController } from "./catalogue.controller";
import { Catalogue, CatalogueSchema } from "./catalogue.schema";
import { User, UserSchema } from "../user/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Catalogue.name, schema: CatalogueSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [CatalogueController],
  providers: [CatalogueService],
  exports: [CatalogueService],
})
export class CatalogueModule {}

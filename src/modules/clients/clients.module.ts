import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsService } from "./clients.service";
import { ClientsController } from "./clients.controller";
import { Client, ClientSchema } from "./clients.schema";
import { User, UserSchema } from "../user/user.schema";

const MODEL = [
  { name: Client.name, schema: ClientSchema },
  { name: User.name, schema: UserSchema },
];

@Module({
  imports: [MongooseModule.forFeature(MODEL)],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}

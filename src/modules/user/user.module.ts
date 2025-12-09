import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./user.schema";
import { MediaService } from "../media/media.service";
import { SESMailService } from "../email/ses-email.service";
import { EmailService } from "../email/email.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, MediaService, SESMailService, EmailService],
  exports: [UserService],
})
export class UserModule {}

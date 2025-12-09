import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { USER_ROLES, USER_STATUS } from "src/constants/user.constant";

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true, lowercase: true, type: String })
  name: string;

  @Prop({
    trim: true,
    unique: true,
    type: String,
    required: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true, trim: true, type: String })
  phone: string;

  @Prop({ required: true, enum: Object.values(USER_ROLES), type: [String] })
  role: [USER_ROLES];

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, default: false, type: Boolean })
  emailVerified: boolean;

  @Prop({
    required: true,
    type: String,
    default: USER_STATUS.PENDING,
    enum: Object.values(USER_STATUS),
  })
  status: USER_STATUS;

  @Prop({ type: String })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

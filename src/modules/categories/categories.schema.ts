import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Categories {
  @Prop({ required: true, trim: true, unique: true, type: String })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  color: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);

export type CategoriesDocument = Categories & Document;

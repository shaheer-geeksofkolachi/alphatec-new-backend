import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Categories } from "../categories/categories.schema";

@Schema({ timestamps: true })
export class Materials {
  @Prop({ required: true, trim: true, type: String })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Categories.name })
  categoryId: Types.ObjectId;

  @Prop({ required: true, trim: true, type: String })
  unit: string;

  @Prop({ required: true, type: Number, min: 0 })
  price: number;

  @Prop({ required: false, trim: true, type: String })
  calculationMethod?: string;

  @Prop({ required: false, trim: true, type: String })
  description?: string;
}

export const MaterialsSchema = SchemaFactory.createForClass(Materials);

export type MaterialsDocument = Materials & Document;

// Indexes for better query performance
MaterialsSchema.index({ name: 1 });
MaterialsSchema.index({ categoryId: 1 });
MaterialsSchema.index({ unit: 1 });
MaterialsSchema.index({ calculationMethod: 1 });

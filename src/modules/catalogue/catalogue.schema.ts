import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Categories } from "../categories/categories.schema";

@Schema({ timestamps: true })
export class Catalogue {
  @Prop({ required: true, trim: true, type: String })
  itemName: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Categories.name })
  categoryId: Types.ObjectId;

  @Prop({ required: true, trim: true, type: String })
  description: string;

  @Prop({ required: true, trim: true, type: String })
  manufacturer: string;

  @Prop({ required: true, trim: true, type: String })
  partNumber: string;

  @Prop({ required: true, trim: true, type: String })
  modelNumber: string;

  @Prop({ required: true, trim: true, type: String })
  revision: string;

  @Prop({ required: true, trim: true, type: String })
  recommendedApplications: string;
}

export const CatalogueSchema = SchemaFactory.createForClass(Catalogue);

export type CatalogueDocument = Catalogue & Document;

// Indexes for better query performance
CatalogueSchema.index({ itemName: 1 });
CatalogueSchema.index({ categoryId: 1 });
CatalogueSchema.index({ partNumber: 1 });
CatalogueSchema.index({ modelNumber: 1 });
CatalogueSchema.index({ manufacturer: 1 });

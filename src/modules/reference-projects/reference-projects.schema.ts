import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Client } from "../clients/clients.schema";
import { Categories } from "../categories/categories.schema";

@Schema({ timestamps: true })
export class ReferenceProject {
  @Prop({ required: true, trim: true, type: String })
  projectName: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Client.name })
  clientId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: Categories.name })
  categoryId: Types.ObjectId;

  @Prop({ required: true, trim: true, type: String })
  location: string;

  @Prop({ required: true, trim: true, type: String })
  country: string;

  @Prop({ type: String, default: "" })
  description: string;

  @Prop({ required: true, trim: true, type: String })
  projectType: string;

  @Prop({ required: true, trim: true, type: String })
  workType: string;

  @Prop({ required: true, trim: true, type: String })
  machineType: string;

  @Prop({ required: true, type: Number })
  estimatedBudget: number;

  @Prop({ required: true, type: Number })
  finalCost: number;

  @Prop({ required: true, type: Number })
  marginAchieved: number;

  @Prop({ required: true, type: Number })
  duration: number; // in days

  @Prop({ required: true, type: Number })
  teamSize: number;

  @Prop({ required: true, type: Number })
  satisfactionRate: number;

  @Prop({ required: true, type: Boolean, default: false })
  deliveryOnTime: boolean;

  @Prop({ required: true, type: Boolean, default: false })
  useAsProjectTemplate: boolean;

  @Prop({ type: [String], default: [] })
  beforeImages?: string[];

  @Prop({ type: [String], default: [] })
  afterImages?: string[];

  @Prop({ type: Object, default: {} })
  imageDescriptions?: Record<string, string>;
}

export const ReferenceProjectSchema =
  SchemaFactory.createForClass(ReferenceProject);

export type ReferenceProjectDocument = ReferenceProject & Document;

// Index for better query performance
ReferenceProjectSchema.index({ clientId: 1 });
ReferenceProjectSchema.index({ categoryId: 1 });
ReferenceProjectSchema.index({ projectType: 1 });
ReferenceProjectSchema.index({ workType: 1 });
ReferenceProjectSchema.index({ machineType: 1 });
ReferenceProjectSchema.index({ useAsProjectTemplate: 1 });

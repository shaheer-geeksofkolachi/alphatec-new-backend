import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class ProjectDimensions {
  @Prop({ required: true, type: Types.ObjectId, ref: "Project" })
  projectId: Types.ObjectId;

  @Prop({ required: true, type: Number, min: 0 })
  length: number;

  @Prop({ required: true, type: Number, min: 0 })
  width: number;

  @Prop({ required: true, type: Number, min: 0 })
  height: number;

  @Prop({ type: String, default: "" })
  notes?: string;

  // Foundation specific data
  @Prop({ type: Object, default: {} })
  foundation?: {
    length: number;
    width: number;
    height: number;
    notes?: string;
  };

  // Anchor bolts data
  @Prop({ type: Object, default: {} })
  anchorBolts?: {
    numberOfBolts: number;
    quantity: number;
    diameter: number;
    boltType: string;
    boltClass: string;
    length: number;
    notes?: string;
  };

  // Skid fill data
  @Prop({ type: Object, default: {} })
  skidFill?: {
    length: number;
    width: number;
    height: number;
    fillPercentage: number;
    notes?: string;
  };
}

export const ProjectDimensionsSchema =
  SchemaFactory.createForClass(ProjectDimensions);

export type ProjectDimensionsDocument = ProjectDimensions & Document;

// Indexes for better query performance
ProjectDimensionsSchema.index({ projectId: 1 });
ProjectDimensionsSchema.index({ createdAt: -1 });

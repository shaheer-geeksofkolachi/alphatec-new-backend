import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class EstimationVersions {
  @Prop({ required: true, type: Types.ObjectId, ref: "Project" })
  projectId: Types.ObjectId;

  @Prop({ required: true, type: String })
  nombreVersion: string;

  @Prop({ type: String })
  descripcion?: string;

  @Prop({ required: true, type: Object })
  dimensionData: any;

  @Prop({ required: true, type: Number, min: 0 })
  costoMaterial: number;

  @Prop({ required: true, type: Number, min: 0 })
  costoPersonal: number;

  @Prop({ required: true, type: Number, min: 0 })
  costoTotal: number;

  @Prop({ type: Number, min: 0, default: 0 })
  additionalCosts?: number;

  @Prop({ type: Array, default: [] })
  detailedCosts?: any[];

  @Prop({ type: Array, default: [] })
  estimatedMaterials?: any[];

  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  creadoPor: Types.ObjectId;
}

export const EstimationVersionsSchema =
  SchemaFactory.createForClass(EstimationVersions);

export type EstimationVersionsDocument = EstimationVersions & Document;

// Indexes for better query performance
EstimationVersionsSchema.index({ projectId: 1 });
EstimationVersionsSchema.index({ creadoPor: 1 });
EstimationVersionsSchema.index({ createdAt: -1 });

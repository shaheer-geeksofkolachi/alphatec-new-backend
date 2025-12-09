import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

// @Schema({ timestamps: true })
// export class DetailedCosts {
//   @Prop({ required: true, type: Types.ObjectId, ref: "Project" })
//   projectId: Types.ObjectId;

//   @Prop({ required: true, type: String })
//   type: string;

//   @Prop({ required: true, type: String })
//   description: string;

//   @Prop({ required: true, type: Number, min: 0 })
//   unitCost: number;

//   @Prop({ required: false, type: String, min: 0 })
//   materialType: string;

//   @Prop({ required: true, type: Number, min: 0 })
//   quantity: number;

//   @Prop({ required: true, type: Number, min: 0 })
//   days: number;

//   @Prop({ type: Number, min: 0 })
//   subtotal?: number;
// }


@Schema({ timestamps: true })
export class DetailedCosts extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: "Project" })
  projectId: Types.ObjectId;

  @Prop({ required: true, type: String })
  type: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: true, type: Number, min: 0 })
  unitCost: number;

  @Prop({ required: false, type: String })
  materialType?: string;

  @Prop({ required: true, type: Number, min: 0 })
  quantity: number;

  @Prop({ required: true, type: Number, min: 0 })
  days: number;

  @Prop({ type: Number, min: 0 })
  subtotal?: number;

  // 🆕 Added Fields
  @Prop({ type: Number, default: 0 })
  markUp?: number;

  @Prop({ type: Number, min: 0, default: 0 })
  finalCost?: number;

  @Prop({ type: Number, min: 0, default: 0 })
  realUsage?: number;

  @Prop({ type: Number, min: 0 })
  quotedPrice?: number;

  @Prop({ type: String })
  tab?: string; // Track which tab (números, estimado, progresso) the cost was added in
}

export const DetailedCostsSchema = SchemaFactory.createForClass(DetailedCosts);

export type DetailedCostsDocument = DetailedCosts & Document;

// Indexes for better query performance
DetailedCostsSchema.index({ projectId: 1 });
DetailedCostsSchema.index({ type: 1 });
DetailedCostsSchema.index({ createdAt: -1 });

// Calculate subtotal before saving
DetailedCostsSchema.pre("save", function () {
  this.subtotal = this.unitCost * this.quantity * this.days;
});

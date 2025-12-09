import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class OfficialEstimation {
  @Prop({ required: true, type: Types.ObjectId, ref: "Project" })
  projectId: Types.ObjectId;

  @Prop({ required: true, type: Number, min: 0 })
  totalConcrete: number;

  @Prop({ required: true, type: Number, min: 0 })
  totalSteel: number;

  @Prop({ required: true, type: Number, min: 0 })
  materialCost: number;

  @Prop({ required: true, type: Number, min: 0 })
  laborCost: number;

  @Prop({ required: true, type: Number, min: 0 })
  additionalCosts: number;

  @Prop({ required: true, type: Number, min: 0 })
  totalCost: number;

  @Prop({ required: false, type: Number, min: 0 })
  commission: number;

  @Prop({ type: Array, default: [] })
  materials?: any[];

  @Prop({ type: Array, default: [] })
  detailedCosts?: any[];

  @Prop({ type: Object, default: {} })
  dimensionData?: any;

  // ✅ Now stored as array of objects
  @Prop({
    type: [
      {
        length: { type: Number, default: 0 },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
                quantity: { type: Number, default: 0 },

        notes: { type: String, default: "" },
      },
    ],
    default: [],
  })
  foundation?: {
    length: number;
    width: number;
    height: number;
    quantity: number;
    notes?: string;
  }[];

  // ✅ Also array of objects
  @Prop({
    type: [
      {
        numberOfBolts: { type: Number, default: 0 },
        quantity: { type: Number, default: 0 },
        diameter: { type: Number, default: 0 },
        boltType: { type: String, default: "" },
        boltClass: { type: String, default: "" },
        length: { type: Number, default: 0 },
        notes: { type: String, default: "" },
      },
    ],
    default: [],
  })
  anchorBolts?: {
    numberOfBolts: number;
    quantity: number;
    diameter: number;
    boltType: string;
    boltClass: string;
    length: number;
    notes?: string;
  }[];

  // ✅ Also array of objects
  @Prop({
    type: [
      {
        length: { type: Number, default: 0 },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
        fillPercentage: { type: Number, default: 100 },
        notes: { type: String, default: "" },
      },
    ],
    default: [],
  })
  skidFill?: {
    length: number;
    width: number;
    height: number;
    fillPercentage: number;
    notes?: string;
  }[];

  @Prop({
    type: {
      materials: { type: Number, default: 0 },
      labor: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    default: {},
  })
  calculationResults?: {
    materials: number;
    labor: number;
    total: number;
  };

  @Prop({ type: Array, default: [] })
  estimatedMaterials?: any[];

  @Prop({ type: String, default: "Official Estimation" })
  versionName?: string;

  @Prop({ type: String, default: "" })
  notes?: string;

  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  creadoPor: Types.ObjectId;
}

export const OfficialEstimationSchema =
  SchemaFactory.createForClass(OfficialEstimation);

export type OfficialEstimationDocument = OfficialEstimation & Document;

// Indexes for better query performance
OfficialEstimationSchema.index({ projectId: 1 }, { unique: true }); // One official estimation per project
OfficialEstimationSchema.index({ creadoPor: 1 });
OfficialEstimationSchema.index({ createdAt: -1 });

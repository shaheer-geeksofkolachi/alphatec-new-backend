import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import {
  PROJECT_STATUS,
  PROJECT_FINANCIAL_STATUS,
} from "src/constants/project.constant";
import { Client } from "../clients/clients.schema";

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, trim: true, type: String })
  projectName: string;

  @Prop({ required: false, type: Types.ObjectId, ref: Client.name })
  clientId: Types.ObjectId;

  @Prop({ required: false, trim: true, type: String })
  location?: string;

  @Prop({
    required: true,
    default: PROJECT_STATUS.PROPOSAL,
    enum: Object.values(PROJECT_STATUS),
    type: String,
  })
  status: PROJECT_STATUS;

  @Prop({
    required: true,
    default: PROJECT_FINANCIAL_STATUS.BUDGET_PENDING,
    enum: Object.values(PROJECT_FINANCIAL_STATUS),
    type: String,
  })
  financialStatus: PROJECT_FINANCIAL_STATUS;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    type: String,
  })
  projectCode: string;

  @Prop({ type: String, default: "" })
  description: string;

    @Prop({
    type: [
      {
        fullName: { type: String, required: true, trim: true },
        position: { type: String, required: false, trim: true },
        email: { type: String, required: false, trim: true },
        phone: { type: String, required: false, trim: true },
        contactType: {
          type: String,
          enum: ["PRIMARY", "SECONDARY"],
          required: false,
        },
      },
    ],
    default: [],
  })
  contacts?: Array<{
    fullName?: string;
    position?: string;
    email?: string;
    phone?: string;
    contactType?: string;
  }>;

  // New fields for project details functionality
  @Prop({ type: Number, min: 0 })
  presupuestoEstimado?: number;

  @Prop({ type: Number, min: 0 })
  margenEstimado?: number;

  @Prop({ type: String })
  tipoServicio?: string;

  @Prop({ type: Number, min: 0 })
  responsableCostos?: number;

  @Prop({ type: String })
  projectType?: string;

  @Prop({ type: [String], default: [] })
  projectTypes?: string[];

  @Prop({ type: [String], default: [] })
  workTypes?: string[];

  @Prop({ type: [String], default: [] })
  machineTypes?: string[];

  @Prop({ type: [String], default: [] })
  beforeImages?: string[];

  @Prop({ type: [String], default: [] })
  afterImages?: string[];

  @Prop({ type: Object, default: {} })
  imageDescriptions?: Record<string, string>;

  @Prop({ type: [Types.ObjectId], ref: "User", default: [] })
  allowedUsers?: Types.ObjectId[]; // Users who have access to this project
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

export type ProjectDocument = Project & Document;

// Index for better query performance
ProjectSchema.index({ projectCode: 1 });
ProjectSchema.index({ clientId: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ financialStatus: 1 });

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Client } from "../clients/clients.schema";

@Schema({ timestamps: true })
export class WorkType {
  @Prop({ required: true, trim: true, type: String })
  name: string;

  @Prop({ required: false, type: Types.ObjectId, ref: Client.name })
  clientId: Types.ObjectId;
}

export const WorkTypeSchema = SchemaFactory.createForClass(WorkType);

export type ProjectTypeDocument = WorkType & Document;

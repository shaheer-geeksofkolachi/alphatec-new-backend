import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CONTACT_TYPE } from "src/constants/client.constant";

@Schema({ _id: false })
export class Contact {
  @Prop({ required: true, trim: true, type: String })
  fullName: string;

  @Prop({ required: true, trim: true, type: String })
  position: string;

  @Prop({ required: true, trim: true, type: String })
  email: string;

  @Prop({ required: false, trim: true, type: String })
  phone?: string;

  @Prop({
    required: false,
    enum: Object.values(CONTACT_TYPE),
    type: String,
  })
  contactType?: CONTACT_TYPE;

  @Prop({ required: false, trim: true, type: String })
  notes?: string;

  @Prop({ required: false, trim: true, type: String })
  linkedInUrl?: string;
}

@Schema({ timestamps: true })
export class Client {
  @Prop({ required: true, trim: true, type: String })
  companyName: string;

  @Prop({
    required: false,
    unique: true,
    sparse: true, // Allows multiple null/undefined values
    trim: true,
    type: String,
  })
  cifNit?: string;

  @Prop({ required: false, trim: true, type: String })
  vat?: string;

  @Prop({ required: false, trim: true, type: String })
  website?: string;

  @Prop({ required: true, trim: true, type: String })
  country: string;

  @Prop({ required: true, trim: true, type: String })
  city: string;

  @Prop({ required: false, trim: true, type: String })
  location?: string;

  @Prop({ type: String, default: "" })
  notes: string;

  @Prop({ type: [Contact], default: [] })
  contacts: Contact[];
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
export const ClientSchema = SchemaFactory.createForClass(Client);

export type ClientDocument = Client & Document;

// Index for better query performance
ClientSchema.index({ cifNit: 1 });
ClientSchema.index({ companyName: 1 });
ClientSchema.index({ country: 1 });
ClientSchema.index({ city: 1 });

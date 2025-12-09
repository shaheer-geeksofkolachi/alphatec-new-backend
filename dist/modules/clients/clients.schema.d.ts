import { Document } from "mongoose";
import { CONTACT_TYPE } from "src/constants/client.constant";
export declare class Contact {
    fullName: string;
    position: string;
    email: string;
    phone?: string;
    contactType?: CONTACT_TYPE;
    notes?: string;
    linkedInUrl?: string;
}
export declare class Client {
    companyName: string;
    cifNit?: string;
    vat?: string;
    website?: string;
    country: string;
    city: string;
    location?: string;
    notes: string;
    contacts: Contact[];
}
export declare const ContactSchema: import("mongoose").Schema<Contact, import("mongoose").Model<Contact, any, any, any, Document<unknown, any, Contact> & Contact & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Contact, Document<unknown, {}, import("mongoose").FlatRecord<Contact>> & import("mongoose").FlatRecord<Contact> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ClientSchema: import("mongoose").Schema<Client, import("mongoose").Model<Client, any, any, any, Document<unknown, any, Client> & Client & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Client, Document<unknown, {}, import("mongoose").FlatRecord<Client>> & import("mongoose").FlatRecord<Client> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type ClientDocument = Client & Document;

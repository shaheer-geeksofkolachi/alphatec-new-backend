import { Document, Types } from "mongoose";
export declare class Catalogue {
    itemName: string;
    categoryId: Types.ObjectId;
    description: string;
    manufacturer: string;
    partNumber: string;
    modelNumber: string;
    revision: string;
    recommendedApplications: string;
}
export declare const CatalogueSchema: import("mongoose").Schema<Catalogue, import("mongoose").Model<Catalogue, any, any, any, Document<unknown, any, Catalogue> & Catalogue & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Catalogue, Document<unknown, {}, import("mongoose").FlatRecord<Catalogue>> & import("mongoose").FlatRecord<Catalogue> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type CatalogueDocument = Catalogue & Document;

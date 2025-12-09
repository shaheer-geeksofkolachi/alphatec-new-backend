import { Document, Types } from "mongoose";
export declare class Materials {
    name: string;
    categoryId: Types.ObjectId;
    unit: string;
    price: number;
    calculationMethod?: string;
    description?: string;
}
export declare const MaterialsSchema: import("mongoose").Schema<Materials, import("mongoose").Model<Materials, any, any, any, Document<unknown, any, Materials> & Materials & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Materials, Document<unknown, {}, import("mongoose").FlatRecord<Materials>> & import("mongoose").FlatRecord<Materials> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type MaterialsDocument = Materials & Document;

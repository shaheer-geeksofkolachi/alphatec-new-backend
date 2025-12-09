import { Document, Types } from "mongoose";
export declare class DetailedCosts extends Document {
    projectId: Types.ObjectId;
    type: string;
    description: string;
    unitCost: number;
    materialType?: string;
    quantity: number;
    days: number;
    subtotal?: number;
    markUp?: number;
    finalCost?: number;
    realUsage?: number;
    quotedPrice?: number;
    tab?: string;
}
export declare const DetailedCostsSchema: import("mongoose").Schema<DetailedCosts, import("mongoose").Model<DetailedCosts, any, any, any, Document<unknown, any, DetailedCosts> & DetailedCosts & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DetailedCosts, Document<unknown, {}, import("mongoose").FlatRecord<DetailedCosts>> & import("mongoose").FlatRecord<DetailedCosts> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export type DetailedCostsDocument = DetailedCosts & Document;

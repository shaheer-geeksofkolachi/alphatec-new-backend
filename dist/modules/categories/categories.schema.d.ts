import { Document } from "mongoose";
export declare class Categories {
    name: string;
    color: string;
}
export declare const CategoriesSchema: import("mongoose").Schema<Categories, import("mongoose").Model<Categories, any, any, any, Document<unknown, any, Categories> & Categories & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Categories, Document<unknown, {}, import("mongoose").FlatRecord<Categories>> & import("mongoose").FlatRecord<Categories> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type CategoriesDocument = Categories & Document;

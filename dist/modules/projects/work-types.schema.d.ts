import { Document, Types } from "mongoose";
export declare class WorkType {
    name: string;
    clientId: Types.ObjectId;
}
export declare const WorkTypeSchema: import("mongoose").Schema<WorkType, import("mongoose").Model<WorkType, any, any, any, Document<unknown, any, WorkType> & WorkType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WorkType, Document<unknown, {}, import("mongoose").FlatRecord<WorkType>> & import("mongoose").FlatRecord<WorkType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type ProjectTypeDocument = WorkType & Document;

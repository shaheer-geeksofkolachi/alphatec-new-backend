import { Document, Types } from "mongoose";
export declare class ProjectType {
    name: string;
    clientId: Types.ObjectId;
}
export declare const ProjectTypeSchema: import("mongoose").Schema<ProjectType, import("mongoose").Model<ProjectType, any, any, any, Document<unknown, any, ProjectType> & ProjectType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProjectType, Document<unknown, {}, import("mongoose").FlatRecord<ProjectType>> & import("mongoose").FlatRecord<ProjectType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type ProjectTypeDocument = ProjectType & Document;

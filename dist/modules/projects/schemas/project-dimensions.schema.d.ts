import { Document, Types } from "mongoose";
export declare class ProjectDimensions {
    projectId: Types.ObjectId;
    length: number;
    width: number;
    height: number;
    notes?: string;
    foundation?: {
        length: number;
        width: number;
        height: number;
        notes?: string;
    };
    anchorBolts?: {
        numberOfBolts: number;
        quantity: number;
        diameter: number;
        boltType: string;
        boltClass: string;
        length: number;
        notes?: string;
    };
    skidFill?: {
        length: number;
        width: number;
        height: number;
        fillPercentage: number;
        notes?: string;
    };
}
export declare const ProjectDimensionsSchema: import("mongoose").Schema<ProjectDimensions, import("mongoose").Model<ProjectDimensions, any, any, any, Document<unknown, any, ProjectDimensions> & ProjectDimensions & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProjectDimensions, Document<unknown, {}, import("mongoose").FlatRecord<ProjectDimensions>> & import("mongoose").FlatRecord<ProjectDimensions> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type ProjectDimensionsDocument = ProjectDimensions & Document;

import { Document, Types } from "mongoose";
export declare class ReferenceProject {
    projectName: string;
    clientId: Types.ObjectId;
    categoryId: Types.ObjectId;
    location: string;
    country: string;
    description: string;
    projectType: string;
    workType: string;
    machineType: string;
    estimatedBudget: number;
    finalCost: number;
    marginAchieved: number;
    duration: number;
    teamSize: number;
    satisfactionRate: number;
    deliveryOnTime: boolean;
    useAsProjectTemplate: boolean;
    beforeImages?: string[];
    afterImages?: string[];
    imageDescriptions?: Record<string, string>;
}
export declare const ReferenceProjectSchema: import("mongoose").Schema<ReferenceProject, import("mongoose").Model<ReferenceProject, any, any, any, Document<unknown, any, ReferenceProject> & ReferenceProject & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ReferenceProject, Document<unknown, {}, import("mongoose").FlatRecord<ReferenceProject>> & import("mongoose").FlatRecord<ReferenceProject> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type ReferenceProjectDocument = ReferenceProject & Document;

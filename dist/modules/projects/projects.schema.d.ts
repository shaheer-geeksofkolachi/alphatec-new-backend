import { Document, Types } from "mongoose";
import { PROJECT_STATUS, PROJECT_FINANCIAL_STATUS } from "src/constants/project.constant";
export declare class Project {
    projectName: string;
    clientId: Types.ObjectId;
    location?: string;
    status: PROJECT_STATUS;
    financialStatus: PROJECT_FINANCIAL_STATUS;
    projectCode: string;
    description: string;
    contacts?: Array<{
        fullName?: string;
        position?: string;
        email?: string;
        phone?: string;
        contactType?: string;
    }>;
    presupuestoEstimado?: number;
    margenEstimado?: number;
    tipoServicio?: string;
    responsableCostos?: number;
    projectType?: string;
    projectTypes?: string[];
    workTypes?: string[];
    machineTypes?: string[];
    beforeImages?: string[];
    afterImages?: string[];
    imageDescriptions?: Record<string, string>;
    allowedUsers?: Types.ObjectId[];
}
export declare const ProjectSchema: import("mongoose").Schema<Project, import("mongoose").Model<Project, any, any, any, Document<unknown, any, Project> & Project & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Project, Document<unknown, {}, import("mongoose").FlatRecord<Project>> & import("mongoose").FlatRecord<Project> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type ProjectDocument = Project & Document;

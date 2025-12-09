import { Document, Types } from "mongoose";
export declare class EstimationVersions {
    projectId: Types.ObjectId;
    nombreVersion: string;
    descripcion?: string;
    dimensionData: any;
    costoMaterial: number;
    costoPersonal: number;
    costoTotal: number;
    additionalCosts?: number;
    detailedCosts?: any[];
    estimatedMaterials?: any[];
    creadoPor: Types.ObjectId;
}
export declare const EstimationVersionsSchema: import("mongoose").Schema<EstimationVersions, import("mongoose").Model<EstimationVersions, any, any, any, Document<unknown, any, EstimationVersions> & EstimationVersions & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EstimationVersions, Document<unknown, {}, import("mongoose").FlatRecord<EstimationVersions>> & import("mongoose").FlatRecord<EstimationVersions> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type EstimationVersionsDocument = EstimationVersions & Document;

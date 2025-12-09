import { Document, Types } from "mongoose";
export declare class OfficialEstimation {
    projectId: Types.ObjectId;
    totalConcrete: number;
    totalSteel: number;
    materialCost: number;
    laborCost: number;
    additionalCosts: number;
    totalCost: number;
    commission: number;
    materials?: any[];
    detailedCosts?: any[];
    dimensionData?: any;
    foundation?: {
        length: number;
        width: number;
        height: number;
        quantity: number;
        notes?: string;
    }[];
    anchorBolts?: {
        numberOfBolts: number;
        quantity: number;
        diameter: number;
        boltType: string;
        boltClass: string;
        length: number;
        notes?: string;
    }[];
    skidFill?: {
        length: number;
        width: number;
        height: number;
        fillPercentage: number;
        notes?: string;
    }[];
    calculationResults?: {
        materials: number;
        labor: number;
        total: number;
    };
    estimatedMaterials?: any[];
    versionName?: string;
    notes?: string;
    creadoPor: Types.ObjectId;
}
export declare const OfficialEstimationSchema: import("mongoose").Schema<OfficialEstimation, import("mongoose").Model<OfficialEstimation, any, any, any, Document<unknown, any, OfficialEstimation> & OfficialEstimation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OfficialEstimation, Document<unknown, {}, import("mongoose").FlatRecord<OfficialEstimation>> & import("mongoose").FlatRecord<OfficialEstimation> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type OfficialEstimationDocument = OfficialEstimation & Document;

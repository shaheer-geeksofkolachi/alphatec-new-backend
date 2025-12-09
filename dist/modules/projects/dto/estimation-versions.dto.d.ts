export declare class CreateEstimationVersionDto {
    nombreVersion: string;
    descripcion?: string;
    dimensionData: any;
    costoMaterial: number;
    costoPersonal: number;
    costoTotal: number;
    additionalCosts?: number;
    detailedCosts?: any[];
    estimatedMaterials?: any[];
}
export declare class UpdateEstimationVersionDto {
    nombreVersion?: string;
    descripcion?: string;
    dimensionData?: any;
    costoMaterial?: number;
    costoPersonal?: number;
    costoTotal?: number;
    additionalCosts?: number;
    detailedCosts?: any[];
    estimatedMaterials?: any[];
}

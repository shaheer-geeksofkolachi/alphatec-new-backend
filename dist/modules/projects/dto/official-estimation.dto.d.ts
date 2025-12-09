export declare class CreateOfficialEstimationDto {
    totalConcrete: number;
    totalSteel: number;
    materialCost: number;
    laborCost: number;
    additionalCosts: number;
    totalCost: number;
    commission?: number;
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
}
export declare class UpdateOfficialEstimationDto {
    totalConcrete?: number;
    totalSteel?: number;
    materialCost?: number;
    laborCost?: number;
    additionalCosts?: number;
    totalCost?: number;
    commission?: number;
    materials?: any[];
    detailedCosts?: any[];
    dimensionData?: any;
    foundation?: {
        length: number;
        width: number;
        height: number;
        quantity: number;
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
    calculationResults?: {
        materials: number;
        labor: number;
        total: number;
    };
    estimatedMaterials?: any[];
    versionName?: string;
    notes?: string;
}

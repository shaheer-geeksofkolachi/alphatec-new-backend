export declare class CreateProjectDimensionsDto {
    length: number;
    width: number;
    height: number;
    notes?: string;
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
}
export declare class UpdateProjectDimensionsDto {
    length?: number;
    width?: number;
    height?: number;
    notes?: string;
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
}

export declare class CreateDetailedCostDto {
    type: string;
    description: string;
    materialType: string;
    unitCost: number;
    quantity: number;
    markUp?: number;
    finalCost?: number;
    realUsage: number;
    days: number;
    tab?: string;
}
export declare class UpdateDetailedCostDto {
    type?: string;
    description?: string;
    unitCost?: number;
    materialType?: string;
    quantity?: number;
    days?: number;
    markUp?: number;
    realUsage?: number;
    finalCost?: number;
    quotedPrice?: number;
    tab?: string;
}

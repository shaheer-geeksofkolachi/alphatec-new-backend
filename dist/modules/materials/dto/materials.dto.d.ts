export declare class CreateMaterialsDto {
    name: string;
    categoryId: string;
    unit: string;
    price: number;
    calculationMethod?: string;
    description?: string;
}
export declare class UpdateMaterialsDto {
    name?: string;
    categoryId?: string;
    unit?: string;
    price?: number;
    calculationMethod?: string;
    description?: string;
}
export declare class MaterialsQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    unit?: string;
    calculationMethod?: string;
}

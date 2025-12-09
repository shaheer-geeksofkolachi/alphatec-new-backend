export declare class CreateCatalogueDto {
    itemName: string;
    categoryId: string;
    description: string;
    manufacturer: string;
    partNumber: string;
    modelNumber: string;
    revision: string;
    recommendedApplications: string;
}
export declare class UpdateCatalogueDto {
    itemName?: string;
    categoryId?: string;
    description?: string;
    manufacturer?: string;
    partNumber?: string;
    modelNumber?: string;
    revision?: string;
    recommendedApplications?: string;
}
export declare class CatalogueQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    manufacturer?: string;
}

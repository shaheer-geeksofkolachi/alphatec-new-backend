export declare class CreateCategoryDto {
    name: string;
    color: string;
}
export declare class UpdateCategoryDto {
    name?: string;
    color?: string;
}
export declare class CategoryQueryDto {
    page?: number;
    limit?: number;
    search?: string;
}

export declare class CreateReferenceProjectDto {
    projectName: string;
    clientId: string;
    categoryId: string;
    location: string;
    country: string;
    description?: string;
    projectType: string;
    workType: string;
    machineType: string;
    estimatedBudget: number;
    finalCost: number;
    marginAchieved: number;
    duration: number;
    teamSize: number;
    satisfactionRate: number;
    deliveryOnTime: boolean;
    useAsProjectTemplate: boolean;
    beforeImages?: string[];
    afterImages?: string[];
    imageDescriptions?: Record<string, string>;
}
export declare class UpdateReferenceProjectDto {
    projectName?: string;
    clientId?: string;
    categoryId?: string;
    location?: string;
    country?: string;
    description?: string;
    projectType?: string;
    workType?: string;
    machineType?: string;
    estimatedBudget?: number;
    finalCost?: number;
    marginAchieved?: number;
    duration?: number;
    teamSize?: number;
    satisfactionRate?: number;
    deliveryOnTime?: boolean;
    useAsProjectTemplate?: boolean;
    beforeImages?: string[];
    afterImages?: string[];
    imageDescriptions?: Record<string, string>;
}
export declare class ReferenceProjectQueryDto {
    clientId?: string;
    categoryId?: string;
    projectType?: string;
    workType?: string;
    machineType?: string;
    useAsProjectTemplate?: boolean;
    page?: number;
    limit?: number;
    search?: string;
}
export declare class UploadReferenceProjectImagesDto {
    imageType: "before" | "after";
}

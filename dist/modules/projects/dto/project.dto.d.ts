import { PROJECT_STATUS, PROJECT_FINANCIAL_STATUS } from "src/constants/project.constant";
export declare enum CONTACT_TYPE {
    PRIMARY = "PRIMARY",
    SECONDARY = "SECONDARY"
}
export declare class ContactDto {
    fullName: string;
    position?: string;
    email?: string;
    phone?: string;
    contactType?: CONTACT_TYPE;
}
export declare class CreateProjectDto {
    projectName: string;
    clientId: string;
    location?: string;
    status?: PROJECT_STATUS;
    financialStatus?: PROJECT_FINANCIAL_STATUS;
    projectCode: string;
    description?: string;
}
export declare class UpdateProjectDto {
    projectName?: string;
    clientId?: string;
    location?: string;
    status?: PROJECT_STATUS;
    financialStatus?: PROJECT_FINANCIAL_STATUS;
    projectCode?: string;
    description?: string;
    presupuestoEstimado?: number;
    margenEstimado?: number;
    tipoServicio?: string;
    responsableCostos?: number;
    projectType?: string;
    projectTypes?: string[];
    workTypes?: string[];
    machineTypes?: string[];
    beforeImages?: string[];
    afterImages?: string[];
    imageDescriptions?: Record<string, string>;
    contacts?: ContactDto[];
}
export declare class UpdateProjectStatusDto {
    status: PROJECT_STATUS;
}
export declare class UpdateProjectFinancialStatusDto {
    financialStatus: PROJECT_FINANCIAL_STATUS;
}
export declare class ProjectQueryDto {
    status?: PROJECT_STATUS;
    financialStatus?: PROJECT_FINANCIAL_STATUS;
    clientId?: string;
    page?: number;
    limit?: number;
    search?: string;
}
export declare class UploadProjectImagesDto {
    imageType: "before" | "after";
}
export declare class AssignProjectRightsDto {
    userId?: string;
    email?: string;
}
export declare class RevokeProjectRightsDto {
    userId: string;
}

import { CONTACT_TYPE } from "src/constants/client.constant";
export declare class ContactDto {
    fullName: string;
    position: string;
    email: string;
    phone?: string;
    contactType?: CONTACT_TYPE;
    notes?: string;
    linkedInUrl?: string;
}
export declare class CreateClientDto {
    companyName: string;
    cifNit?: string;
    vat?: string;
    website?: string;
    country: string;
    city: string;
    location?: string;
    notes?: string;
    contacts?: ContactDto[];
}
export declare class UpdateClientDto {
    companyName?: string;
    cifNit?: string;
    vat?: string;
    website?: string;
    country?: string;
    city?: string;
    location?: string;
    notes?: string;
    contacts?: ContactDto[];
}
export declare class ClientQueryDto {
    country?: string;
    city?: string;
    page?: number;
    limit?: number;
    search?: string;
}

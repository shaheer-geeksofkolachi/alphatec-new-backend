import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  IsEmail,
  MinLength,
  MaxLength,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { CONTACT_TYPE } from "src/constants/client.constant";

export class ContactDto {
  @ApiProperty({ description: "Full name of the contact" })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: "Position of the contact" })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ description: "Email address of the contact" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "Phone number of the contact" })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: "Type of contact",
    enum: CONTACT_TYPE,
  })
  @IsOptional()
  contactType?: CONTACT_TYPE;

  @ApiProperty({ description: "Notes about the contact", required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: "LinkedIn URL of the contact", required: false })
  @IsOptional()
  @IsString()
  linkedInUrl?: string;
}

export class CreateClientDto {
  @ApiProperty({ description: "Company name" })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ description: "CIF/NIT (Tax identification number)", required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  cifNit?: string;

  @ApiProperty({ description: "VAT (Value Added Tax)", required: false })
  @IsOptional()
  @IsString()
  vat?: string;

  @ApiProperty({ description: "Website URL", required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ description: "Country" })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: "City" })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: "Location/Address" })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ description: "Additional notes", required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: "List of contacts",
    type: [ContactDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contacts?: ContactDto[];
}

export class UpdateClientDto {
  @ApiProperty({ description: "Company name", required: false })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty({
    description: "CIF/NIT (Tax identification number)",
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  cifNit?: string;

  @ApiProperty({ description: "VAT (Value Added Tax)", required: false })
  @IsOptional()
  @IsString()
  vat?: string;

  @ApiProperty({ description: "Website URL", required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ description: "Country", required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ description: "City", required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ description: "Location/Address", required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: "Additional notes", required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: "List of contacts",
    type: [ContactDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contacts?: ContactDto[];
}

export class ClientQueryDto {
  @ApiProperty({ description: "Filter by country", required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ description: "Filter by city", required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ description: "Page number", required: false, default: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @ApiProperty({ description: "Items per page", required: false, default: 10 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @ApiProperty({ description: "Search term", required: false })
  @IsOptional()
  @IsString()
  search?: string;
}

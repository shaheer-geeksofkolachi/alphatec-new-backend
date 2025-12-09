import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsMongoId,
  IsNumber,
  MinLength,
  MaxLength,
  Min,
  ValidateNested,
  IsArray,
} from "class-validator";
import { Transform } from "class-transformer";
import { Type } from "class-transformer";

import {
  PROJECT_STATUS,
  PROJECT_FINANCIAL_STATUS,
} from "src/constants/project.constant";


export enum CONTACT_TYPE {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

export class ContactDto {
  @ApiProperty({ description: "Full name of the contact" })
  @IsString()
  fullName: string;

  @ApiProperty({ description: "Position of the contact", required: false })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({ description: "Email address of the contact", required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: "Phone number of the contact", required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: "Type of contact (PRIMARY or SECONDARY)",
    required: false,
    enum: CONTACT_TYPE,
  })
  @IsOptional()
  @IsEnum(CONTACT_TYPE)
  contactType?: CONTACT_TYPE;
}


// class ContactDto {
//   @ApiProperty({ description: "Full name of the contact" })
//   @IsString()
//   fullName: string;

//   @ApiProperty({ description: "Position or title", required: false })
//   @IsOptional()
//   @IsString()
//   position?: string;

//   @ApiProperty({ description: "Email address", required: false })
//   @IsOptional()
//   @IsString()
//   email?: string;

//   @ApiProperty({ description: "Phone number", required: false })
//   @IsOptional()
//   @IsString()
//   phone?: string;
// }


export class CreateProjectDto {
  @ApiProperty({ description: "Name of the project" })
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @ApiProperty({ description: "Client ID (MongoDB ObjectId)" })
  @IsMongoId()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ description: "Project location" })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: "Project status",
    enum: PROJECT_STATUS,
    default: PROJECT_STATUS.PROPOSAL,
  })
  @IsOptional()
  @IsEnum(PROJECT_STATUS)
  status?: PROJECT_STATUS;

  @ApiProperty({
    description: "Project financial status",
    enum: PROJECT_FINANCIAL_STATUS,
    default: PROJECT_FINANCIAL_STATUS.BUDGET_PENDING,
  })
  @IsOptional()
  @IsEnum(PROJECT_FINANCIAL_STATUS)
  financialStatus?: PROJECT_FINANCIAL_STATUS;

  @ApiProperty({ description: "Unique project code" })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  projectCode: string;

  @ApiProperty({ description: "Project description", required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateProjectDto {
  @ApiProperty({ description: "Name of the project", required: false })
  @IsOptional()
  @IsString()
  projectName?: string;

  @ApiProperty({ description: "Client ID (MongoDB ObjectId)", required: false })
  @IsOptional()
  @IsMongoId()
  clientId?: string;

  @ApiProperty({ description: "Project location", required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: "Project status",
    enum: PROJECT_STATUS,
    required: false,
  })
  @IsOptional()
  @IsEnum(PROJECT_STATUS)
  status?: PROJECT_STATUS;

  @ApiProperty({
    description: "Project financial status",
    enum: PROJECT_FINANCIAL_STATUS,
    required: false,
  })
  @IsOptional()
  @IsEnum(PROJECT_FINANCIAL_STATUS)
  financialStatus?: PROJECT_FINANCIAL_STATUS;

  @ApiProperty({ description: "Unique project code", required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  projectCode?: string;

  @ApiProperty({ description: "Project description", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "Estimated budget", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  presupuestoEstimado?: number;

  @ApiProperty({ description: "Estimated margin", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  margenEstimado?: number;

  @ApiProperty({ description: "Service type", required: false })
  @IsOptional()
  @IsString()
  tipoServicio?: string;

  @ApiProperty({
    description: "Cost responsible person ID",
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  responsableCostos?: number;

  @ApiProperty({ description: "Project type", required: false })
  @IsOptional()
  @IsString()
  projectType?: string;

  @ApiProperty({ description: "Project types (multiple)", required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  projectTypes?: string[];

  @ApiProperty({ description: "Work types", required: false })
  @IsOptional()
  @IsString({ each: true })
  workTypes?: string[];

  @ApiProperty({ description: "Machine types", required: false })
  @IsOptional()
  @IsString({ each: true })
  machineTypes?: string[];

  @ApiProperty({ description: "Before images", required: false })
  @IsOptional()
  @IsString({ each: true })
  beforeImages?: string[];

  @ApiProperty({ description: "After images", required: false })
  @IsOptional()
  @IsString({ each: true })
  afterImages?: string[];

  @ApiProperty({ description: "Image descriptions", required: false })
  @IsOptional()
  imageDescriptions?: Record<string, string>;

   @ApiProperty({
    description: "List of contacts related to the project",
    required: false,
    type: [ContactDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contacts?: ContactDto[];
}

export class UpdateProjectStatusDto {
  @ApiProperty({
    description: "Project status",
    enum: PROJECT_STATUS,
  })
  @IsEnum(PROJECT_STATUS)
  @IsNotEmpty()
  status: PROJECT_STATUS;
}

export class UpdateProjectFinancialStatusDto {
  @ApiProperty({
    description: "Project financial status",
    enum: PROJECT_FINANCIAL_STATUS,
  })
  @IsEnum(PROJECT_FINANCIAL_STATUS)
  @IsNotEmpty()
  financialStatus: PROJECT_FINANCIAL_STATUS;
}

export class ProjectQueryDto {
  @ApiProperty({ description: "Filter by status", required: false })
  @IsOptional()
  @IsEnum(PROJECT_STATUS)
  status?: PROJECT_STATUS;

  @ApiProperty({ description: "Filter by financial status", required: false })
  @IsOptional()
  @IsEnum(PROJECT_FINANCIAL_STATUS)
  financialStatus?: PROJECT_FINANCIAL_STATUS;

  @ApiProperty({ description: "Filter by client ID", required: false })
  @IsOptional()
  @IsMongoId()
  clientId?: string;

  @ApiProperty({ description: "Page number", required: false, default: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number = 1;

  @ApiProperty({ description: "Items per page", required: false, default: 10 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit?: number = 10;

  @ApiProperty({ description: "Search term", required: false })
  @IsOptional()
  @IsString()
  search?: string;
}

export class UploadProjectImagesDto {
  @ApiProperty({
    description: "Image type - before or after",
    enum: ["before", "after"],
  })
  @IsString()
  @IsNotEmpty()
  imageType: "before" | "after";
}

export class AssignProjectRightsDto {
  @ApiProperty({ description: "User ID to assign rights to", required: false })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @ApiProperty({ description: "Email address to invite (if user doesn't exist)", required: false })
  @IsOptional()
  @IsString()
  email?: string;
}

export class RevokeProjectRightsDto {
  @ApiProperty({ description: "User ID to revoke rights from" })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}

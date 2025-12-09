import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsNumber,
  IsBoolean,
  Min,
  Max,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateReferenceProjectDto {
  @ApiProperty({ description: "Name of the reference project" })
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @ApiProperty({ description: "Client ID (MongoDB ObjectId)" })
  @IsMongoId()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ description: "Category ID (MongoDB ObjectId)" })
  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ description: "Project location" })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: "Project country" })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: "Project description", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "Type of project" })
  @IsString()
  @IsNotEmpty()
  projectType: string;

  @ApiProperty({ description: "Type of work" })
  @IsString()
  @IsNotEmpty()
  workType: string;

  @ApiProperty({ description: "Type of machine used" })
  @IsString()
  @IsNotEmpty()
  machineType: string;

  @ApiProperty({ description: "Estimated budget for the project" })
  @IsNumber()
  estimatedBudget: number;

  @ApiProperty({ description: "Final cost of the project" })
  @IsNumber()
  finalCost: number;

  @ApiProperty({ description: "Margin achieved (0-100)" })
  @IsNumber()
  marginAchieved: number;

  @ApiProperty({ description: "Project duration in days" })
  @IsNumber()
  duration: number;

  @ApiProperty({ description: "Team size for the project" })
  @IsNumber()
  teamSize: number;

  @ApiProperty({ description: "Satisfaction rate (0-10)" })
  @IsNumber()
  @Min(0)
  @Max(10)
  satisfactionRate: number;

  @ApiProperty({ description: "Whether project was delivered on time" })
  @IsBoolean()
  deliveryOnTime: boolean;

  @ApiProperty({ description: "Whether to use as project template" })
  @IsBoolean()
  useAsProjectTemplate: boolean;

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
}

export class UpdateReferenceProjectDto {
  @ApiProperty({
    description: "Name of the reference project",
    required: false,
  })
  @IsOptional()
  @IsString()
  projectName?: string;

  @ApiProperty({ description: "Client ID (MongoDB ObjectId)", required: false })
  @IsOptional()
  @IsMongoId()
  clientId?: string;

  @ApiProperty({
    description: "Category ID (MongoDB ObjectId)",
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @ApiProperty({ description: "Project location", required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: "Project country", required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ description: "Project description", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "Type of project", required: false })
  @IsOptional()
  @IsString()
  projectType?: string;

  @ApiProperty({ description: "Type of work", required: false })
  @IsOptional()
  @IsString()
  workType?: string;

  @ApiProperty({ description: "Type of machine used", required: false })
  @IsOptional()
  @IsString()
  machineType?: string;

  @ApiProperty({
    description: "Estimated budget for the project",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  estimatedBudget?: number;

  @ApiProperty({ description: "Final cost of the project", required: false })
  @IsOptional()
  @IsNumber()
  finalCost?: number;

  @ApiProperty({ description: "Margin achieved (0-100)", required: false })
  @IsOptional()
  @IsNumber()
  marginAchieved?: number;

  @ApiProperty({ description: "Project duration in days", required: false })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({ description: "Team size for the project", required: false })
  @IsOptional()
  @IsNumber()
  teamSize?: number;

  @ApiProperty({ description: "Satisfaction rate (0-10)", required: false })
  @IsOptional()
  @IsNumber()
  satisfactionRate?: number;

  @ApiProperty({
    description: "Whether project was delivered on time",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  deliveryOnTime?: boolean;

  @ApiProperty({
    description: "Whether to use as project template",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  useAsProjectTemplate?: boolean;

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
}

export class ReferenceProjectQueryDto {
  @ApiProperty({ description: "Filter by client ID", required: false })
  @IsOptional()
  @IsMongoId()
  clientId?: string;

  @ApiProperty({ description: "Filter by category ID", required: false })
  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @ApiProperty({ description: "Filter by project type", required: false })
  @IsOptional()
  @IsString()
  projectType?: string;

  @ApiProperty({ description: "Filter by work type", required: false })
  @IsOptional()
  @IsString()
  workType?: string;

  @ApiProperty({ description: "Filter by machine type", required: false })
  @IsOptional()
  @IsString()
  machineType?: string;

  @ApiProperty({ description: "Filter by use as template", required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === "true")
  useAsProjectTemplate?: boolean;

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

export class UploadReferenceProjectImagesDto {
  @ApiProperty({
    description: "Image type - before or after",
    enum: ["before", "after"],
  })
  @IsString()
  @IsNotEmpty()
  imageType: "before" | "after";
}

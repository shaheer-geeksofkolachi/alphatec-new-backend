import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsMongoId,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateCatalogueDto {
  @ApiProperty({ description: "Item name" })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  itemName: string;

  @ApiProperty({ description: "Category ID" })
  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ description: "Item description" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ApiProperty({ description: "Manufacturer name" })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  manufacturer: string;

  @ApiProperty({ description: "Part number" })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  partNumber: string;

  @ApiProperty({ description: "Model number" })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  modelNumber: string;

  @ApiProperty({ description: "Revision" })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  revision: string;

  @ApiProperty({ description: "Recommended applications" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  recommendedApplications: string;
}

export class UpdateCatalogueDto {
  @ApiProperty({ description: "Item name", required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  itemName?: string;

  @ApiProperty({ description: "Category ID", required: false })
  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @ApiProperty({ description: "Item description", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ description: "Manufacturer name", required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  manufacturer?: string;

  @ApiProperty({ description: "Part number", required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  partNumber?: string;

  @ApiProperty({ description: "Model number", required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  modelNumber?: string;

  @ApiProperty({ description: "Revision", required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  revision?: string;

  @ApiProperty({ description: "Recommended applications", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  recommendedApplications?: string;
}

export class CatalogueQueryDto {
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

  @ApiProperty({ description: "Category ID filter", required: false })
  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @ApiProperty({ description: "Manufacturer filter", required: false })
  @IsOptional()
  @IsString()
  manufacturer?: string;
}

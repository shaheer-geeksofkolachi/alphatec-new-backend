import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsMongoId,
  IsNumber,
  Min,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateMaterialsDto {
  @ApiProperty({ description: "Item name" })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  name: string;

  @ApiProperty({ description: "Category ID" })
  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ description: "Unit of measurement" })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  unit: string;

  @ApiProperty({ description: "Price per unit" })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: "Calculation method" })
  @IsString()
  @IsOptional()
  calculationMethod?: string;

  @ApiProperty({ description: "Material description" })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;
}

export class UpdateMaterialsDto {
  @ApiProperty({ description: "Item name", required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  name?: string;

  @ApiProperty({ description: "Category ID", required: false })
  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @ApiProperty({ description: "Unit of measurement", required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  unit?: string;

  @ApiProperty({ description: "Price per unit", required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ description: "Calculation method", required: false })
  @IsOptional()
  @IsOptional()
  calculationMethod?: string;

  @ApiProperty({ description: "Material description", required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class MaterialsQueryDto {
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

  @ApiProperty({ description: "Unit filter", required: false })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({ description: "Calculation method filter", required: false })
  @IsOptional()
  @IsString()
  calculationMethod?: string;
}

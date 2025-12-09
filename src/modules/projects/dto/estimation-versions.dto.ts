import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsObject,
  IsArray,
  Min,
} from "class-validator";

export class CreateEstimationVersionDto {
  @ApiProperty({ description: "Version name" })
  @IsString()
  @IsNotEmpty()
  nombreVersion: string;

  @ApiProperty({ description: "Version description", required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: "Dimension data" })
  @IsObject()
  @IsNotEmpty()
  dimensionData: any;

  @ApiProperty({ description: "Material cost", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  costoMaterial: number;

  @ApiProperty({ description: "Labor cost", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  costoPersonal: number;

  @ApiProperty({ description: "Total cost", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  costoTotal: number;

  @ApiProperty({ description: "Additional costs", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  additionalCosts?: number;

  @ApiProperty({ description: "Detailed costs array", required: false })
  @IsOptional()
  @IsArray()
  detailedCosts?: any[];

  @ApiProperty({ description: "Estimated materials array", required: false })
  @IsOptional()
  @IsArray()
  estimatedMaterials?: any[];
}

export class UpdateEstimationVersionDto {
  @ApiProperty({ description: "Version name", required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombreVersion?: string;

  @ApiProperty({ description: "Version description", required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: "Dimension data", required: false })
  @IsOptional()
  @IsObject()
  dimensionData?: any;

  @ApiProperty({ description: "Material cost", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  costoMaterial?: number;

  @ApiProperty({ description: "Labor cost", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  costoPersonal?: number;

  @ApiProperty({ description: "Total cost", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  costoTotal?: number;

  @ApiProperty({ description: "Additional costs", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  additionalCosts?: number;

  @ApiProperty({ description: "Detailed costs array", required: false })
  @IsOptional()
  @IsArray()
  detailedCosts?: any[];

  @ApiProperty({ description: "Estimated materials array", required: false })
  @IsOptional()
  @IsArray()
  estimatedMaterials?: any[];
}

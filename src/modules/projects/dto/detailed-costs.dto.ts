import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, Min,IsOptional } from "class-validator";

export class CreateDetailedCostDto {
  @ApiProperty({ description: "Type of cost" })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: "Description of the cost", required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: "Material Type" })
  @IsString()
  materialType: string;

  @ApiProperty({ description: "Unit cost", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  unitCost: number;

  @ApiProperty({ description: "Quantity", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  quantity: number;

   @ApiProperty({ description: "Markup percentage applied to unit cost", required: false })
  @IsNumber()
  @IsOptional()
  markUp?: number;

  @ApiProperty({ description: "Markup percentage applied to unit cost", required: false })
  @IsNumber()
  @IsOptional()
  finalCost?: number;

  @ApiProperty({ description: "Real Usage", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  realUsage: number;

  @ApiProperty({ description: "Number of days", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  days: number;

  @ApiProperty({ description: "Tab where cost was added (números, estimado, progresso)", required: false })
  @IsString()
  @IsOptional()
  tab?: string;
}

// export class UpdateDetailedCostDto {
//   @ApiProperty({ description: "Type of cost", required: false })
//   @IsString()
//   @IsNotEmpty()
//   type?: string;

//   @ApiProperty({ description: "Description of the cost", required: false })
//   @IsString()
//   @IsNotEmpty()
//   description?: string;

//   @ApiProperty({ description: "Unit cost", minimum: 0, required: false })
//   @IsNumber()
//   @Min(0)
//   unitCost?: number;

//   @ApiProperty({ description: "Material Type" })
//   @IsString()
//   materialType: string;

//   @ApiProperty({ description: "Quantity", minimum: 0, required: false })
//   @IsNumber()
//   @Min(0)
//   quantity?: number;

//   @ApiProperty({ description: "Number of days", minimum: 0, required: false })
//   @IsNumber()
//   @Min(0)
//   days?: number;
// }

export class UpdateDetailedCostDto {
  @ApiProperty({ description: "Type of cost", required: false })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ description: "Description of the cost", required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: "Unit cost", minimum: 0, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  unitCost?: number;

  @ApiProperty({ description: "Material Type", required: false })
  @IsString()
  @IsOptional()
  materialType?: string;

  @ApiProperty({ description: "Quantity", minimum: 0, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity?: number;

  @ApiProperty({ description: "Number of days", minimum: 0, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  days?: number;

  // 🆕 Added fields
  @ApiProperty({ description: "Markup percentage applied to unit cost", required: false })
  @IsNumber()
  @IsOptional()
  markUp?: number;

  @ApiProperty({ description: "Real Usage is required", required: false })
  @IsNumber()
  @IsOptional()
  realUsage?: number;

  @ApiProperty({ description: "Final cost after markup", required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  finalCost?: number;

  @ApiProperty({ description: "Quoted price per unit (can be different from calculated price)", required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  quotedPrice?: number;

  @ApiProperty({ description: "Tab where cost was added (números, estimado, progresso)", required: false })
  @IsString()
  @IsOptional()
  tab?: string;
}

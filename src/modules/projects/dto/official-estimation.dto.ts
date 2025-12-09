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

// export class CreateOfficialEstimationDto {
//   @ApiProperty({ description: "Total concrete amount", minimum: 0 })
//   @IsNumber()
//   @Min(0)
//   @IsNotEmpty()
//   totalConcrete: number;

//   @ApiProperty({ description: "Total steel amount", minimum: 0 })
//   @IsNumber()
//   @Min(0)
//   @IsNotEmpty()
//   totalSteel: number;

//   @ApiProperty({ description: "Material cost", minimum: 0 })
//   @IsNumber()
//   @Min(0)
//   @IsNotEmpty()
//   materialCost: number;

//   @ApiProperty({ description: "Labor cost", minimum: 0 })
//   @IsNumber()
//   @Min(0)
//   @IsNotEmpty()
//   laborCost: number;

//   @ApiProperty({ description: "Additional costs", minimum: 0 })
//   @IsNumber()
//   @Min(0)
//   @IsNotEmpty()
//   additionalCosts: number;

//   @ApiProperty({ description: "Total cost", minimum: 0 })
//   @IsNumber()
//   @Min(0)
//   @IsNotEmpty()
//   totalCost: number;

//   @ApiProperty({ description: "Materials array", required: false })
//   @IsOptional()
//   @IsArray()
//   materials?: any[];

//   @ApiProperty({ description: "Detailed costs array", required: false })
//   @IsOptional()
//   @IsArray()
//   detailedCosts?: any[];

//   @ApiProperty({ description: "Dimension data", required: false })
//   @IsOptional()
//   @IsObject()
//   dimensionData?: any;

//   @ApiProperty({ description: "Foundation data", required: false })
//   @IsOptional()
//   @IsObject()
//   foundation?: {
//     length: number;
//     width: number;
//     height: number;
//     notes?: string;
//   };

//   @ApiProperty({ description: "Anchor bolts data", required: false })
//   @IsOptional()
//   @IsObject()
//   anchorBolts?: {
//     numberOfBolts: number;
//     quantity: number;
//     diameter: number;
//     boltType: string;
//     boltClass: string;
//     length: number;
//     notes?: string;
//   };

//   @ApiProperty({ description: "Skid fill data", required: false })
//   @IsOptional()
//   @IsObject()
//   skidFill?: {
//     length: number;
//     width: number;
//     height: number;
//     fillPercentage: number;
//     notes?: string;
//   };

//   @ApiProperty({ description: "Calculation results", required: false })
//   @IsOptional()
//   @IsObject()
//   calculationResults?: {
//     materials: number;
//     labor: number;
//     total: number;
//   };

//   @ApiProperty({ description: "Estimated materials array", required: false })
//   @IsOptional()
//   @IsArray()
//   estimatedMaterials?: any[];

//   @ApiProperty({ description: "Version name", required: false })
//   @IsOptional()
//   @IsString()
//   versionName?: string;

//   @ApiProperty({ description: "Notes", required: false })
//   @IsOptional()
//   @IsString()
//   notes?: string;
// }

export class CreateOfficialEstimationDto {
  @ApiProperty({ description: "Total concrete amount", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  totalConcrete: number;

  @ApiProperty({ description: "Total steel amount", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  totalSteel: number;

  @ApiProperty({ description: "Material cost", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  materialCost: number;

  @ApiProperty({ description: "Labor cost", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  laborCost: number;

  @ApiProperty({ description: "Additional costs", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  additionalCosts: number;

  @ApiProperty({ description: "Total cost", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  totalCost: number;

  @ApiProperty({ description: "Commission", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  commission?: number;

  @ApiProperty({ description: "Materials array", required: false })
  @IsOptional()
  @IsArray()
  materials?: any[];

  @ApiProperty({ description: "Detailed costs array", required: false })
  @IsOptional()
  @IsArray()
  detailedCosts?: any[];

  @ApiProperty({ description: "Dimension data", required: false })
  @IsOptional()
  @IsObject()
  dimensionData?: any;

  // ✅ Changed to array to match frontend
  @ApiProperty({
    description: "Foundation data (array of foundation elements)",
    required: false,
    type: [Object],
  })
  @IsOptional()
  @IsArray()
  foundation?: {
    length: number;
    width: number;
    height: number;
    quantity: number;
    notes?: string;
  }[];

  // ✅ Changed to array to match frontend
  @ApiProperty({
    description: "Anchor bolts data (array of bolt configurations)",
    required: false,
    type: [Object],
  })
  @IsOptional()
  @IsArray()
  anchorBolts?: {
    numberOfBolts: number;
    quantity: number;
    diameter: number;
    boltType: string;
    boltClass: string;
    length: number;
    notes?: string;
  }[];

  // ✅ Changed to array to match frontend
  @ApiProperty({
    description: "Skid fill data (array of skid fill elements)",
    required: false,
    type: [Object],
  })
  @IsOptional()
  @IsArray()
  skidFill?: {
    length: number;
    width: number;
    height: number;
    fillPercentage: number;
    notes?: string;
  }[];

  @ApiProperty({ description: "Calculation results", required: false })
  @IsOptional()
  @IsObject()
  calculationResults?: {
    materials: number;
    labor: number;
    total: number;
  };

  @ApiProperty({ description: "Estimated materials array", required: false })
  @IsOptional()
  @IsArray()
  estimatedMaterials?: any[];

  @ApiProperty({ description: "Version name", required: false })
  @IsOptional()
  @IsString()
  versionName?: string;

  @ApiProperty({ description: "Notes", required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateOfficialEstimationDto {
  @ApiProperty({
    description: "Total concrete amount",
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalConcrete?: number;

  @ApiProperty({
    description: "Total steel amount",
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalSteel?: number;

  @ApiProperty({ description: "Material cost", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  materialCost?: number;

  @ApiProperty({ description: "Labor cost", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  laborCost?: number;

  @ApiProperty({ description: "Additional costs", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  additionalCosts?: number;

  @ApiProperty({ description: "Total cost", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalCost?: number;

  @ApiProperty({ description: "Commission", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  commission?: number;

  @ApiProperty({ description: "Materials array", required: false })
  @IsOptional()
  @IsArray()
  materials?: any[];

  @ApiProperty({ description: "Detailed costs array", required: false })
  @IsOptional()
  @IsArray()
  detailedCosts?: any[];

  @ApiProperty({ description: "Dimension data", required: false })
  @IsOptional()
  @IsObject()
  dimensionData?: any;

  @ApiProperty({ description: "Foundation data", required: false })
  @IsOptional()
  @IsObject()
  foundation?: {
    length: number;
    width: number;
    height: number;
    quantity: number;
    notes?: string;
  };

  @ApiProperty({ description: "Anchor bolts data", required: false })
  @IsOptional()
  @IsObject()
  anchorBolts?: {
    numberOfBolts: number;
    quantity: number;
    diameter: number;
    boltType: string;
    boltClass: string;
    length: number;
    notes?: string;
  };

  @ApiProperty({ description: "Skid fill data", required: false })
  @IsOptional()
  @IsObject()
  skidFill?: {
    length: number;
    width: number;
    height: number;
    fillPercentage: number;
    notes?: string;
  };

  @ApiProperty({ description: "Calculation results", required: false })
  @IsOptional()
  @IsObject()
  calculationResults?: {
    materials: number;
    labor: number;
    total: number;
  };

  @ApiProperty({ description: "Estimated materials array", required: false })
  @IsOptional()
  @IsArray()
  estimatedMaterials?: any[];

  @ApiProperty({ description: "Version name", required: false })
  @IsOptional()
  @IsString()
  versionName?: string;

  @ApiProperty({ description: "Notes", required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

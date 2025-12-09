import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsObject,
  Min,
} from "class-validator";

export class CreateProjectDimensionsDto {
  @ApiProperty({ description: "Length in meters", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  length: number;

  @ApiProperty({ description: "Width in meters", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  width: number;

  @ApiProperty({ description: "Height in meters", minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  height: number;

  @ApiProperty({ description: "Additional notes", required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: "Foundation specific data", required: false })
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
}

export class UpdateProjectDimensionsDto {
  @ApiProperty({ description: "Length in meters", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  length?: number;

  @ApiProperty({ description: "Width in meters", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  width?: number;

  @ApiProperty({ description: "Height in meters", minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number;

  @ApiProperty({ description: "Additional notes", required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: "Foundation specific data", required: false })
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
}

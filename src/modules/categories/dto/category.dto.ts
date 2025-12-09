import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateCategoryDto {
  @ApiProperty({ description: "Category name" })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: "Category color in hex format, e.g., #ff0000" })
  @IsString()
  @IsNotEmpty()
  color: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ description: "Category name", required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @ApiProperty({ description: "Category color in hex format, e.g., #ff0000" })
  @IsString()
  @IsNotEmpty()
  color?: string;
}

export class CategoryQueryDto {
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

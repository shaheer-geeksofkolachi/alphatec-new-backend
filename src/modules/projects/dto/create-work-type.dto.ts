import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateWorkTypeDto {
  @ApiProperty({ description: "Work Type" })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateWorkTypeDto {
  @ApiProperty({ description: "Work Type", required: false })
  @IsString()
  @IsOptional()
  name?: string;
}

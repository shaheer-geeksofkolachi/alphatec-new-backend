import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateProjectTypeDto {
  @ApiProperty({ description: "Project Type" })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateProjectTypeDto {
  @ApiProperty({ description: "Project Type", required: false })
  @IsString()
  @IsOptional()
  name?: string;
}

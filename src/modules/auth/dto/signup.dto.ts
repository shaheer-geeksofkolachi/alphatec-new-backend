import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { USER_ROLES } from "src/constants/user.constant";

export class SignupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: USER_ROLES, isArray: true })
  @IsArray()
  @IsEnum(USER_ROLES, { each: true })
  roles: USER_ROLES[];
}

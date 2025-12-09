import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles.decorator";
import { GetUser } from "src/decorator/user.decorator";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { USER_ROLES } from "src/constants/user.constant";
import { CreateUserDto, UpdateUserDto, ChangeEmailDto } from "./dto/user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetOrganizationId } from "src/decorator/organization.decorator";

@Controller("users")
@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("avatar"))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.userService.create(createUserDto, file);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get("all")
  @Roles(USER_ROLES.MANAGER, USER_ROLES.ENGINEER, USER_ROLES.VIEWER)
  findAllUsers(@GetOrganizationId() organizationId: string) {
    return this.userService.findAllUsers(organizationId);
  }

  @Get(":id")
  @Roles(USER_ROLES.MANAGER, USER_ROLES.ENGINEER, USER_ROLES.VIEWER)
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch("change-email")
  changeEmail(
    @GetUser("id") userId: string,
    @Body() changeEmailDto: ChangeEmailDto
  ) {
    return this.userService.changeEmail(userId, changeEmailDto);
  }

  @Patch(":id")
  @Roles(USER_ROLES.SUPER_ADMIN)
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("avatar"))
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.userService.update(id, updateUserDto, file);
  }

  @Delete(":id")
  @Roles(USER_ROLES.SUPER_ADMIN)
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}

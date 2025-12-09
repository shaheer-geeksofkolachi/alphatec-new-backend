import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProjectDimensionsService } from "../services/project-dimensions.service";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { USER_ROLES } from "src/constants/user.constant";
import {
  CreateProjectDimensionsDto,
  UpdateProjectDimensionsDto,
} from "../dto/project-dimensions.dto";

@Controller("projects/:projectId/dimensions")
@ApiTags("Project Dimensions")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectDimensionsController {
  constructor(
    private readonly projectDimensionsService: ProjectDimensionsService
  ) {}

  @Post()
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER, USER_ROLES.ENGINEER)
  async create(
    @Param("projectId") projectId: string,
    @Body() createDto: CreateProjectDimensionsDto
  ) {
    return this.projectDimensionsService.create(projectId, createDto);
  }

  @Get()
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  async findAll(@Param("projectId") projectId: string) {
    return this.projectDimensionsService.findAll(projectId);
  }

  @Get(":id")
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  async findOne(
    @Param("projectId") projectId: string,
    @Param("id") id: string
  ) {
    return this.projectDimensionsService.findOne(projectId, id);
  }

  @Patch(":id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER, USER_ROLES.ENGINEER)
  async update(
    @Param("projectId") projectId: string,
    @Param("id") id: string,
    @Body() updateDto: UpdateProjectDimensionsDto
  ) {
    return this.projectDimensionsService.update(projectId, id, updateDto);
  }

  @Delete(":id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async remove(@Param("projectId") projectId: string, @Param("id") id: string) {
    return this.projectDimensionsService.remove(projectId, id);
  }
}

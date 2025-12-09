import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { EstimationVersionsService } from "../services/estimation-versions.service";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { USER_ROLES } from "src/constants/user.constant";
import {
  CreateEstimationVersionDto,
  UpdateEstimationVersionDto,
} from "../dto/estimation-versions.dto";

@Controller("projects/:projectId/estimation-versions")
@ApiTags("Estimation Versions")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstimationVersionsController {
  constructor(
    private readonly estimationVersionsService: EstimationVersionsService
  ) {}

  @Post()
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER, USER_ROLES.ENGINEER)
  async create(
    @Param("projectId") projectId: string,
    @Body() createDto: CreateEstimationVersionDto,
    @Request() req: any
  ) {
    const userId = req.user?.id || req.user?._id;
    return this.estimationVersionsService.create(projectId, createDto, userId);
  }

  @Get()
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  async findAll(@Param("projectId") projectId: string) {
    return this.estimationVersionsService.findAll(projectId);
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
    return this.estimationVersionsService.findOne(projectId, id);
  }

  @Patch(":id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER, USER_ROLES.ENGINEER)
  async update(
    @Param("projectId") projectId: string,
    @Param("id") id: string,
    @Body() updateDto: UpdateEstimationVersionDto
  ) {
    return this.estimationVersionsService.update(projectId, id, updateDto);
  }

  @Delete(":id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async remove(@Param("projectId") projectId: string, @Param("id") id: string) {
    return this.estimationVersionsService.remove(projectId, id);
  }
}

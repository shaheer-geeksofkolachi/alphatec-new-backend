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
import { OfficialEstimationService } from "../services/official-estimation.service";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { USER_ROLES } from "src/constants/user.constant";
import {
  CreateOfficialEstimationDto,
  UpdateOfficialEstimationDto,
} from "../dto/official-estimation.dto";

@Controller("projects/:projectId/official-estimate")
@ApiTags("Official Estimation")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class OfficialEstimationController {
  constructor(
    private readonly officialEstimationService: OfficialEstimationService
  ) {}

  @Post()
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER, USER_ROLES.ENGINEER)
  async create(
    @Param("projectId") projectId: string,
    @Body() createDto: CreateOfficialEstimationDto,
    @Request() req: any
  ) {
    const userId = req.user?.id || req.user?._id;
    return this.officialEstimationService.create(projectId, createDto, userId);
  }

  @Get()
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  async findOne(@Param("projectId") projectId: string) {
    return await this.officialEstimationService.findOne(projectId);
  }

  @Patch()
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER, USER_ROLES.ENGINEER)
  async update(
    @Param("projectId") projectId: string,
    @Body() updateDto: UpdateOfficialEstimationDto
  ) {
    return this.officialEstimationService.update(projectId, updateDto);
  }

  @Delete()
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async remove(@Param("projectId") projectId: string) {
    return this.officialEstimationService.remove(projectId);
  }
}

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
import { DetailedCostsService } from "../services/detailed-costs.service";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { USER_ROLES } from "src/constants/user.constant";
import {
  CreateDetailedCostDto,
  UpdateDetailedCostDto,
} from "../dto/detailed-costs.dto";

@Controller("projects/:projectId/detailed-costs")
@ApiTags("Project Detailed Costs")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class DetailedCostsController {
  constructor(private readonly detailedCostsService: DetailedCostsService) {}

  @Post()
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER, USER_ROLES.ENGINEER)
  async create(
    @Param("projectId") projectId: string,
    @Body() createDto: CreateDetailedCostDto
  ) {
    console.log('inside create controller of detailedcost')
    return this.detailedCostsService.create(projectId, createDto);
  }

  @Get()
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  async findAll(@Param("projectId") projectId: string) {
    return this.detailedCostsService.findAll(projectId);
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
    return this.detailedCostsService.findOne(projectId, id);
  }

  @Patch(":id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER, USER_ROLES.ENGINEER)
  async update(
    @Param("projectId") projectId: string,
    @Param("id") id: string,
    @Body() updateDto: UpdateDetailedCostDto
  ) {
    console.log('inside update controller of detailedcost ', updateDto)
    return this.detailedCostsService.update(projectId, id, updateDto);
  }

  @Delete(":id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async remove(@Param("projectId") projectId: string, @Param("id") id: string) {
    return this.detailedCostsService.remove(projectId, id);
  }
}

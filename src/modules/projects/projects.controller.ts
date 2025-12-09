import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ProjectsService } from "./projects.service";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles.decorator";
import { GetUser } from "src/decorator/user.decorator";
import { ApiBearerAuth, ApiTags, ApiQuery, ApiConsumes } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { USER_ROLES } from "src/constants/user.constant";
import {
  CreateProjectDto,
  UpdateProjectDto,
  UpdateProjectStatusDto,
  UpdateProjectFinancialStatusDto,
  ProjectQueryDto,
  UploadProjectImagesDto,
  AssignProjectRightsDto,
  RevokeProjectRightsDto,
} from "./dto/project.dto";
import {
  PROJECT_FINANCIAL_STATUS,
  PROJECT_STATUS,
} from "src/constants/project.constant";
import {
  CreateProjectTypeDto,
  UpdateProjectTypeDto,
} from "./dto/create-project-type.dto";
import { CreateWorkTypeDto, UpdateWorkTypeDto } from "./dto/create-work-type.dto";

@Controller("projects")
@ApiTags("Projects")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  @ApiQuery({
    name: "status",
    required: false,
    enum: PROJECT_STATUS,
  })
  @ApiQuery({
    name: "financialStatus",
    required: false,
    enum: PROJECT_FINANCIAL_STATUS,
  })
  @ApiQuery({ name: "clientId", required: false, type: String })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  async findAll(
    @Query() queryDto: ProjectQueryDto,
    @GetUser("id") userId: string,
    @GetUser("email") userEmail: string
  ) {
    return this.projectsService.findAll(queryDto, userId, userEmail);
  }

  @Get("getProjectById/:id")
  // @Roles(
  //   USER_ROLES.SUPER_ADMIN,
  //   USER_ROLES.MANAGER,
  //   USER_ROLES.ENGINEER,
  //   USER_ROLES.VIEWER
  // )
  async findOne(@Param("id") id: string) {
    return this.projectsService.findOne(id);
  }

  @Get("code/:projectCode")
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  async findByCode(@Param("projectCode") projectCode: string) {
    return this.projectsService.findByCode(projectCode);
  }

  @Patch(":id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async update(
    @Param("id") id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Patch(":id/status")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async updateStatus(
    @Param("id") id: string,
    @Body() updateStatusDto: UpdateProjectStatusDto
  ) {
    return this.projectsService.updateStatus(id, updateStatusDto);
  }

  @Patch(":id/financial-status")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async updateFinancialStatus(
    @Param("id") id: string,
    @Body() updateFinancialStatusDto: UpdateProjectFinancialStatusDto
  ) {
    return this.projectsService.updateFinancialStatus(
      id,
      updateFinancialStatusDto
    );
  }

  @Delete(":id")
  @Roles(USER_ROLES.SUPER_ADMIN)
  async remove(@Param("id") id: string) {

    return this.projectsService.remove(id);
  }

  @Post("import-excel")
  async importFromExcel(@Body() body: { projects: any[] }) {
    return this.projectsService.importProjectsWithEstimations(body.projects);
  }

  @Post(":id/upload-images")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  @UseInterceptors(FilesInterceptor("images", 10))
  @ApiConsumes("multipart/form-data")
  async uploadImages(
    @Param("id") id: string,
    @Body() uploadDto: UploadProjectImagesDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.projectsService.uploadImages(id, files, uploadDto.imageType);
  }

  @Delete(":id/images")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async deleteImage(
    @Param("id") id: string,
    @Body() body: { imageUrl: string; imageType: "before" | "after" }
  ) {
    return this.projectsService.deleteImage(id, body.imageUrl, body.imageType);
  }

  @Get("/project-all-types")
  // @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async getProjectTypes() {
    return this.projectsService.getProjectTypes();
  }

  @Post("/project-types")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async createProjectType(@Body() createProjectTypeDto: CreateProjectTypeDto) {
    return this.projectsService.createProjectType(createProjectTypeDto);
  }

  @Patch("project-types/:id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async updateProjectType(
    @Param("id") id: string,
    @Body() updateProjectTypeDto: UpdateProjectTypeDto
  ) {
    return this.projectsService.updateProjectType(id, updateProjectTypeDto);
  }

  @Delete("project-types/:id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async deleteProjectType(@Param("id") id: string) {
    return this.projectsService.deleteProjectType(id);
  }

  @Get("/work-all-types")
  // @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async getWorkTypes() {
    return this.projectsService.getWorkTypes();
  }

  @Post("/work-types")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async createWorkType(@Body() createProjectTypeDto: CreateWorkTypeDto) {
    return this.projectsService.createWorkType(createProjectTypeDto);
  }

  @Patch("work-types/:id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async updateWorkType(
    @Param("id") id: string,
    @Body() updateProjectTypeDto: UpdateWorkTypeDto
  ) {
    return this.projectsService.updateWorkType(id, updateProjectTypeDto);
  }

  @Delete("work-types/:id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async deleteWorkType(@Param("id") id: string) {
    return this.projectsService.deleteWorkType(id);
  }

  @Post(":id/assign-rights")
  @Roles(USER_ROLES.SUPER_ADMIN)
  async assignProjectRights(
    @Param("id") projectId: string,
    @Body() assignDto: AssignProjectRightsDto,
    @GetUser("email") userEmail: string
  ) {
    return this.projectsService.assignProjectRights(projectId, assignDto, userEmail);
  }

  @Post(":id/revoke-rights")
  @Roles(USER_ROLES.SUPER_ADMIN)
  async revokeProjectRights(
    @Param("id") projectId: string,
    @Body() revokeDto: RevokeProjectRightsDto,
    @GetUser("email") userEmail: string
  ) {
    return this.projectsService.revokeProjectRights(projectId, revokeDto, userEmail);
  }

  @Get(":id/allowed-users")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async getProjectAllowedUsers(@Param("id") projectId: string) {
    return this.projectsService.getProjectAllowedUsers(projectId);
  }

}

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
import { ReferenceProjectsService } from "./reference-projects.service";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles.decorator";
import { ApiBearerAuth, ApiTags, ApiQuery, ApiConsumes } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { USER_ROLES } from "src/constants/user.constant";
import {
  CreateReferenceProjectDto,
  UpdateReferenceProjectDto,
  ReferenceProjectQueryDto,
  UploadReferenceProjectImagesDto,
} from "./dto/reference-project.dto";

@Controller("reference-projects")
@ApiTags("Reference Projects")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReferenceProjectsController {
  constructor(
    private readonly referenceProjectsService: ReferenceProjectsService
  ) {}

  @Post()
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async create(@Body() createReferenceProjectDto: CreateReferenceProjectDto) {
    return this.referenceProjectsService.create(createReferenceProjectDto);
  }

  @Get()
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  @ApiQuery({ name: "clientId", required: false, type: String })
  @ApiQuery({ name: "categoryId", required: false, type: String })
  @ApiQuery({ name: "projectType", required: false, type: String })
  @ApiQuery({ name: "workType", required: false, type: String })
  @ApiQuery({ name: "machineType", required: false, type: String })
  @ApiQuery({ name: "useAsProjectTemplate", required: false, type: Boolean })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  async findAll(@Query() queryDto: ReferenceProjectQueryDto) {
    return this.referenceProjectsService.findAll(queryDto);
  }

  @Get("templates")
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  async findTemplates() {
    return this.referenceProjectsService.findTemplates();
  }

  @Get(":id")
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  async findOne(@Param("id") id: string) {
    return this.referenceProjectsService.findOne(id);
  }

  @Patch(":id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async update(
    @Param("id") id: string,
    @Body() updateReferenceProjectDto: UpdateReferenceProjectDto
  ) {
    return this.referenceProjectsService.update(id, updateReferenceProjectDto);
  }

  @Delete(":id")
  @Roles(USER_ROLES.SUPER_ADMIN)
  async remove(@Param("id") id: string) {
    return this.referenceProjectsService.remove(id);
  }

  @Post(":id/upload-images")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  @UseInterceptors(FilesInterceptor("images", 10))
  @ApiConsumes("multipart/form-data")
  async uploadImages(
    @Param("id") id: string,
    @Body() uploadDto: UploadReferenceProjectImagesDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.referenceProjectsService.uploadImages(
      id,
      files,
      uploadDto.imageType
    );
  }

  @Delete(":id/images")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async deleteImage(
    @Param("id") id: string,
    @Body() body: { imageUrl: string; imageType: "before" | "after" }
  ) {
    return this.referenceProjectsService.deleteImage(
      id,
      body.imageUrl,
      body.imageType
    );
  }
}

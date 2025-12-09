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
} from "@nestjs/common";
import { CatalogueService } from "./catalogue.service";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles.decorator";
import { ApiBearerAuth, ApiTags, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { USER_ROLES } from "src/constants/user.constant";
import {
  CreateCatalogueDto,
  UpdateCatalogueDto,
  CatalogueQueryDto,
} from "./dto/catalogue.dto";

@Controller("catalogue")
@ApiTags("Catalogue")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Post()
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async create(@Body() createCatalogueDto: CreateCatalogueDto) {
    return this.catalogueService.create(createCatalogueDto);
  }

  @Get()
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "categoryId", required: false, type: String })
  @ApiQuery({ name: "manufacturer", required: false, type: String })
  async findAll(@Query() queryDto: CatalogueQueryDto) {
    return this.catalogueService.findAll(queryDto);
  }

  @Get(":id")
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  async findOne(@Param("id") id: string) {
    return this.catalogueService.findOne(id);
  }

  @Patch(":id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async update(
    @Param("id") id: string,
    @Body() updateCatalogueDto: UpdateCatalogueDto
  ) {
    return this.catalogueService.update(id, updateCatalogueDto);
  }

  @Delete(":id")
  @Roles(USER_ROLES.SUPER_ADMIN)
  async remove(@Param("id") id: string) {
    return this.catalogueService.remove(id);
  }
}

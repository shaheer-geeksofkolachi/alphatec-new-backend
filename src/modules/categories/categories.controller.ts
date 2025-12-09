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
import { CategoriesService } from "./categories.service";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles.decorator";
import { ApiBearerAuth, ApiTags, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { USER_ROLES } from "src/constants/user.constant";
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryQueryDto,
} from "./dto/category.dto";

@Controller("categories")
@ApiTags("Categories")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
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
  async findAll(@Query() queryDto: CategoryQueryDto) {
    return this.categoriesService.findAll(queryDto);
  }

  @Get(":id")
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  async findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(":id")
  // @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  
  @Delete(":id")
  @Roles(USER_ROLES.SUPER_ADMIN)
  async remove(@Param("id") id: string) {
    return this.categoriesService.remove(id);
  }
}

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
import { ClientsService } from "./clients.service";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles.decorator";
import { ApiBearerAuth, ApiTags, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { USER_ROLES } from "src/constants/user.constant";
import {
  CreateClientDto,
  UpdateClientDto,
  ClientQueryDto,
} from "./dto/client.dto";

@Controller("clients")
@ApiTags("Clients")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  @ApiQuery({ name: "country", required: false, type: String })
  @ApiQuery({ name: "city", required: false, type: String })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  async findAll(@Query() queryDto: ClientQueryDto) {
    return this.clientsService.findAll(queryDto);
  }

  @Get(":id")
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  async findOne(@Param("id") id: string) {
    return this.clientsService.findOne(id);
  }

  @Get("cif/:cifNit")
  @Roles(
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.MANAGER,
    USER_ROLES.ENGINEER,
    USER_ROLES.VIEWER
  )
  async findByCifNit(@Param("cifNit") cifNit: string) {
    return this.clientsService.findByCifNit(cifNit);
  }

  @Patch(":id")
  @Roles(USER_ROLES.SUPER_ADMIN, USER_ROLES.MANAGER)
  async update(
    @Param("id") id: string,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(":id")
  @Roles(USER_ROLES.SUPER_ADMIN)
  async remove(@Param("id") id: string) {
    return this.clientsService.remove(id);
  }
}

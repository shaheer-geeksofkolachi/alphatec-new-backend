import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { Project, ProjectSchema } from "./projects.schema";
import { UserService } from "../user/user.service";
import { User, UserSchema } from "../user/user.schema";
import { MediaService } from "../media/media.service";
import { EmailService } from "../email/email.service";
import { ClientsService } from "../clients/clients.service";
import { Client, ClientSchema } from "../clients/clients.schema";
import { ProjectType, ProjectTypeSchema } from "./project-types.schema";

// New schemas
import {
  ProjectDimensions,
  ProjectDimensionsSchema,
} from "./schemas/project-dimensions.schema";
import {
  DetailedCosts,
  DetailedCostsSchema,
} from "./schemas/detailed-costs.schema";
import {
  EstimationVersions,
  EstimationVersionsSchema,
} from "./schemas/estimation-versions.schema";
import {
  OfficialEstimation,
  OfficialEstimationSchema,
} from "./schemas/official-estimation.schema";

// New services
import { ProjectDimensionsService } from "./services/project-dimensions.service";
import { DetailedCostsService } from "./services/detailed-costs.service";
import { EstimationVersionsService } from "./services/estimation-versions.service";
import { OfficialEstimationService } from "./services/official-estimation.service";

// New controllers
import { ProjectDimensionsController } from "./controllers/project-dimensions.controller";
import { DetailedCostsController } from "./controllers/detailed-costs.controller";
import { EstimationVersionsController } from "./controllers/estimation-versions.controller";
import { OfficialEstimationController } from "./controllers/official-estimation.controller";
import { WorkType, WorkTypeSchema } from "./work-types.schema";

const MODEL = [
  { name: User.name, schema: UserSchema },
  { name: Project.name, schema: ProjectSchema },
  { name: Client.name, schema: ClientSchema },
  { name: ProjectDimensions.name, schema: ProjectDimensionsSchema },
  { name: DetailedCosts.name, schema: DetailedCostsSchema },
  { name: EstimationVersions.name, schema: EstimationVersionsSchema },
  { name: OfficialEstimation.name, schema: OfficialEstimationSchema },
  { name: ProjectType.name, schema: ProjectTypeSchema },
  { name: WorkType.name, schema: WorkTypeSchema },

];

@Module({
  imports: [MongooseModule.forFeature(MODEL)],
  controllers: [
    ProjectsController,
    ProjectDimensionsController,
    DetailedCostsController,
    EstimationVersionsController,
    OfficialEstimationController,
  ],
  providers: [
    ProjectsService,
    UserService,
    MediaService,
    EmailService,
    ClientsService,
    ProjectDimensionsService,
    DetailedCostsService,
    EstimationVersionsService,
    OfficialEstimationService,
  ],
  exports: [
    ProjectsService,
    ProjectDimensionsService,
    DetailedCostsService,
    EstimationVersionsService,
    OfficialEstimationService,
  ],
})
export class ProjectsModule {}

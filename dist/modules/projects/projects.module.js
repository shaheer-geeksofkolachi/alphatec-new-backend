"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const projects_service_1 = require("./projects.service");
const projects_controller_1 = require("./projects.controller");
const projects_schema_1 = require("./projects.schema");
const user_service_1 = require("../user/user.service");
const user_schema_1 = require("../user/user.schema");
const media_service_1 = require("../media/media.service");
const email_service_1 = require("../email/email.service");
const clients_service_1 = require("../clients/clients.service");
const clients_schema_1 = require("../clients/clients.schema");
const project_types_schema_1 = require("./project-types.schema");
const project_dimensions_schema_1 = require("./schemas/project-dimensions.schema");
const detailed_costs_schema_1 = require("./schemas/detailed-costs.schema");
const estimation_versions_schema_1 = require("./schemas/estimation-versions.schema");
const official_estimation_schema_1 = require("./schemas/official-estimation.schema");
const project_dimensions_service_1 = require("./services/project-dimensions.service");
const detailed_costs_service_1 = require("./services/detailed-costs.service");
const estimation_versions_service_1 = require("./services/estimation-versions.service");
const official_estimation_service_1 = require("./services/official-estimation.service");
const project_dimensions_controller_1 = require("./controllers/project-dimensions.controller");
const detailed_costs_controller_1 = require("./controllers/detailed-costs.controller");
const estimation_versions_controller_1 = require("./controllers/estimation-versions.controller");
const official_estimation_controller_1 = require("./controllers/official-estimation.controller");
const work_types_schema_1 = require("./work-types.schema");
const MODEL = [
    { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
    { name: projects_schema_1.Project.name, schema: projects_schema_1.ProjectSchema },
    { name: clients_schema_1.Client.name, schema: clients_schema_1.ClientSchema },
    { name: project_dimensions_schema_1.ProjectDimensions.name, schema: project_dimensions_schema_1.ProjectDimensionsSchema },
    { name: detailed_costs_schema_1.DetailedCosts.name, schema: detailed_costs_schema_1.DetailedCostsSchema },
    { name: estimation_versions_schema_1.EstimationVersions.name, schema: estimation_versions_schema_1.EstimationVersionsSchema },
    { name: official_estimation_schema_1.OfficialEstimation.name, schema: official_estimation_schema_1.OfficialEstimationSchema },
    { name: project_types_schema_1.ProjectType.name, schema: project_types_schema_1.ProjectTypeSchema },
    { name: work_types_schema_1.WorkType.name, schema: work_types_schema_1.WorkTypeSchema },
];
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature(MODEL)],
        controllers: [
            projects_controller_1.ProjectsController,
            project_dimensions_controller_1.ProjectDimensionsController,
            detailed_costs_controller_1.DetailedCostsController,
            estimation_versions_controller_1.EstimationVersionsController,
            official_estimation_controller_1.OfficialEstimationController,
        ],
        providers: [
            projects_service_1.ProjectsService,
            user_service_1.UserService,
            media_service_1.MediaService,
            email_service_1.EmailService,
            clients_service_1.ClientsService,
            project_dimensions_service_1.ProjectDimensionsService,
            detailed_costs_service_1.DetailedCostsService,
            estimation_versions_service_1.EstimationVersionsService,
            official_estimation_service_1.OfficialEstimationService,
        ],
        exports: [
            projects_service_1.ProjectsService,
            project_dimensions_service_1.ProjectDimensionsService,
            detailed_costs_service_1.DetailedCostsService,
            estimation_versions_service_1.EstimationVersionsService,
            official_estimation_service_1.OfficialEstimationService,
        ],
    })
], ProjectsModule);
//# sourceMappingURL=projects.module.js.map
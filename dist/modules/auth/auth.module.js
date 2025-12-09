"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_service_1 = require("../user/user.service");
const media_service_1 = require("../media/media.service");
const config_constant_1 = require("../../constants/config.constant");
const user_schema_1 = require("../user/user.schema");
const jwt_strategy_1 = require("../../strategies/jwt.strategy");
const otp_service_1 = require("./otp.service");
const ses_email_service_1 = require("../email/ses-email.service");
const auth_service_1 = require("./auth.service");
const config_1 = require("@nestjs/config");
const email_module_1 = require("../email/email.module");
const otp_schema_1 = require("./otp.schema");
const auth_controller_1 = require("./auth.controller");
const MODEL = [
    { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
    { name: otp_schema_1.Otp.name, schema: otp_schema_1.OtpSchema },
];
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature(MODEL),
            email_module_1.EmailModule,
            jwt_1.JwtModule.registerAsync({
                global: true,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return {
                        secret: configService.get(config_constant_1.CONFIG.JWT_SECRET),
                    };
                },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            otp_service_1.OtpService,
            user_service_1.UserService,
            jwt_strategy_1.JwtStrategy,
            ses_email_service_1.SESMailService,
            media_service_1.MediaService,
        ],
        exports: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
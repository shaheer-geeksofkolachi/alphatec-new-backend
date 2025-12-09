"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const validationPipe_1 = require("./common/validationPipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    if (process.env.DEV_MODE !== "prod") {
        const config = new swagger_1.DocumentBuilder()
            .setTitle("Alphatech App")
            .setDescription("Alphatech app")
            .setVersion("1.0")
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup("api-docs", app, document, {
            swaggerOptions: {
                persistAuthorization: true,
                docExpansion: "none",
                tagsSorter: "alpha",
            },
        });
    }
    app.useGlobalPipes(new validationPipe_1.CustomValidationPipe({
        whitelist: true,
    }));
    await app.listen(process.env.PORT || 8080, () => {
        console.log(`Server is running on port ${process.env.PORT || 8080}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
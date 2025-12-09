import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "src/app.module";
import { CustomValidationPipe } from "src/common/validationPipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  if (process.env.DEV_MODE !== "prod") {
    const config = new DocumentBuilder()
      .setTitle("Alphatech App")
      .setDescription("Alphatech app")
      .setVersion("1.0")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api-docs", app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: "none",
        tagsSorter: "alpha",
      },
    });
  }

  app.useGlobalPipes(
    new CustomValidationPipe({
      whitelist: true,
    })
  );

  await app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
  });
}
bootstrap();

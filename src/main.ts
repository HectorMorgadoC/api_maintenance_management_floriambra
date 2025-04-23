/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: "*",
        methods: "GET,PATCH,POST,DELETE",
    });

    const logger = new Logger("bootstrap");

    app.setGlobalPrefix("/api");
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        }),
    );

    const config = new DocumentBuilder()
        .setTitle("maintenance management floriambra api")
        .setDescription("maintenance management endpoints")
        .setVersion("1.0")
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app,config);
    SwaggerModule.setup("api",app,documentFactory);
    
    await app.listen(process.env.PORT ?? 5001);
    
    logger.log("Server running port" + (process.env.PORT ?? 5000))
}
void bootstrap();

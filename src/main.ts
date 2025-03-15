/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("/api");
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        }),
    );
    await app.listen(process.env.PORT ?? 5001)
    console.log(`Server running port ${process.env.PORT}`)
}
void bootstrap();

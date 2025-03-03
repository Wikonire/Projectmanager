import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Filtert unbekannte Felder aus
    forbidNonWhitelisted: true, // Gibt Fehler bei unbekannten Feldern
    transform: true, // Automatische Typumwandlung anhand der DTOs
  }));


  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server läuft auf http://localhost:${port}`);
}

bootstrap();



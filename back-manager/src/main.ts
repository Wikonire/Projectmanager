import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {AppDataSource} from './data-source';
import {TestData} from './migrations/1741025756340-migrations';

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
  await AppDataSource.initialize()
      .then(async () => {
        console.log("Datenbankverbindung erfolgreich.");

        console.log("Schema zurücksetzen...");
        await AppDataSource.synchronize(true); // Löscht und erstellt Schema neu

        console.log("Migrationen ausführen...");
        await AppDataSource.runMigrations();

        console.log("Testdaten einfügen...");
        const migrationByStart = new TestData();
        await migrationByStart.up(AppDataSource.createQueryRunner())

        console.log("Datenbank ist bereit.");
      })
      .catch((error) => console.log("Fehler beim Start der Datenbank:", error));

  console.log("Server läuft auf http://localhost:3000");

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server läuft auf http://localhost:${port}`);
}

bootstrap();



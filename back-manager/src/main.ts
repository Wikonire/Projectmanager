import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Client} from 'pg';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 5432);


}


async function testDatabaseConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'SeraphinaPeckula1991$',
    database: 'DB_ProjectManager',

  });

  try {
    await client.connect();
    console.log('✅ Verbindung erfolgreich hergestellt!');
    const res = await client.query('SELECT NOW()');
    console.log('📅 Aktueller Zeitstempel der Datenbank:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Verbindungsfehler:', err.message);
  } finally {
    await client.end();
  }
}

testDatabaseConnection();

bootstrap();

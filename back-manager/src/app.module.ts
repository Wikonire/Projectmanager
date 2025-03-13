import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {ProjectModule} from './modules/project.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // Migrations nutzen, nicht automatisch synchronisieren
      dropSchema: true, // Falls die gesamte DB nicht bei jedem Start gelöscht werden soll auf false setzen
      logging: ["error"],
      entities: [__dirname + "/entities/*.entity{.ts,.js}"],
      migrations: [__dirname + "/migrations/*.ts"],
    }),
    ProjectModule,

  ],
})
export class AppModule {}

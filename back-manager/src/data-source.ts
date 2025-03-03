import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv";

dotenv.config({path: './.env'});


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false, // Migrations nutzen, nicht automatisch synchronisieren
    dropSchema: false, // Falls die gesamte DB nicht bei jedem Start gelöscht werden soll
    logging: ["query", "error"], // Debugging aktivieren
    entities: [__dirname + "/entities/*.entity{.ts,.js}"],
    migrations: [__dirname + "/migrations/*.ts"],
});

/*
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false, // Nutze besser Migrations
    logging: true,
    entities: [
    Project,
    ProjectStatus,
    ProjectPriority,
    ProjectPhase,
    Activity,
    Milestone,
    Document,
    User,
    Role,
    PhaseStatus,
    DocumentType,
    DocumentRelation,
    Employee,
    EmployeePmFunction,
    PmFunction,
    ActivityStatus,
],
    subscribers: [],
});*/




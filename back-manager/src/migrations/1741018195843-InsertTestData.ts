import { MigrationInterface, QueryRunner } from "typeorm";

    export class InsertTestDataProjectManager1700000000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("🚀 Seeding test data...");

        // Rollen hinzufügen
        await queryRunner.query(`
            INSERT INTO role (id, name) VALUES
            (uuid_generate_v4(), 'Admin'),
            (uuid_generate_v4(), 'User'),
            (uuid_generate_v4(), 'Developer'),
            (uuid_generate_v4(), 'Viewer'),
            (uuid_generate_v4(), 'Editor*in'),
            (uuid_generate_v4(), 'Cyberpunk Activist')
            ON CONFLICT (name) DO NOTHING;
        `);

        //Benutzer hinzufügen
        await queryRunner.query(`
            INSERT INTO pm_user (id, username, email, password, "createdAt") VALUES
            (uuid_generate_v4(), 'AdaLovelace42', 'ada@babbage.net', 'pass123', now()),
            (uuid_generate_v4(), 'NonBinarySkywalker', 'skywalker@jedi.space', 'force2024', now()),
            (uuid_generate_v4(), 'CaptainMarvelFan', 'carol@avengers.org', 'higherfurtherfaster', now()),
            (uuid_generate_v4(), 'XenonTheAI', 'xenon@future.ai', 'beepboop42', now()),
            (uuid_generate_v4(), 'CyberFeminist', 'hacker@cyberpunk.net', 'matrixHasYou', now()),
            (uuid_generate_v4(), 'Batwoman', 'kate.kane@gotham.com', 'lesbianVigilante', now()),
            (uuid_generate_v4(), 'GenderfluidTimeTraveler', 'fluid@timemachine.net', 'timeWarpNonBinary', now())
            ON CONFLICT (username) DO NOTHING;
        `);

        // Mitarbeitende hinzufügen
        await queryRunner.query(`
            INSERT INTO employee (id, last_name, first_name, created_at) VALUES
            (uuid_generate_v4(), 'Lovelace', 'Ada', now()),
            (uuid_generate_v4(), 'Skywalker', 'Mx. Jedi', now()),
            (uuid_generate_v4(), 'Marvel', 'Carol', now()),
            (uuid_generate_v4(), 'Turing', 'Alan', now()),
            (uuid_generate_v4(), 'Curie', 'Marie', now()),
            (uuid_generate_v4(), 'Kahlo', 'Frida', now())
            ON CONFLICT (last_name, first_name) DO NOTHING;
        `);

        // PM-Funktionen hinzufügen
        await queryRunner.query(`
            INSERT INTO pm_function (id, "pmFunctionName") VALUES
            (uuid_generate_v4(), 'Applikationsentwickler*in'),
            (uuid_generate_v4(), 'Architekt*in'),
            (uuid_generate_v4(), 'Projektleiter*in'),
            (uuid_generate_v4(), 'Cybersecurity Spezialist*in')
            ON CONFLICT ("pmFunctionName") DO NOTHING;
        `);

        // Projekt-Prioritäten hinzufügen
        await queryRunner.query(`
            INSERT INTO project_priority (id, name) VALUES
            (uuid_generate_v4(), 'Sehr hoch'),
            (uuid_generate_v4(), 'Hoch'),
            (uuid_generate_v4(), 'Mittel'),
            (uuid_generate_v4(), 'Tief')
            ON CONFLICT (name) DO NOTHING;
        `);

        // Projekt-Status hinzufügen
        await queryRunner.query(`
            INSERT INTO project_status (id, name) VALUES
            (uuid_generate_v4(), 'Gestoppt'),
            (uuid_generate_v4(), 'Geplant'),
            (uuid_generate_v4(), 'In Bearbeitung'),
            (uuid_generate_v4(), 'Gegen die Wand gefahren')
            ON CONFLICT (name) DO NOTHING;
        `);

        //  IDs für Prioritäten & Status abrufen
        const priorityId = await queryRunner.query(`SELECT id FROM project_priority ORDER BY name LIMIT 1;`);
        const statusId = await queryRunner.query(`SELECT id FROM project_status ORDER BY name LIMIT 1;`);

        // Projekte hinzufügen
        await queryRunner.query(`
            INSERT INTO project (id, title, description, methodology, progress, "projectReference", "createdAt", "priorityId", status_id)
            VALUES
            (uuid_generate_v4(), 'Ada Lovelace Coding Bootcamp', 'Empowering women in tech', 'Agile', 75.5, 'ALCB2024', now(), '${priorityId[0].id}', '${statusId[0].id}'),
            (uuid_generate_v4(), 'Star Wars Diversity Initiative', 'Inclusive casting for Star Wars productions', 'Scrum', 50.0, 'SWDI2025', now(), '${priorityId[0].id}', '${statusId[0].id}'),
            (uuid_generate_v4(), 'Queer AI Ethics Research', 'Building ethical AI models with inclusive datasets', 'Kanban', 90.0, 'QAIER2030', now(), '${priorityId[0].id}', '${statusId[0].id}'),
            (uuid_generate_v4(), 'Non-Binary Time Travel Research', 'A physics project about breaking gender and space-time norms', 'Lean', 100.0, 'NBTT2026', now(), '${priorityId[0].id}', '${statusId[0].id}'),
            (uuid_generate_v4(), 'Cyberfeminism & AI', 'Intersectional feminist perspectives on AI', 'Hybrid', 65.0, 'CFAI2027', now(), '${priorityId[0].id}', '${statusId[0].id}')
            ON CONFLICT ("projectReference") DO NOTHING;
        `);

        await queryRunner.query(`
INSERT INTO activity (id, phase_id, activity_status_id, title, estimation, progress, "plannedStartDate", "plannedEndDate", "actualStartDate", "actualEndDate")
VALUES 
(uuid_generate_v4(), (SELECT id FROM project_phase ORDER BY RANDOM() LIMIT 1), (SELECT id FROM activity_status WHERE name = 'Geplant' LIMIT 1), 'Brainstorming: Feministische KI-Modelle', 5, 10, '2025-03-10', '2025-03-15', NULL, NULL),
(uuid_generate_v4(), (SELECT id FROM project_phase ORDER BY RANDOM() LIMIT 1), (SELECT id FROM activity_status WHERE name = 'Geplant' LIMIT 1), 'Kickoff-Meeting: Star Wars Diversitätsoffensive', 3, 0, '2025-03-12', '2025-03-12', NULL, NULL),

(uuid_generate_v4(), (SELECT id FROM project_phase ORDER BY RANDOM() LIMIT 1), (SELECT id FROM activity_status WHERE name = 'In Bearbeitung' LIMIT 1), 'Erstellung eines inklusiven User-Storyboards', 7, 30, '2025-03-16', '2025-03-22', '2025-03-17', NULL),
(uuid_generate_v4(), (SELECT id FROM project_phase ORDER BY RANDOM() LIMIT 1), (SELECT id FROM activity_status WHERE name = 'In Bearbeitung' LIMIT 1), 'Erstellung von Gender-Neutral NLP-Trainingsdaten', 8, 25, '2025-03-18', '2025-03-25', '2025-03-19', NULL),

(uuid_generate_v4(), (SELECT id FROM project_phase ORDER BY RANDOM() LIMIT 1), (SELECT id FROM activity_status WHERE name = 'In Bearbeitung' LIMIT 1), 'Entwicklung des Bias-Detection-Algorithmus', 12, 50, '2025-03-26', '2025-04-10', '2025-03-27', NULL),
(uuid_generate_v4(), (SELECT id FROM project_phase ORDER BY RANDOM() LIMIT 1), (SELECT id FROM activity_status WHERE name = 'In Bearbeitung' LIMIT 1), 'Implementierung eines nicht-binären Avatar-Generators', 10, 40, '2025-03-29', '2025-04-12', '2025-03-30', NULL),


(uuid_generate_v4(), (SELECT id FROM project_phase ORDER BY RANDOM() LIMIT 1), (SELECT id FROM activity_status WHERE name = 'Geplant' LIMIT 1), 'Unit-Tests für gendergerechte Sprachmodelle', 6, 10, '2025-04-15', '2025-04-22', NULL, NULL),
(uuid_generate_v4(), (SELECT id FROM project_phase ORDER BY RANDOM() LIMIT 1), (SELECT id FROM activity_status WHERE name = 'Geplant' LIMIT 1), 'User-Tests: Reaktionen auf Cyberfeminismus in KI', 4, 5, '2025-04-18', '2025-04-25', NULL, NULL),

(uuid_generate_v4(), (SELECT id FROM project_phase ORDER BY RANDOM() LIMIT 1), (SELECT id FROM activity_status WHERE name = 'Geplant' LIMIT 1), 'Launch von Star Wars Diversity Feature', 5, 0, '2025-05-01', '2025-05-05', NULL, NULL),
(uuid_generate_v4(), (SELECT id FROM project_phase ORDER BY RANDOM() LIMIT 1), (SELECT id FROM activity_status WHERE name = 'Geplant' LIMIT 1), 'Vorstellung des inklusiven KI-Assistenten bei der AdaCon', 3, 0, '2025-05-06', '2025-05-07', NULL, NULL);

     `);

        console.log("Testdaten erfolgreich eingefügt!");
    }
    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);


        console.log("Testdaten wurden erfolgreich entfernt.");
    }
}

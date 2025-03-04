import { MigrationInterface, QueryRunner } from "typeorm";

export class TestData implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Seeding Testdaten...");

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

        // Benutzer hinzufügen
        await queryRunner.query(`
            INSERT INTO pm_user (id, username, email, password, "createdAt") VALUES
            (uuid_generate_v4(), 'AdaLovelace42', 'ada@babbage.net', 'pass123', now()),
            (uuid_generate_v4(), 'NonBinarySkywalker', 'skywalker@jedi.space', 'force2024', now()),
            (uuid_generate_v4(), 'CaptainMarvelFan', 'carol@avengers.org', 'higherfurtherfaster', now()),
            (uuid_generate_v4(), 'XenonTheAI', 'xenon@future.ai', 'beepboop42', now()),
            (uuid_generate_v4(), 'CyberFeminist', 'hacker@cyberpunk.net', 'matrixHasYou', now())
            ON CONFLICT (username) DO NOTHING;
        `);



        // Projekt-Status hinzufügen
        await queryRunner.query(`
            INSERT INTO project_status (id, name) VALUES
            (uuid_generate_v4(), 'Gestoppt'),
            (uuid_generate_v4(), 'Geplant'),
            (uuid_generate_v4(), 'In Bearbeitung'),
            (uuid_generate_v4(), 'Beendet')
            ON CONFLICT (name) DO NOTHING;
        `);

        // Projekte hinzufügen
        await queryRunner.query(`
            INSERT INTO project (id, title, description, methodology, progress, "projectReference", "createdAt", status_id)
            VALUES
            (uuid_generate_v4(), 'Ada Lovelace Coding Bootcamp', 'Empowering women in tech', 'Agile', 75.5, 'ALCB2024', now(), (SELECT id FROM project_status WHERE name = 'Geplant' LIMIT 1)),
            (uuid_generate_v4(), 'Queer AI Ethics Research', 'Building ethical AI models with inclusive datasets', 'Kanban', 90.0, 'QAIER2030', now(), (SELECT id FROM project_status WHERE name = 'In Bearbeitung' LIMIT 1))
            ON CONFLICT ("projectReference") DO NOTHING;
        `);

        // Phasen hinzufügen
        await queryRunner.query(`
            INSERT INTO project_phase (id, title, progress, "projectId", "phaseStatusId")
            VALUES
            (uuid_generate_v4(), 'Kickoff', 0, (SELECT id FROM project WHERE title = 'Ada Lovelace Coding Bootcamp' LIMIT 1), (SELECT id FROM phase_status WHERE name = 'Geplant' LIMIT 1)),
            (uuid_generate_v4(), 'Realisierung', 50, (SELECT id FROM project WHERE title = 'Queer AI Ethics Research' LIMIT 1), (SELECT id FROM phase_status WHERE name = 'In Bearbeitung' LIMIT 1))

        `);

        // Aktivitäten hinzufügen
        await queryRunner.query(`
            INSERT INTO activity (id, title, estimation, progress, phase_id, activity_status_id)
            VALUES
            (uuid_generate_v4(), 'Brainstorming: Feministische KI-Modelle', 5, 10, (SELECT id FROM project_phase WHERE title = 'Kickoff' LIMIT 1), (SELECT id FROM activity_status WHERE name = 'Geplant' LIMIT 1)),
            (uuid_generate_v4(), 'Implementierung von inklusiver KI', 8, 50, (SELECT id FROM project_phase WHERE title = 'Realisierung' LIMIT 1), (SELECT id FROM activity_status WHERE name = 'In Bearbeitung' LIMIT 1))
        `);

        // Dokument-Typen einfügen
        await queryRunner.query(`
            INSERT INTO document_type (id, name) VALUES
            (uuid_generate_v4(), 'Activity'),
            (uuid_generate_v4(), 'Project'),
            (uuid_generate_v4(), 'Phase')
            ON CONFLICT (name) DO NOTHING;
        `);

        // Dokumente einfügen
        await queryRunner.query(`
            INSERT INTO document (id, title, content, "createdAt") VALUES
            (uuid_generate_v4(), 'Queer AI Principles', 'Wie Künstliche Intelligenz inklusiver gestaltet werden kann.', now()),
            (uuid_generate_v4(), 'Cyberfeminismus 101', 'Eine Einführung in Cyberfeminismus und seine Bedeutung.', now())
        `);

        // Dokument-Relationen hinzufügen
        await queryRunner.query(`
            INSERT INTO document_relation (id, "relatedId", "documentId", "relatedTypeId")
            SELECT uuid_generate_v4(), p.id, d.id, dt.id
            FROM project_phase p, document d, document_type dt
            WHERE p.title = 'Kickoff' AND d.title = 'Queer AI Principles' AND dt.name = 'Phase'
            LIMIT 1;
        `);


        await queryRunner.query(`
        INSERT INTO pm_function (id, "pmFunctionName") VALUES
(uuid_generate_v4(), 'Applikationsentwickler*in'),
(uuid_generate_v4(), 'IT-Architekt*in'),
(uuid_generate_v4(), 'Projektleiter*in'),
(uuid_generate_v4(), 'UX-Designer*in'),
(uuid_generate_v4(), 'Cybersecurity Expert*in'),
(uuid_generate_v4(), 'Inklusive KI-Forscher*in'),
(uuid_generate_v4(), 'Agile Coach'),
(uuid_generate_v4(), 'Diversity & Inclusion Spezialist*in')
ON CONFLICT ("pmFunctionName") DO NOTHING;
`);
        await queryRunner.query(`
        INSERT INTO employee_pm_function (id, workload, "employeeId", "pmFunctionId")
SELECT uuid_generate_v4(), 80, 
       (SELECT id FROM employee WHERE last_name = 'Lovelace' LIMIT 1), 
       (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Softwareentwickler*in' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Lovelace')
AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'Softwareentwickler*in');

INSERT INTO employee_pm_function (id, workload, "employeeId", "pmFunctionId")
SELECT uuid_generate_v4(), 60, 
       (SELECT id FROM employee WHERE last_name = 'Skywalker' LIMIT 1), 
       (SELECT id FROM pm_function WHERE "pmFunctionName" = 'IT-Architekt*in' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Skywalker')
AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'IT-Architekt*in');

INSERT INTO employee_pm_function (id, workload, "employeeId", "pmFunctionId")
SELECT uuid_generate_v4(), 100, 
       (SELECT id FROM employee WHERE last_name = 'Marvel' LIMIT 1), 
       (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Projektleiter*in' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Marvel')
AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'Projektleiter*in');

INSERT INTO employee_pm_function (id, workload, "employeeId", "pmFunctionId")
SELECT uuid_generate_v4(), 50, 
       (SELECT id FROM employee WHERE last_name = 'Turing' LIMIT 1), 
       (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Cybersecurity Expert*in' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Turing')
AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'Cybersecurity Expert*in');

INSERT INTO employee_pm_function (id, workload, "employeeId", "pmFunctionId")
SELECT uuid_generate_v4(), 70, 
       (SELECT id FROM employee WHERE last_name = 'Curie' LIMIT 1), 
       (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Inklusive KI-Forscher*in' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Curie')
AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'Inklusive KI-Forscher*in');

INSERT INTO employee_pm_function (id, workload, "employeeId", "pmFunctionId")
SELECT uuid_generate_v4(), 90, 
       (SELECT id FROM employee WHERE last_name = 'Kahlo' LIMIT 1), 
       (SELECT id FROM pm_function WHERE "pmFunctionName" = 'UX-Designer*in' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Kahlo')
AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'UX-Designer*in');

INSERT INTO employee_pm_function (id, workload, "employeeId", "pmFunctionId")
SELECT uuid_generate_v4(), 100, 
       (SELECT id FROM employee WHERE last_name = 'Tesla' LIMIT 1), 
       (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Agile Coach' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Tesla')
AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'Agile Coach');

INSERT INTO employee_pm_function (id, workload, "employeeId", "pmFunctionId")
SELECT uuid_generate_v4(), 40, 
       (SELECT id FROM employee WHERE last_name = 'Bose' LIMIT 1), 
       (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Diversity & Inclusion Spezialist*in' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Bose')
AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'Diversity & Inclusion Spezialist*in');
`)

        await queryRunner.query(`
        INSERT INTO employee (id, last_name, first_name, created_at) VALUES
(uuid_generate_v4(), 'Lovelace', 'Ada', now()),
(uuid_generate_v4(), 'Skywalker', 'Mx. Jedi', now()),
(uuid_generate_v4(), 'Marvel', 'Carol', now()),
(uuid_generate_v4(), 'Turing', 'Alan', now()),
(uuid_generate_v4(), 'Curie', 'Marie', now()),
(uuid_generate_v4(), 'Kahlo', 'Frida', now())
        `)
        await queryRunner.query(`
        INSERT INTO employee_user (user_id, employee_id)
SELECT 
    (SELECT id FROM pm_user WHERE username = 'AdaLovelace42' LIMIT 1),
    (SELECT id FROM employee WHERE last_name = 'Lovelace' AND first_name = 'Ada' LIMIT 1)
UNION ALL
SELECT 
    (SELECT id FROM pm_user WHERE username = 'NonBinarySkywalker' LIMIT 1),
    (SELECT id FROM employee WHERE last_name = 'Skywalker' AND first_name = 'Mx. Jedi' LIMIT 1)
UNION ALL
SELECT 
    (SELECT id FROM pm_user WHERE username = 'CaptainMarvelFan' LIMIT 1),
    (SELECT id FROM employee WHERE last_name = 'Marvel' AND first_name = 'Carol' LIMIT 1)
UNION ALL
SELECT 
    (SELECT id FROM pm_user WHERE username = 'XenonTheAI' LIMIT 1),
    (SELECT id FROM employee WHERE last_name = 'Turing' AND first_name = 'Alan' LIMIT 1)
ON CONFLICT (user_id, employee_id) DO NOTHING;

        `)

        await queryRunner.query(`
        INSERT INTO external_cost_type (id, name) VALUES
(uuid_generate_v4(), 'Beratung'),
(uuid_generate_v4(), 'Software-Lizenzen'),
(uuid_generate_v4(), 'Hardware'),
(uuid_generate_v4(), 'Schulung'),
(uuid_generate_v4(), 'Sonstiges')
ON CONFLICT (name) DO NOTHING;
        `);

        await queryRunner.query(`
        INSERT INTO external_costs (id, "actualCosts", "costTypeId")
SELECT 
    uuid_generate_v4(), 15000.00, (SELECT id FROM external_cost_type WHERE name = 'Beratung' LIMIT 1)
UNION ALL
SELECT 
    uuid_generate_v4(), 2500.50, (SELECT id FROM external_cost_type WHERE name = 'Software-Lizenzen' LIMIT 1)
UNION ALL
SELECT 
    uuid_generate_v4(), 7800.75, (SELECT id FROM external_cost_type WHERE name = 'Hardware' LIMIT 1)
UNION ALL
SELECT 
    uuid_generate_v4(), 5000.00, (SELECT id FROM external_cost_type WHERE name = 'Schulung' LIMIT 1)
        `);

        await queryRunner.query(`
        INSERT INTO employee_pm_function (id, workload, "employeeId", "pmFunctionId")
SELECT 
    uuid_generate_v4(), 80.00, 
    (SELECT id FROM employee WHERE last_name = 'Lovelace' LIMIT 1), 
    (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Applikationsentwickler*in' LIMIT 1)
UNION ALL
SELECT 
    uuid_generate_v4(), 60.00, 
    (SELECT id FROM employee WHERE last_name = 'Marvel' LIMIT 1), 
    (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Projektleiter*in' LIMIT 1)
UNION ALL
SELECT 
    uuid_generate_v4(), 100.00, 
    (SELECT id FROM employee WHERE last_name = 'Turing' LIMIT 1), 
    (SELECT id FROM pm_function WHERE "pmFunctionName" = 'UX-Designer*in' LIMIT 1)
UNION ALL
SELECT 
    uuid_generate_v4(), 50.00, 
    (SELECT id FROM employee WHERE last_name = 'Curie' LIMIT 1), 
    (SELECT id FROM pm_function WHERE "pmFunctionName" = 'IT-Architekt*in' LIMIT 1)

`)

        console.log("Testdaten erfolgreich eingefügt!");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("Testdaten werden entfernt...");

        await queryRunner.query(`DELETE FROM document_relation;`);
        await queryRunner.query(`DELETE FROM document;`);
        await queryRunner.query(`DELETE FROM document_type;`);
        await queryRunner.query(`DELETE FROM activity;`);
        await queryRunner.query(`DELETE FROM project_phase;`);
        await queryRunner.query(`DELETE FROM project;`);
        await queryRunner.query(`DELETE FROM project_status;`);
        await queryRunner.query(`DELETE FROM pm_user;`);
        await queryRunner.query(`DELETE FROM role;`);
        await queryRunner.query(`DELETE FROM employee;`);




        console.log("Testdaten wurden erfolgreich entfernt.");
    }
}

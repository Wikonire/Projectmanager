import {MigrationInterface, QueryRunner} from "typeorm";

export class TestData implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Seeding Testdaten...");

        await queryRunner.query(`CREATE UNIQUE INDEX unique_lower_email ON "pm_user" (LOWER(email));`)
        await queryRunner.query(`
        -- Trigger-Funktion, die den progress-Wert in phase aktualisiert
CREATE OR REPLACE FUNCTION update_phase_progress()
RETURNS TRIGGER AS $$
BEGIN
    -- Aktualisiere den progress-Wert der zugehörigen Phase basierend auf dem Durchschnitt der Aktivitäten
    UPDATE project_phase
    SET progress = COALESCE((
        SELECT ROUND(AVG(progress))
        FROM activity
        WHERE phase_id = NEW.phase_id
    ), 0)  -- Falls keine Aktivitäten existieren, setze progress auf 0
    WHERE id = NEW.phase_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger auf der activity-Tabelle
CREATE TRIGGER trg_update_phase_progress
AFTER INSERT OR UPDATE OR DELETE
ON activity
FOR EACH ROW
EXECUTE FUNCTION update_phase_progress();
        `)
        await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS pgcrypto;
        `)
        // Rollen hinzufügen
        await queryRunner.query(`
            INSERT INTO role (name, description)
            VALUES ('Admin', 'Hat volle Kontrolle über das System. Kann Benutzer*innen verwalten, Einstellungen ändern und hat Zugriff auf alle Projekte und Daten.'),
                   ('User*in', 'Standardrolle für alle, die einen aktiven Account haben. Kann grundlegende Funktionen nutzen, aber keine administrativen Änderungen vornehmen.'),
                   ('Developer*in', 'Hat Zugriff auf Entwicklungs- und technische Funktionen. Kann Code, APIs und Systemintegration bearbeiten.'),
                   ('Viewer*in', 'Hat nur Leserechte. Kann Projekte und Dokumente ansehen, aber keine Änderungen vornehmen.'),
                   ('Editor*in', 'Kann Inhalte und Dokumente bearbeiten, aber keine System- oder Benutzerverwaltung durchführen.'),
                   ('Cyberpunk Activist*in', 'Hat spezielle erweiterte Rechte, um das System kritisch zu hinterfragen, zu debuggen oder ethische Richtlinien durchzusetzen.')
            ON CONFLICT (name) DO NOTHING;
        `);

        await queryRunner.query(`
            INSERT INTO phase_name (name)
            VALUES ('Kickoff & Kuchen'),
                   ('Research & Ranting'),
                   ('Prototyping & Patriarchy-Hacking'),
                   ('Coding & Care Work'),
                   ('Debugging & Deep Talks'),
                   ('Testing & Tea Time'),
                   ('Deployment & Tanz-Party'),
                   ('Maintenance & Memes'),
                   ('Celebration & Salary Negotiation')
            ON CONFLICT (name) DO NOTHING;
        `)


        await queryRunner.query(`
            INSERT INTO activity_status (name, description)
            VALUES ('Geplant', 'Die Aktivität ist erstellt und geplant, aber noch nicht gestartet.'),
                   ('In Bearbeitung', 'Die Aktivität ist gestartet und wird aktuell bearbeitet.'),
                   ('In Review', 'Die Aktivität wird überprüft und benötigt Feedback.'),
                   ('Abnahme ausstehend', 'Die Aktivität wartet auf Abnahme durch die verantwortliche Person.'),
                   ('Freigegeben', 'Die Aktivität wurde erfolgreich freigegeben.'),
                   ('In Warteschlange', 'Die Aktivität wurde erstellt, aber noch nicht begonnen.'),
                   ('Blockiert', 'Die Aktivität kann derzeit nicht weitergeführt werden.'),
                   ('Abgebrochen', 'Die Aktivität wurde gestoppt und nicht abgeschlossen.'),
                   ('Abgeschlossen', 'Die Aktivität wurde erfolgreich beendet.'),
                   ('Archiviert', 'Die Aktivität wurde gelöscht und archiviert.')
            ON CONFLICT (name) DO NOTHING;
        `)

        await queryRunner.query(`
            INSERT INTO project_status (name, description)
            VALUES ('Geplant', 'Das Projekt ist definiert, aber noch nicht gestartet'),
                   ('Gestartet', 'Das Projekt ist aktiv in Bearbeitung'),
                   ('Auf Eis gelegt', 'Das Projekt wurde vorübergehend pausiert'),
                   ('Archiviert', 'Das Projekt wurde abgeschlossen und archiviert'),
                   ('In Abnahme', 'Das Projekt ist in der finalen Prüfungs- oder Testphase'),
                   ('Abgeschlossen', 'Das Projekt wurde erfolgreich beendet'),
                   ('Archiviert', 'Das Projekt wurde gelöscht und archiviert')
            ON CONFLICT (name) DO NOTHING;
        `);
        await queryRunner.query(`INSERT INTO project_priority (name)
                                 VALUES ('Sehr Hoch'),
                                        ('Hoch'),
                                        ('Mittel'),
                                        ('Niedrig'),
                                        ('Optional');
        `)

        await queryRunner.query(`
            INSERT INTO methodology (name, description)
            VALUES ('HERMES',
                    'HERMES ist eine schweizerische Projektmanagementmethode, die in der Vergangenheit besonders in der öffentlichen Verwaltung eingesetzt wurde.'),
                   ('Wasserfall',
                    'Das Wasserfallmodell ist ein klassisches, sequenzielles Vorgehensmodell für Projekte. Es ist der allgemeine Standardwert für jedes Projekt, wenn keine Methodologie explizit angegeben wird.'),
                   ('PRINCE2',
                    'Projects in Controlled Environments 2 ist eine prozessorientierte Methode für effektives Projektmanagement, die in vielen Branchen verwendet wurde.'),
                   ('SAFe', 'Scaled Agile Framework ist ein Framework für agile Methoden in großen Organisationen.'),
                   ('PMI/PMBOK',
                    'PMBOK (Project Management Institute – Project Management Body of Knowledge) ist ein global anerkanntes Framework für professionelles Projektmanagement, herausgegeben vom Project Management Institute.'),
                   ('SDLC',
                    'SDLC (Software Development Life Cycle) beschreibt den gesamten Lebenszyklus der Softwareentwicklung von der Planung bis zur Wartung.'),
                   ('V-Modell XT',
                    'Das V-Modell XT ist ein Vorgehensmodell für Software- und Systementwicklung, das besonders in sicherheitskritischen Bereichen eingesetzt wird.'),
                   ('RUP',
                    'RUP (Rational Unified Process) ist ein iteratives Softwareentwicklungsmodell, das besonders für objektorientierte Softwareentwicklung genutzt wird.'),
                   ('IPMA',
                    'IPMA (International Project Management Association) ist ein international anerkanntes Zertifizierungsmodell für Projektmanagement.')
            ON CONFLICT(name) DO NOTHING;
        `);

        await queryRunner.query(` WITH phase_ids AS (SELECT id, name
                                                     FROM phase_name),
                                       status_ids AS (SELECT id, name FROM activity_status)
                                  INSERT
                                  INTO activity(title, progress, estimation, "plannedStartDate", "plannedEndDate",
                                                "actualStartDate",
                                                "actualEndDate", phase_id, activity_status_id)
                                  VALUES ('Projekt-Briefing erstellen', 0, 4, NOW(), NOW() + INTERVAL '2 days', NULL,
                                          NULL,
                                          (SELECT id FROM project_phase ORDER BY random() LIMIT 1),
                                          (SELECT id FROM status_ids WHERE name = 'Geplant')),

                                         ('Stakeholder-Interviews führen', 10, 6, NOW(), NOW() + INTERVAL '3 days',
                                          NULL, NULL,
                                          (SELECT id FROM project_phase ORDER BY random() LIMIT 1),
                                          (SELECT id FROM status_ids WHERE name = 'In Bearbeitung')),

                                         ('Erste Wireframes erstellen', 20, 8, NOW(), NOW() + INTERVAL '5 days', NULL,
                                          NULL,
                                          (SELECT id FROM project_phase ORDER BY random() LIMIT 1),
                                          (SELECT id FROM status_ids WHERE name = 'In Bearbeitung')),

                                         ('Backend-API entwickeln', 40, 14, NOW(), NOW() + INTERVAL '10 days', NULL,
                                          NULL,
                                          (SELECT id FROM project_phase ORDER BY random() LIMIT 1),
                                          (SELECT id FROM status_ids WHERE name = 'In Bearbeitung')),

                                         ('Frontend-Komponenten implementieren', 60, 12, NOW(),
                                          NOW() + INTERVAL '7 days', NULL, NULL,
                                          (SELECT id FROM project_phase ORDER BY random() LIMIT 1),
                                          (SELECT id FROM status_ids WHERE name = 'In Bearbeitung')),

                                         ('Unit-Tests für API schreiben', 75, 5, NOW(), NOW() + INTERVAL '4 days', NULL,
                                          NULL,
                                          (SELECT id FROM project_phase ORDER BY random() LIMIT 1),
                                          (SELECT id FROM status_ids WHERE name = 'In Review')),

                                         ('Integrationstests durchführen', 90, 6, NOW(), NOW() + INTERVAL '3 days',
                                          NULL, NULL,
                                          (SELECT id FROM project_phase ORDER BY random() LIMIT 1),
                                          (SELECT id FROM status_ids WHERE name = 'Abnahme ausstehend')),

                                         ('Live Deployment vorbereiten', 95, 3, NOW(), NOW() + INTERVAL '2 days', NULL,
                                          NULL,
                                          (SELECT id FROM project_phase ORDER BY random() LIMIT 1),
                                          (SELECT id FROM status_ids WHERE name = 'Freigegeben')),

                                         ('Produkt-Dokumentation finalisieren', 100, 4, NOW(),
                                          NOW() + INTERVAL '2 days', NULL, NULL,
                                          (SELECT id FROM project_phase ORDER BY random() LIMIT 1),
                                          (SELECT id FROM status_ids WHERE name = 'Abgeschlossen')),

                                         ('Projekt-Review & Lessons Learned', 100, 3, NOW(), NOW() + INTERVAL '1 day',
                                          NULL, NULL,
                                          (SELECT id FROM project_phase ORDER BY random() LIMIT 1),
                                          (SELECT id FROM status_ids WHERE name = 'Abgeschlossen'));`)

        await queryRunner.query(`
            INSERT
            INTO pm_function("pmFunctionName")
            VALUES ('Applikationsentwickler*in'),
                   ('IT-Architekt*in'),
                   ('Projektleiter*in'),
                   ('UX-Designer*in'),
                   ('Cybersecurity Expert*in'),
                   ('Inklusive KI-Forscher*in'),
                   ('Agile Coach'),
                   ('Diversity & Inclusion Spezialist*in')
            ON CONFLICT("pmFunctionName")
                DO
                NOTHING;
        `);

        await queryRunner.query(`

            INSERT INTO employee_pm_function(workload, "employeeId", "pmFunctionId")
            SELECT 20,
                   (SELECT id FROM employee WHERE last_name = 'Lovelace' LIMIT 1),
                   (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Softwareentwickler*in' LIMIT 1)
            WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Lovelace')
              AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'Softwareentwickler*in');

            INSERT INTO employee_pm_function(workload, "employeeId", "pmFunctionId")
            SELECT 60,
                   (SELECT id FROM employee WHERE last_name = 'Skywalker' LIMIT 1),
                   (SELECT id FROM pm_function WHERE "pmFunctionName" = 'IT-Architekt*in' LIMIT 1)
            WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Skywalker')
              AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'IT-Architekt*in');

            INSERT INTO employee_pm_function(workload, "employeeId", "pmFunctionId")
            SELECT 100,
                   (SELECT id FROM employee WHERE last_name = 'Marvel' LIMIT 1),
                   (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Projektleiter*in' LIMIT 1)
            WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Marvel')
              AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'Projektleiter*in');

            INSERT INTO employee_pm_function(workload, "employeeId", "pmFunctionId")
            SELECT 50,
                   (SELECT id FROM employee WHERE last_name = 'Turing' LIMIT 1),
                   (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Cybersecurity Expert*in' LIMIT 1)
            WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Turing')
              AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'Cybersecurity Expert*in');

            INSERT INTO employee_pm_function(workload, "employeeId", "pmFunctionId")
            SELECT 70,
                   (SELECT id FROM employee WHERE last_name = 'Curie' LIMIT 1),
                   (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Inklusive KI-Forscher*in' LIMIT 1)
            WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Curie')
              AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'Inklusive KI-Forscher*in');

            INSERT INTO employee_pm_function(workload, "employeeId", "pmFunctionId")
            SELECT 90,
                   (SELECT id FROM employee WHERE last_name = 'Kahlo' LIMIT 1),
                   (SELECT id FROM pm_function WHERE "pmFunctionName" = 'UX-Designer*in' LIMIT 1)
            WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Kahlo')
              AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'UX-Designer*in');

            INSERT INTO employee_pm_function(workload, "employeeId", "pmFunctionId")
            SELECT 100,
                   (SELECT id FROM employee WHERE last_name = 'Tesla' LIMIT 1),
                   (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Agile Coach' LIMIT 1)
            WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Tesla')
              AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'Agile Coach');

            INSERT INTO employee_pm_function(workload, "employeeId", "pmFunctionId")
            SELECT 40,
                   (SELECT id FROM employee WHERE last_name = 'Bose' LIMIT 1),
                   (SELECT id FROM pm_function WHERE "pmFunctionName" = 'Diversity & Inclusion Spezialist*in' LIMIT 1)
            WHERE EXISTS (SELECT 1 FROM employee WHERE last_name = 'Bose')
              AND EXISTS (SELECT 1 FROM pm_function WHERE "pmFunctionName" = 'Diversity & Inclusion Spezialist*in');

        `)
        await queryRunner.query(`
            INSERT
            INTO employee(last_name, first_name, created_at)
            VALUES ('Lovelace', 'Ada', now()),
                   ('Skywalker', 'Mx. Jedi', now()),
                   ('Marvel', 'Carol', now()),
                   ('Turing', 'Alan', now()),
                   ('Curie', 'Marie', now()),
                   ('Kahlo', 'Frida', now())
        `)


        await queryRunner.query(`
            INSERT
            INTO external_cost_type(name)
            VALUES ('Beratung'),
                   ('Software-Lizenzen'),
                   ('Hardware'),
                   ('Schulung'),
                   ('Sonstiges')
            ON CONFLICT(name)
                DO
                NOTHING;
        `);

        await  queryRunner.query(`
           INSERT INTO pm_user (username, email, password, "createdAt")
            VALUES ('alovelace', 'ada@example.com', crypt('ada123!', gen_salt('bf')), NOW()),
                   ('skywalker', 'jedi@example.com', crypt('UseTheForce!', gen_salt('bf')), NOW()),
                   ('cmarvel', 'carol@example.com', crypt('HigherFurtherFaster!', gen_salt('bf')), NOW()),
                   ('aturing', 'alan@example.com', crypt('TuringComplete!', gen_salt('bf')), NOW()),
                   ('mcurie', 'marie@example.com', crypt('RadiationRocks!', gen_salt('bf')), NOW()),
                   ('fkahlo', 'frida@example.com', crypt('VivaLaVida!', gen_salt('bf')), NOW())
            ON CONFLICT (email) DO NOTHING;
        `)
        await queryRunner.query(`
            INSERT INTO user_role (user_id, role_id)
            SELECT
                u.id, r.id
            FROM
                (VALUES
                     ('alovelace', 'Cyberpunk Activist*in'),
                     ('alovelace', 'User*in'),
                     ('alovelace', 'Admin'),
                     ('aturing', 'Admin'),
                     ('aturing', 'Editor*in'),
                     ('mcurie', 'Admin'),
                     ('fkahlo', 'Admin'),
                     ('fkahlo', 'Viewer*in'),
                     ('skywalker', 'Admin'),
                     ('skywalker', 'User*in')
                ) AS ur (username, role_name)
                    JOIN pm_user u ON u.username = ur.username
                    JOIN role r ON r.name = ur.role_name
            ON CONFLICT (user_id, role_id) DO NOTHING;

        `);

        await queryRunner.query(`
            INSERT
            INTO external_costs("actualCosts", "costTypeId")
            SELECT 15000.00,
                   (SELECT id
                    FROM external_cost_type
                    WHERE name = 'Beratung'
                    LIMIT 1)
            UNION
                ALL
            SELECT 2500.50,
                   (SELECT id
                    FROM external_cost_type
                    WHERE name = 'Software-Lizenzen'
                    LIMIT 1)
            UNION
                ALL
            SELECT 7800.75,
                   (SELECT id
                    FROM external_cost_type
                    WHERE name = 'Hardware'
                    LIMIT 1)
            UNION
                ALL
            SELECT 5000.00,
                   (SELECT id
                    FROM external_cost_type
                    WHERE name = 'Schulung'
                    LIMIT 1)
        `);

        await queryRunner.query(`
            INSERT
            INTO employee_pm_function(workload, "employeeId", "pmFunctionId")
            SELECT 80.00,
                   (SELECT id
                    FROM employee
                    WHERE last_name = 'Lovelace'
                    LIMIT 1),
                   (SELECT id
                    FROM pm_function
                    WHERE "pmFunctionName" = 'Applikationsentwickler*in'
                    LIMIT 1)
            UNION
                ALL
            SELECT 60.00,
                   (SELECT id
                    FROM employee
                    WHERE last_name = 'Marvel'
                    LIMIT 1),
                   (SELECT id
                    FROM pm_function
                    WHERE "pmFunctionName" = 'Projektleiter*in'
                    LIMIT 1)
            UNION
                ALL
            SELECT 100.00,
                   (SELECT id
                    FROM employee
                    WHERE last_name = 'Turing'
                    LIMIT 1),
                   (SELECT id
                    FROM pm_function
                    WHERE "pmFunctionName" = 'UX-Designer*in'
                    LIMIT 1)
            UNION
                ALL
            SELECT 50.00,
                   (SELECT id
                    FROM employee
                    WHERE last_name = 'Curie'
                    LIMIT 1),
                   (SELECT id
                    FROM pm_function
                    WHERE "pmFunctionName" = 'IT-Architekt*in'
                    LIMIT 1)`)

        await queryRunner.query(`
            INSERT INTO employee_user (user_id, employee_id)
            VALUES ((SELECT id FROM pm_user ORDER BY random() LIMIT 1),
                    (SELECT id FROM employee WHERE last_name = 'Lovelace' LIMIT 1)),
                   ((SELECT id FROM pm_user ORDER BY random() LIMIT 1),
                    (SELECT id FROM employee WHERE last_name = 'Skywalker' LIMIT 1)),
                   ((SELECT id FROM pm_user ORDER BY random() LIMIT 1),
                    (SELECT id FROM employee WHERE last_name = 'Marvel' LIMIT 1)),
                   ((SELECT id FROM pm_user ORDER BY random() LIMIT 1),
                    (SELECT id FROM employee WHERE last_name = 'Turing' LIMIT 1)),
                   ((SELECT id FROM pm_user ORDER BY random() LIMIT 1),
                    (SELECT id FROM employee WHERE last_name = 'Curie' LIMIT 1)),
                   ((SELECT id FROM pm_user ORDER BY random() LIMIT 1),
                    (SELECT id FROM employee WHERE last_name = 'Kahlo' LIMIT 1));

        `);

        await queryRunner.query(`

            INSERT INTO project (title, description, "approvalDate", "approvalSignature", progress,
                                 "plannedStartDate", "plannedEndDate", "actualStartDate", "actualEndDate", "createdAt",
                                 priority_id, status_id, methodology_id)
            VALUES ('Barrierefreie Webplattform',
                    'Entwicklung einer zugänglichen Plattform zur Projektverwaltung für alle Nutzer*innen.',
                    '2024-02-10', 'Projektleitung', 15.00,
                    '2024-02-15', '2024-07-01', '2024-03-01', NULL, NOW(),
                    (SELECT id FROM project_priority WHERE public.project_priority.name LIKE 'Sehr Hoch%' LIMIT 1),
                    (SELECT id FROM project_status WHERE project_status.name LIKE 'Geplant' LIMIT 1),
                    (SELECT id
                     FROM methodology
                     WHERE name = 'IPMA'
                     LIMIT 1)),

                   ('Automatisierte Barrierefreiheits-Tests',
                    'Integration von Accessibility-Tests in CI/CD-Pipelines zur frühzeitigen Erkennung von Problemen.',
                    '2024-03-05', 'QA-Team', 25.00,
                    '2024-03-10', '2024-10-01', '2024-04-01', NULL, NOW(),
                    (SELECT id FROM project_priority ORDER BY random() LIMIT 1),
                    (SELECT id FROM project_status ORDER BY random() LIMIT 1),
                    (SELECT id FROM methodology ORDER BY random() LIMIT 1)),

                   ('KI-gestützte Accessibility',
                    'Entwicklung eines KI-Systems zur automatisierten Analyse von Barrierefreiheits-Standards.',
                    '2024-01-15', 'Forschungsteam', 40.00,
                    '2024-01-20', '2024-09-15', '2024-02-10', NULL, NOW(),
                    (SELECT id FROM project_priority ORDER BY random() LIMIT 1),
                    (SELECT id FROM project_status ORDER BY random() LIMIT 1),
                    (SELECT id FROM methodology ORDER BY random() LIMIT 1)),

                   ('Digitale Inklusion für Behörden',
                    'Entwicklung einer digitalen Infrastruktur für barrierefreie Verwaltungsservices.',
                    '2024-04-01', 'Ministerium für Digitalisierung', 5.00,
                    '2024-04-15', '2024-12-20', NULL, NULL, NOW(),
                    (SELECT id FROM project_priority ORDER BY random() LIMIT 1),
                    (SELECT id FROM project_status ORDER BY random() LIMIT 1),
                    (SELECT id FROM methodology ORDER BY random() LIMIT 1)),

                   ('Feministische IT-Konzepte',
                    'Ein Framework für gendergerechte und inklusive IT-Strukturen in Unternehmen.',
                    '2024-02-20', 'Diversity-Team', 50.00,
                    '2024-03-01', '2024-11-30', '2024-04-05', '2024-07-01', NOW(),
                    (SELECT id FROM project_priority ORDER BY random() LIMIT 1),
                    (SELECT id FROM project_status ORDER BY random() LIMIT 1),
                    (SELECT id FROM methodology ORDER BY random() LIMIT 1)),

                   ('Nachhaltige IT-Architekturen',
                    'Reduktion des CO₂-Fußabdrucks durch nachhaltige IT-Entwicklung und Green Computing.',
                    '2024-05-10', 'Nachhaltigkeits-Team', 10.00,
                    '2024-05-15', '2025-02-01', NULL, NULL, NOW(),
                    (SELECT id FROM project_priority ORDER BY random() LIMIT 1),
                    (SELECT id FROM project_status ORDER BY random() LIMIT 1),
                    (SELECT id FROM methodology ORDER BY random() LIMIT 1)),

                   ('Inklusive KI-Modelle',
                    'Erforschung und Entwicklung von KI-Systemen mit Fokus auf barrierefreie Nutzung.',
                    '2024-06-01', 'Forschungslabor', 0.00,
                    '2024-06-10', '2025-06-30', NULL, NULL, NOW(),
                    (SELECT id FROM project_priority ORDER BY random() LIMIT 1),
                    (SELECT id FROM project_status ORDER BY random() LIMIT 1),
                    (SELECT id FROM methodology ORDER BY random() LIMIT 1)),

                   ('Cybersecurity & feministische IT',
                    'Entwicklung von Datenschutz- und Sicherheitskonzepten mit intersektionalem Ansatz.',
                    '2024-02-05', 'Security-Team', 75.00,
                    '2024-02-15', '2024-08-10', '2024-03-10', NULL, NOW(),
                    (SELECT id FROM project_priority ORDER BY random() LIMIT 1),
                    (SELECT id FROM project_status ORDER BY random() LIMIT 1),
                    (SELECT id FROM methodology ORDER BY random() LIMIT 1)),

                   ('Open-Source Plattform für Inklusion',
                    'Eine Plattform zur Förderung von barrierefreien Open-Source-Projekten.',
                    '2024-01-10', 'Community-Team', 95.00,
                    '2024-01-20', '2024-07-01', '2024-02-01', '2024-06-15', NOW(),
                    (SELECT id FROM project_priority ORDER BY random() LIMIT 1),
                    (SELECT id FROM project_status ORDER BY random() LIMIT 1),
                    (SELECT id FROM methodology ORDER BY random() LIMIT 1)),

                   ('Agiles Barrierefreiheitsmanagement',
                    'Integration agiler Methoden zur nachhaltigen Barrierefreiheit in der IT.',
                    '2024-05-01', 'Projektleitung', 10.00,
                    '2024-06-10', '2025-02-20', NULL, NULL, NOW(),
                    (SELECT id FROM project_priority ORDER BY random() LIMIT 1),
                    (SELECT id FROM project_status ORDER BY random() LIMIT 1),
                    (SELECT id FROM methodology ORDER BY random() LIMIT 1));

        `)
        await queryRunner.query(`
            INSERT INTO phase_status (name)
            VALUES ('Geplant'),
                   ('Gestartet'),
                   ('In Bearbeitung'),
                   ('In Review'),
                   ('Freigabe ausstehend'),
                   ('Freigegeben'),
                   ('Abgeschlossen'),
                   ('Auf Eis gelegt'),
                   ('Abgebrochen'),
                   ('Archiviert')
            ON CONFLICT (name) DO NOTHING;


            INSERT INTO project_phase ("nameId", progress, "plannedStartDate", "plannedEndDate", "actualStartDate",
                                       "actualEndDate", "projectId", "phaseStatusId")
            VALUES ((SELECT id FROM phase_name WHERE name = 'Kickoff & Kuchen' LIMIT 1),
                    0, NOW(), NOW() + INTERVAL '10 days', NULL, NULL,
                    (SELECT id FROM project ORDER BY random() LIMIT 1),
                    (SELECT id FROM phase_status WHERE name = 'Geplant' LIMIT 1)),

                   ((SELECT id FROM phase_name WHERE name = 'Research & Ranting' LIMIT 1),
                    10, NOW(), NOW() + INTERVAL '15 days', NULL, NULL,
                    (SELECT id FROM project ORDER BY random() LIMIT 1),
                    (SELECT id FROM phase_status WHERE name = 'Gestartet' LIMIT 1)),

                   ((SELECT id FROM phase_name WHERE name = 'Prototyping & Patriarchy-Hacking' LIMIT 1),
                    20, NOW(), NOW() + INTERVAL '20 days', NULL, NULL,
                    (SELECT id FROM project ORDER BY random() LIMIT 1),
                    (SELECT id FROM phase_status WHERE name = 'In Bearbeitung' LIMIT 1)),

                   ((SELECT id FROM phase_name WHERE name = 'Coding & Care Work' LIMIT 1),
                    40, NOW(), NOW() + INTERVAL '30 days', NULL, NULL,
                    (SELECT id FROM project ORDER BY random() LIMIT 1),
                    (SELECT id FROM phase_status WHERE name = 'In Bearbeitung' LIMIT 1)),

                   ((SELECT id FROM phase_name WHERE name = 'Debugging & Deep Talks' LIMIT 1),
                    60, NOW(), NOW() + INTERVAL '25 days', NULL, NULL,
                    (SELECT id FROM project ORDER BY random() LIMIT 1),
                    (SELECT id FROM phase_status WHERE name = 'In Review' LIMIT 1)),

                   ((SELECT id FROM phase_name WHERE name = 'Testing & Tea Time' LIMIT 1),
                    75, NOW(), NOW() + INTERVAL '10 days', NULL, NULL,
                    (SELECT id FROM project ORDER BY random() LIMIT 1),
                    (SELECT id FROM phase_status WHERE name = 'Freigabe ausstehend' LIMIT 1)),

                   ((SELECT id FROM phase_name WHERE name = 'Deployment & Dance Party' LIMIT 1),
                    90, NOW(), NOW() + INTERVAL '7 days', NULL, NULL,
                    (SELECT id FROM project ORDER BY random() LIMIT 1),
                    (SELECT id FROM phase_status WHERE name = 'Freigegeben' LIMIT 1)),

                   ((SELECT id FROM phase_name WHERE name = 'Maintenance & Memes' LIMIT 1),
                    95, NOW(), NOW() + INTERVAL '20 days', NULL, NULL,
                    (SELECT id FROM project ORDER BY random() LIMIT 1),
                    (SELECT id FROM phase_status WHERE name = 'Abgeschlossen' LIMIT 1)),

                   ((SELECT id FROM phase_name WHERE name = 'Celebration & Salary Negotiation' LIMIT 1),
                    100, NOW(), NOW() + INTERVAL '5 days', NULL, NULL,
                    (SELECT id FROM project ORDER BY random() LIMIT 1),
                    (SELECT id FROM phase_status WHERE name = 'Archiviert' LIMIT 1));

        `)

        await queryRunner.query(`
            WITH phase_ids AS (SELECT id,
                                      name
                               FROM phase_name),
                 status_ids AS (SELECT id,
                                       name
                                FROM activity_status),
                 methodology_ids AS (SELECT id,
                                            name
                                     From methodology),
                 project_ids AS (SELECT id, title, methodology_id, status_id FROM project)
            INSERT
            INTO document (title, content, "createdAt", "projectId", "phaseId", "activityId")
            VALUES ('Technische Spezifikation',
                    '**1. Einführung**
                    \nDieses Dokument beschreibt die technischen Anforderungen und Architekturentscheidungen des Systems.
                    \n
                    **2. Systemübersicht**
                    \nDas System besteht aus einer Microservices-Architektur mit einer PostgreSQL-Datenbank, einer Node.js-Backend-API und einem Angular-Frontend.
                    \n
                    **3. Datenmodell**
                    \nDie Kernentitäten sind User, Projects und Tasks. Details zu den Tabellenstrukturen sind in Kapitel 4 beschrieben.
                    \n
                    **4. API-Spezifikation** 
                    \n* POST /users - Erstellt einen neuen Benutzer
                    \n* GET /projects - Listet alle Projekte auf
                    \n* PATCH /tasks/:id - Aktualisiert den Status einer Aufgabe
                    \n
                    **5. Skalierbarkeit und Performance**
                    \nDas System verwendet Load Balancing über Nginx und Caching mit Redis.', NOW(),
                    (SELECT id
                     FROM project_ids
                     WHERE methodology_id = (SELECT id FROM methodology_ids WHERE name LIKE 'IPMA%')
                     LIMIT 1), NULL, NULL),
                   ('IPMA-Projektmanagement-Plan',
                    '### 1. Projektübersicht  
\nDieses Dokument beschreibt die Planung eines Projekts, das nach der IPMA-Methodik verwaltet wird.  
\n
\n**Projektziel:**  
\nEntwicklung eines barrierefreien Dokumentationssystems für öffentliche Verwaltungen.  
\n
\n### 2. Projektstruktur  
\nNach der IPMA-Methodik wird das Projekt in verschiedene Phasen unterteilt:  
\n- Initialisierung: Bedarfsanalyse, Stakeholder-Identifikation  
\n- Planung: Projektstrukturplan (PSP), Termin- und Ressourcenplanung  
\n- Durchführung: Entwicklung, Tests, Qualitätssicherung  
\n- Abschluss: Übergabe, Evaluation, Lessons Learned  
\n
\n### 3. Rollen und Verantwortlichkeiten  
\n- Projektleitung: Koordination und Überwachung des Projektfortschritts  
\n- Entwicklungsteam: Implementierung der Software-Lösung  
\n- Qualitätssicherung: Testdurchführung und Einhaltung von Standards  
\n- Stakeholder: Öffentliche Verwaltungen, IT-Abteilungen, Nutzer*innen  
\n
\n### 4. Risiken und Maßnahmen  
\n**Potenzielle Risiken:**  
\n- Verzögerungen bei der Anforderungsanalyse  
\n- Engpässe bei der Ressourcenverfügbarkeit  
\n- Technische Herausforderungen bei der Implementierung der Barrierefreiheitsstandards  
\n
\n**Gegenmaßnahmen:**  
\n- Regelmäßige Review-Meetings zur frühzeitigen Problemidentifikation  
\n- Pufferzeiten in der Projektplanung berücksichtigen  
\n- Enge Zusammenarbeit mit Accessibility-Expert*innen  
\n
\n### 5. Qualitätsmanagement  
\n- Anwendung von IPMA-Standards zur Qualitätssicherung  
\n- Dokumentation aller relevanten Entscheidungen und Fortschritte  
\n- Durchführung regelmäßiger Risikobewertungen',
                    NOW(),
                    (SELECT id
                     FROM project
                     WHERE methodology_id = (SELECT id
                                             FROM methodology
                                             WHERE name = 'IPMA')
                     ORDER BY random()
                     LIMIT 1),
                    NULL,
                    NULL),

                   ('Projektplan',
                    'Projektziel:
                     Die Entwicklung einer barrierefreien, responsiven Webanwendung zur Projektverwaltung.
                
**Meilensteine:**
\n* KW 10: Anforderungsanalyse abgeschlossen
\n* KW 12: Erste UI-Prototypen verfügbar
\n* KW 16: Alpha-Version mit Basisfunktionen
\n* KW 22: Feature-Freeze und Beta-Testing
\n               
**Ressourcen:**
\n* Dev-Team: 5 Personen (2 Frontend, 2 Backend, 1 QA)
\n* Server: AWS mit Auto-Scaling
\n
<span style="color: red;">**Risiken:**</span>
\n* Verzögerungen durch fehlende Schnittstellendokumentation externer Systeme
\n* Unterschätzte Performance-Anforderungen bei hoher Nutzerzahl.', NOW(),
                    (SELECT id FROM project ORDER BY random() LIMIT 1), NULL, NULL),

                   ('Code-Review-Richtlinien',
                    '1. Allgemeine Regeln - Jeder Merge-Request benötigt mindestens zwei Reviewer. - Kein Commit ohne zugehörige Unit-Tests. 2. Code-Style - TypeScript: Standard nach ESLint & Prettier - Kein "any" verwenden, immer Typen explizit definieren. 3. Performance - Datenbankabfragen optimieren: \`SELECT *\` vermeiden, nur benötigte Felder abrufen. - Große JSON-Objekte mit gzip komprimieren.',
                    NOW(),
                    NULL,
                    (SELECT id
                     FROM project_phase
                     WHERE "nameId" = (SELECT id FROM phase_ids WHERE name = 'Coding & Care Work')), NULL),

                   ('Architektur-Dokumentation',
                    '### Architekturübersicht
\nDas System basiert auf einer eventgesteuerten Microservices-Architektur mit RabbitMQ zur Kommunikation.
\n
\n**Dienste:**
\n- Auth-Service (OAuth 2.0)
\n- User-Service (CRUD-Operationen für Benutzer)
\n- Notification-Service (E-Mail & Push-Benachrichtigungen)
\n
\n**Technologien:**
\n- Backend: NestJS, TypeORM, PostgreSQL
\n- Frontend: Angular, NGXS für State Management
\n
\n**Deployment:**
\n- CI/CD mit GitHub Actions und Docker Swarm.', NOW(),
                    NULL,
                    (SELECT id
                     FROM project_phase
                     WHERE "nameId" = (SELECT id FROM phase_ids WHERE name = 'Research & Ranting')), NULL),

                   ('API-Dokumentation',
                    '### Endpunkte:
\n- \`POST /auth/login\` - Benutzeranmeldung
\n- \`GET /projects/:id\` - Projektinformationen abrufen
\n- \`POST /tasks\` - Neue Aufgabe erstellen
\n
\n**Authentifizierung:**
\n- Alle Endpunkte außer \`/auth/login\` erfordern ein JWT-Token.
\n
\n**Beispiel für eine Anfrage:**
\n\`\`\`json
\n{
\n  "username": "admin",
\n  "password": "securepassword123"
\n}
\n\`\`\`
\n
\n**Antwort:**\n
\n\`\`\`json
\n{
\n  "token": "eyJhbGciOiJI..."
\n}
\n\`\`\`', NOW(),
                    NULL, NULL, (SELECT id FROM activity ORDER BY random() LIMIT 1)),

                   ('Sicherheitsrichtlinien',
                    '**1. Passwort-Hashing**
\n* Bcrypt mit mindestens 12 Runden.
\n
\n**2. XSS-Schutz**
\n- Input-Sanitization mit DOMPurify.
\n
\n**3. SQL Injection verhindern**
\n- Keine String-Konkatenation für SQL-Queries, immer Query-Parameter nutzen:
\`\`\`typescript
\n\\\\ typescript code
\nthis.repository.query("SELECT \n* FROM users WHERE email = $1", [email]);
\n\`\`\`
\n
\n**4. HTTPS-Verschlüsselung**
\n- SSL/TLS 1.2+ erzwingen, HSTS aktivieren.', NOW(),
                    (SELECT id FROM project ORDER BY random() LIMIT 1), NULL, NULL),

                   ('Teststrategie',
                    '### Unit-Tests:
                     - Jest für Backend (NestJS)
                     - Karma & Jasmine für Frontend (Angular)
                     
                     **Integrationstests:**
                     - Cypress für End-to-End-Tests
                     - Datenbank-Tests mit SQLite-Mocks
                     
                     **Testabdeckung:**
                     - Mindestens 80% Code-Coverage erforderlich.', NOW(),
                    NULL,
                    (SELECT id
                     FROM project_phase
                     WHERE "nameId" = (SELECT id FROM phase_ids WHERE name = 'Testing & Tea Time')), NULL),

                   ('Deployment-Anleitung',
                    '### Voraussetzungen:
                     - Docker & Kubernetes installiert
                     - \`.env\`-Datei mit Konfigurationswerten vorhanden
                     
                     **Deployment-Befehl:**
                     \`\`\`
                     kubectl apply -f deployment.yaml
                     \`\`\`
                     
                     **Rollback:**
                     \`\`\`
                     kubectl rollout undo deployment my-app
                     \`\`\`
                     
                     **Monitoring:**
                     - Prometheus & Grafana für Performance-Überwachung.', NOW(),
                    NULL,
                    (SELECT id
                     FROM project_phase
                     WHERE "nameId" = (SELECT id FROM phase_ids WHERE name = 'Deployment & Dance Party')), NULL),

                   ('Benutzerhandbuch',
                    '### Anmeldung: \n1. Öffnen Sie die Anwendung unter \`https://example.com\` \n2. Benutzername und Passwort eingeben. \n\n### Navigation: \n* Dashboard: Übersicht über alle Projekte \n* Aufgaben: Aktuelle To-Dos & Status \n### Häufige Fragen: \n* Passwort vergessen? → Auf "Passwort zurücksetzen" klicken.',
                    NOW(),
                    (SELECT id FROM project ORDER BY random() LIMIT 1), NULL, NULL),

                   ('Release Notes',
                    '### Version 1.2.0 - 15. März 2024 \n**Neu:** \n* Dark Mode für alle Benutzer verfügbar. \n* Verbesserte Performance durch Caching von API-Anfragen. **Bugfixes:** \n* Fehlerhafte 404-Seite wurde korrigiert. \n* Datenbankverbindungen stabiler gemacht.',
                    NOW(),
                    NULL, (SELECT id FROM project_phase ORDER BY random() LIMIT 1), NULL)
        `);

        await queryRunner.query(`
            INSERT INTO milestone (title, "plannedDate", "actualDate", description, "phaseId", "activityId")
            VALUES
                -- Milestones für verschiedene Phasen
                ('Projektstart', '2024-01-10', NULL, 'Offizieller Start des Projekts.',
                 (SELECT id
                  FROM project_phase
                  WHERE "nameId" = (SELECT id FROM phase_name WHERE name = 'Kickoff & Kuchen')
                  LIMIT 1), NULL),

                ('Anforderungsanalyse abgeschlossen', '2024-02-01', NULL, 'Alle Anforderungen dokumentiert.',
                 (SELECT id
                  FROM project_phase
                  WHERE "nameId" = (SELECT id FROM phase_name WHERE name = 'Research & Ranting')
                  LIMIT 1), NULL),

                ('Prototyp fertiggestellt', '2024-03-15', NULL, 'Ein klickbarer Prototyp ist bereit.',
                 (SELECT id
                  FROM project_phase
                  WHERE "nameId" = (SELECT id FROM phase_name WHERE name = 'Prototyping & Patriarchy-Hacking')
                  LIMIT 1), NULL),

                ('Erster Code-Commit', '2024-04-01', NULL, 'Der erste Code wurde im Repository hinterlegt.',
                 (SELECT id
                  FROM project_phase
                  WHERE "nameId" = (SELECT id FROM phase_name WHERE name = 'Coding & Care Work')
                  LIMIT 1), NULL),

                ('Erfolgreicher Integrationstest', '2024-05-01', NULL,
                 'Alle Komponenten wurden erfolgreich integriert.',
                 (SELECT id
                  FROM project_phase
                  WHERE "nameId" = (SELECT id FROM phase_name WHERE name = 'Testing & Tea Time')
                  LIMIT 1), NULL),

                ('Go-Live Freigabe', '2024-06-10', NULL, 'Das Produkt wurde offiziell freigegeben.',
                 (SELECT id
                  FROM project_phase
                  WHERE "nameId" = (SELECT id FROM phase_name WHERE name = 'Deployment & Dance Party')
                  LIMIT 1), NULL),

                -- Milestones für bestimmte Aktivitäten
                ('Code Review abgeschlossen', '2024-04-15', NULL,
                 'Das erste Code Review wurde erfolgreich durchgeführt.',
                 NULL, (SELECT id FROM activity WHERE title = 'Erste Wireframes erstellen' LIMIT 1)),

                ('Backend API bereit', '2024-05-05', NULL, 'Die API ist implementiert und getestet.',
                 NULL, (SELECT id FROM activity WHERE title = 'Backend-API entwickeln' LIMIT 1)),

                ('Produktdokumentation finalisiert', '2024-06-20', NULL,
                 'Die Dokumentation für das Produkt ist abgeschlossen.',
                 NULL, (SELECT id FROM activity WHERE title = 'Produkt-Dokumentation finalisieren' LIMIT 1)),

                ('Projektabschluss & Feedbackrunde', '2024-07-01', NULL,
                 'Das Projekt wird offiziell abgeschlossen und reflektiert.',
                 NULL, (SELECT id FROM activity WHERE title = 'Projekt-Review & Lessons Learned' LIMIT 1));        `)

        await queryRunner.query(`
            WITH random_phases AS (SELECT id                                                       AS activity_id,
                                          (SELECT id FROM project_phase ORDER BY RANDOM() LIMIT 1) AS random_phase_id
                                   FROM activity)
            UPDATE activity
            SET phase_id = random_phases.random_phase_id
            FROM random_phases
            WHERE activity.id = random_phases.activity_id;
        `)

        console.log("Testdaten erfolgreich eingefügt!");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("Testdaten werden entfernt...");

        // Tabellenliste für das Löschen der Daten
        const tablesToDelete = [
            'activity_status',
            'activity',
            'phase_status',
            'phase_name',
            'project_phase',
            'project',
            'methodology',
            'milestone',
            'pm_user',
            'role',
            'user_role',
            'document',
            'employee',
            'user',
            'project_external_costs',
            'external_cost_type',
            'external_costs'
        ];

        // Hilfsfunktion für die Löschoperation
        async function deleteTableData(tableName: string): Promise<void> {
            await queryRunner.query(`DELETE
                                     FROM ${tableName};`);
        }

        // Alle Tabellen iterativ löschen
        for (const table of tablesToDelete) {
            await deleteTableData(table);
        }

        console.log("Testdaten wurden erfolgreich entfernt.");
    }
}

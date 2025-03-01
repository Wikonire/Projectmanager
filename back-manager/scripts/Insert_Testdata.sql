-- Einfügen von Testdaten für das Projektmanagement-System in PostgreSQL

-- Benutzerrollen
INSERT INTO role (id, name) VALUES
(uuid_generate_v4(), 'Admin'),
(uuid_generate_v4(), 'Projektleiter'),
(uuid_generate_v4(), 'Mitarbeiter'),
(uuid_generate_v4(), 'Verantwortliche Person');

-- Benutzer
INSERT INTO "user" (id, username, email, password) VALUES
(uuid_generate_v4(), 'john_doe', 'john.doe@example.com', 'password123'),
(uuid_generate_v4(), 'jane_smith', 'jane.smith@example.com', 'securepass'),
(uuid_generate_v4(), 'project_lead', 'lead@example.com', 'leadpass');

-- Benutzer-Rollen
INSERT INTO user_role (id, user_id, role_id) VALUES
(uuid_generate_v4(), (SELECT id FROM "user" WHERE username = 'john_doe'), (SELECT id FROM role WHERE name = 'Admin')),
(uuid_generate_v4(), (SELECT id FROM "user" WHERE username = 'jane_smith'), (SELECT id FROM role WHERE name = 'Projektleiter')),
(uuid_generate_v4(), (SELECT id FROM "user" WHERE username = 'project_lead'), (SELECT id FROM role WHERE name = 'Verantwortliche Person'));

-- Mitarbeiter
INSERT INTO employee (id, employee_number, last_name, first_name) VALUES
(uuid_generate_v4(), 'EMP001', 'Doe', 'John'),
(uuid_generate_v4(), 'EMP002', 'Smith', 'Jane'),
(uuid_generate_v4(), 'EMP003', 'Johnson', 'Jake');

-- Funktionen
INSERT INTO function (id, function_name) VALUES
(uuid_generate_v4(), 'Designer*in'),
(uuid_generate_v4(), 'Applikationsentwickler*in Frontend'),
(uuid_generate_v4(), 'Applikationsentwickler*in Backend'),
(uuid_generate_v4(), 'Buchhaltung'),
(uuid_generate_v4(), 'Architekt*in');

-- Mitarbeiter-Funktionen
INSERT INTO employee_function (id, employee_id, function_id, workload) VALUES
(uuid_generate_v4(), (SELECT id FROM employee WHERE employee_number = 'EMP001'), (SELECT id FROM function WHERE function_name = 'Designer*in'), 80.0),
(uuid_generate_v4(), (SELECT id FROM employee WHERE employee_number = 'EMP002'), (SELECT id FROM function WHERE function_name = 'Applikationsentwickler*in Frontend'), 100.0),
(uuid_generate_v4(), (SELECT id FROM employee WHERE employee_number = 'EMP003'), (SELECT id FROM function WHERE function_name = 'Applikationsentwickler*in Backend'), 90.0);

-- Projekte
INSERT INTO project (id, project_reference, title, description, priority, status, methodology, planned_start_date, planned_end_date, progress) VALUES
(uuid_generate_v4(), 'PROJ001', 'Erforschung von Weltraumkatzen', 'Eine bahnbrechende Studie zu Katzen im All.', 'Hoch', 'Laufend', 'Agil', '2024-01-01', '2024-12-31', 42.5),
(uuid_generate_v4(), 'PROJ002', 'Entwicklung einer Pizza-Drohne', 'Pizza, die direkt ins Fenster geliefert wird.', 'Sehr Hoch', 'Geplant', 'Scrum', '2024-05-01', '2025-05-01', 0.0);

-- Projektphasen
INSERT INTO project_phase (id, project_id, planned_start_date, planned_end_date, phase_status, progress) VALUES
(uuid_generate_v4(), (SELECT id FROM project WHERE project_reference = 'PROJ001'), '2024-01-01', '2024-06-01', 'Abgeschlossen', 100),
(uuid_generate_v4(), (SELECT id FROM project WHERE project_reference = 'PROJ002'), '2024-05-01', '2024-10-01', 'Laufend', 20);

-- Aktivitäten
INSERT INTO activity (id, phase_id, title, planned_start_date, planned_end_date, budget, costs, progress) VALUES
(uuid_generate_v4(), (SELECT id FROM project_phase WHERE project_id = (SELECT id FROM project WHERE project_reference = 'PROJ001')), 'Katze im Raumanzug testen', '2024-02-01', '2024-04-01', 50000, 45000, 90),
(uuid_generate_v4(), (SELECT id FROM project_phase WHERE project_id = (SELECT id FROM project WHERE project_reference = 'PROJ002')), 'Prototyp der Pizza-Drohne bauen', '2024-06-01', '2024-09-01', 200000, 50000, 25);

-- Meilensteine
INSERT INTO milestone (id, project_id, phase_id, title, planned_date, actual_date, description) VALUES
(uuid_generate_v4(), (SELECT id FROM project WHERE project_reference = 'PROJ001'), (SELECT id FROM project_phase WHERE project_id = (SELECT id FROM project WHERE project_reference = 'PROJ001')), 'Start der Tests', '2024-02-01', '2024-02-15', 'Katze hat erfolgreich den Helm akzeptiert.'),
(uuid_generate_v4(), (SELECT id FROM project WHERE project_reference = 'PROJ002'), (SELECT id FROM project_phase WHERE project_id = (SELECT id FROM project WHERE project_reference = 'PROJ002')), 'Erster Flug', '2024-08-01', NULL, 'Drohne soll erste Pizza ausliefern.');

-- Bestellungen
INSERT INTO orders (id, project_id, supplier, order_date, delivery_date, status, total_cost) VALUES
(uuid_generate_v4(), (SELECT id FROM project WHERE project_reference = 'PROJ001'), 'NASA Space Suits Inc.', '2024-01-10', '2024-02-01', 'Geliefert', 75000),
(uuid_generate_v4(), (SELECT id FROM project WHERE project_reference = 'PROJ002'), 'PizzaTech Ltd.', '2024-06-15', '2024-07-01', 'Bestellt', 120000);

-- Dokumente
INSERT INTO document (id, name, file_path, type) VALUES
(uuid_generate_v4(), 'Katze-Testbericht.pdf', '/documents/cat_test_report.pdf', 'PDF'),
(uuid_generate_v4(), 'Pizza-Drohne-Bauanleitung.pdf', '/documents/pizza_drone_manual.pdf', 'PDF');
-- Füge UNIQUE-Constraints oder PRIMARY KEYS hinzu:

-- Für pm_user: username sollte einzigartig sein.
-- ALTER TABLE pm_user ADD CONSTRAINT unique_username UNIQUE (username);--

-- Für employee: employee_number sollte einzigartig sein.
-- ALTER TABLE employee ADD CONSTRAINT unique_employee_number UNIQUE (employee_number);

-- Für pm_function: pm_function_name sollte einzigartig sein.
-- ALTER TABLE pm_function ADD CONSTRAINT unique_pm_function_name UNIQUE (pm_function_name);

-- Für project: project_reference sollte einzigartig sein.
-- ALTER TABLE project ADD CONSTRAINT unique_project_reference UNIQUE (project_reference);

INSERT INTO pm_user (id, username, email, password)
VALUES
    (uuid_generate_v4(), 'lesbian_hacker', 'ada@lovelace.net', 'securepassword'),
    (uuid_generate_v4(), 'nonbinary_dev', 'moxie@signal.org', 'encryptionrocks'),
    (uuid_generate_v4(), 'feminist_witch', 'bell@hooks.com', 'intersectional_feminism'),
    (uuid_generate_v4(), 'queer_coder', 'grace@hopper.dev', 'debugging_is_fun')
ON CONFLICT (username) DO NOTHING;

INSERT INTO user_role (user_id, role_id)
VALUES
    ((SELECT id FROM pm_user WHERE username = 'lesbian_hacker'), (SELECT id FROM role WHERE name = 'Admin')),
    ((SELECT id FROM pm_user WHERE username = 'nonbinary_dev'), (SELECT id FROM role WHERE name = 'Editor')),
    ((SELECT id FROM pm_user WHERE username = 'feminist_witch'), (SELECT id FROM role WHERE name = 'View_Creator')),
    ((SELECT id FROM pm_user WHERE username = 'queer_coder'), (SELECT id FROM role WHERE name = 'DB_Manager'))
ON CONFLICT DO NOTHING;

INSERT INTO employee (id, employee_number, last_name, first_name)
VALUES
    (uuid_generate_v4(), '1337', 'Lovelace', 'Ada'),
    (uuid_generate_v4(), '1984', 'Orwell', 'George'),
    (uuid_generate_v4(), '42069', 'Hooks', 'Bell'),
    (uuid_generate_v4(), '31415', 'Hopper', 'Grace')
ON CONFLICT (employee_number) DO NOTHING;

INSERT INTO pm_function (id, pm_function_name)
VALUES
    (uuid_generate_v4(), 'Cybersecurity Witch'),
    (uuid_generate_v4(), 'Inclusive UX Designer'),
    (uuid_generate_v4(), 'AI Ethics Expert'),
    (uuid_generate_v4(), 'Diversity Evangelist')
ON CONFLICT (pm_function_name) DO NOTHING;

INSERT INTO employee_pm_function (id, employee_id, pm_function_id, workload)
VALUES
    (uuid_generate_v4(), (SELECT id FROM employee WHERE last_name = 'Lovelace'), (SELECT id FROM pm_function WHERE pm_function_name = 'Cybersecurity Witch'), 80.00),
    (uuid_generate_v4(), (SELECT id FROM employee WHERE last_name = 'Hooks'), (SELECT id FROM pm_function WHERE pm_function_name = 'Diversity Evangelist'), 60.00),
    (uuid_generate_v4(), (SELECT id FROM employee WHERE last_name = 'Hopper'), (SELECT id FROM pm_function WHERE pm_function_name = 'AI Ethics Expert'), 100.00)
ON CONFLICT DO NOTHING;

INSERT INTO project (id, project_reference, title, description, priority_id, status_id, methodology)
VALUES
    (uuid_generate_v4(), 'QTX-2024', 'Queer Tech Conference',
     'Eine Konferenz über queere Menschen in der Tech-Branche.',
     (SELECT id FROM project_priority WHERE name = 'High'),
     (SELECT id FROM project_status WHERE name = 'In progress'),
     'Agile'),

    (uuid_generate_v4(), 'FEM-APP', 'Feminist Safe Space App',
     'Eine App, die feministische Gruppen verbindet und sichere Räume schafft.',
     (SELECT id FROM project_priority WHERE name = 'Medium'),
     (SELECT id FROM project_status WHERE name = 'Planned'),
     'Scrum'),

    (uuid_generate_v4(), 'NEURODIVERSE-HUB', 'Neurodivergent Tech Hub',
     'Ein Open-Source-Projekt zur Unterstützung neurodivergenter Menschen in der IT.',
     (SELECT id FROM project_priority WHERE name = 'High'),
     (SELECT id FROM project_status WHERE name = 'In progress'),
     'Kanban'),

    (uuid_generate_v4(), 'FLINTA-SECURITY', 'FLINTA+ Digital Security Guide',
     'Eine Plattform mit IT-Sicherheitsressourcen für FLINTA+-Personen.',
     (SELECT id FROM project_priority WHERE name = 'High'),
     (SELECT id FROM project_status WHERE name = 'Planned'),
     'Lean UX'),

    (uuid_generate_v4(), 'AI-FAIRNESS', 'Queer & Feminist AI',
     'Ein Forschungsteam entwickelt ethische, queere und feministische KI-Modelle.',
     (SELECT id FROM project_priority WHERE name = 'High'),
     (SELECT id FROM project_status WHERE name = 'In progress'),
     'Agile')
ON CONFLICT (project_reference) DO NOTHING;


INSERT INTO project_phase (id, project_id, planned_start_date, planned_end_date, phase_status_id)
VALUES
    (uuid_generate_v4(), (SELECT id FROM project WHERE title = 'Queer Tech Conference'), '2024-03-01', '2024-06-30', (SELECT id FROM phase_status WHERE name = 'Planned')),
    (uuid_generate_v4(), (SELECT id FROM project WHERE title = 'Feminist Safe Space App'), '2024-04-01', '2024-10-01', (SELECT id FROM phase_status WHERE name = 'In progress'))
ON CONFLICT DO NOTHING;

INSERT INTO activity (id, phase_id, activity_status_id, title, planned_start_date, planned_end_date)
VALUES
    (uuid_generate_v4(),
     (SELECT id FROM project_phase WHERE project_id =
                                         (SELECT id FROM project WHERE title = 'Queer Tech Conference') LIMIT 1),
     (SELECT id FROM activity_status WHERE name = 'Planned' LIMIT 1),
     'Speaker Akquise', '2024-03-01', '2024-04-15'),

    (uuid_generate_v4(),
     (SELECT id FROM project_phase WHERE project_id =
                                         (SELECT id FROM project WHERE title = 'Feminist Safe Space App') LIMIT 1),
     (SELECT id FROM activity_status WHERE name = 'In progress' LIMIT 1),
     'Design User Interface', '2024-04-10', '2024-05-30');





INSERT INTO document (id, title, content)
VALUES
    (uuid_generate_v4(), 'Hacking Patriarchy', 'Eine Strategie zur digitalen Selbstverteidigung für FLINTA-Personen.'),
    (uuid_generate_v4(), 'Queer Algorithms', 'Wie können Algorithmen faire und queere Entscheidungen treffen?');


INSERT INTO document_relation (id, document_id, related_id, related_type_id)
VALUES
    (uuid_generate_v4(), (SELECT id FROM document WHERE title = 'Hacking Patriarchy'), (SELECT id FROM project WHERE title = 'Feminist Safe Space App'), (SELECT id FROM document_type WHERE name = 'Project Document')),
    (uuid_generate_v4(), (SELECT id FROM document WHERE title = 'Queer Algorithms'), (SELECT id FROM project WHERE title = 'Queer Tech Conference'), (SELECT id FROM document_type WHERE name = 'Activity Document'))


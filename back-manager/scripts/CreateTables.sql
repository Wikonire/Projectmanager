DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
create table pm_user
(
    id          uuid      default uuid_generate_v4() not null
        primary key,
    username    varchar(50)                          not null
        unique,
    email       varchar(320)                         not null
        unique,
    password    varchar(255)                         not null,
    "createdAt" timestamp default now()              not null
);

alter table pm_user
    owner to postgres;

create table role
(
    id   uuid default uuid_generate_v4() not null
        primary key,
    name varchar(50)                     not null
        unique
);

alter table role
    owner to postgres;

create table user_role
(
    user_id uuid not null
        references pm_user
            on delete cascade,
    role_id uuid not null
        references role
            on delete cascade,
    primary key (user_id, role_id)
);

alter table user_role
    owner to postgres;

create table employee
(
    id         uuid      default uuid_generate_v4() not null
        primary key,
    last_name  varchar(100)                         not null,
    first_name varchar(100)                         not null,
    created_at timestamp default now()              not null
);

alter table employee
    owner to postgres;

create table employee_user
(
    employee_id uuid not null
        constraint "FK_a5a16cf361eaa400dbaf6139fa6"
            references employee,
    user_id     uuid not null
        constraint "FK_42e63f6b8b5a9a7a6df50d5ad81"
            references pm_user
            on update cascade on delete cascade,
    primary key (employee_id, user_id)
);

alter table employee_user
    owner to postgres;

create index "IDX_42e63f6b8b5a9a7a6df50d5ad8"
    on employee_user (user_id);

create index "IDX_a5a16cf361eaa400dbaf6139fa"
    on employee_user (employee_id);

create table pm_function
(
    id               uuid default uuid_generate_v4() not null
        primary key,
    "pmFunctionName" varchar(100)                    not null
        constraint pm_function_pm_function_name_key
            unique
);

alter table pm_function
    owner to postgres;

create table employee_pm_function
(
    id             uuid default uuid_generate_v4() not null
        primary key,
    workload       numeric(5, 2)                   not null,
    "employeeId"   uuid
        constraint "FK_b223e6a7acde4c8120e9f77436d"
            references employee
            on delete cascade,
    "pmFunctionId" uuid
        constraint "FK_11127dc7f3b0112ed9c4968b137"
            references pm_function
            on delete cascade
);

alter table employee_pm_function
    owner to postgres;

create table project_priority
(
    id   uuid default uuid_generate_v4() not null
        primary key,
    name varchar(50)                     not null
);

alter table project_priority
    owner to postgres;

create table project_status
(
    id   uuid default uuid_generate_v4() not null
        primary key,
    name varchar(50)                     not null
        unique
);

alter table project_status
    owner to postgres;

create table project
(
    id                  uuid          default uuid_generate_v4() not null
        primary key,
    title               varchar(255)                             not null,
    description         text,
    status_id           uuid
        constraint "FK_625ed5469429a6b32e34ba9f827"
            references project_status
            on delete cascade,
    methodology         varchar(50)                              not null,
    progress            numeric(5, 2) default 0                  not null,
    "projectReference"  varchar(50)                              not null
        constraint "UQ_5a3aa1dd57b68af04e8ee5e8756"
            unique,
    "approvalDate"      date,
    "approvalSignature" varchar(255),
    "plannedStartDate"  date,
    "plannedEndDate"    date,
    "actualStartDate"   date,
    "actualEndDate"     date,
    "createdAt"         timestamp     default now()              not null,
    "priorityId"        uuid
        constraint "FK_9ca4db31d1d35e1a4f852436cdf"
            references project_priority
            on delete cascade
);

alter table project
    owner to postgres;

create table phase_status
(
    id   uuid default uuid_generate_v4() not null
        primary key,
    name varchar(50)                     not null
        unique
);

alter table phase_status
    owner to postgres;

create table project_phase
(
    id              uuid          default uuid_generate_v4() not null
        primary key,
    progress        numeric(5, 2) default 0                  not null,
    "projectId"     uuid
        constraint "FK_310df8becd8e05c13a6d8ebb26d"
            references project
            on delete cascade,
    "phaseStatusId" uuid
        constraint "FK_216ec704187cd4b6e1b8dd23ce2"
            references phase_status
            on delete cascade
);

alter table project_phase
    owner to postgres;

create table activity_status
(
    id   uuid default uuid_generate_v4() not null
        primary key,
    name varchar(50)                     not null
        unique
);

alter table activity_status
    owner to postgres;

create table activity
(
    id                 uuid          default uuid_generate_v4() not null
        primary key,
    phase_id           uuid
        constraint "FK_33af046b4e770807c773e83963a"
            references project_phase
            on delete cascade,
    activity_status_id uuid
        constraint "FK_41dd715ed387b07835244b4aa05"
            references activity_status
            on delete cascade,
    title              varchar(255)                             not null,
    estimation         smallint                                 not null,
    progress           numeric(5, 2) default 0                  not null,
    "plannedStartDate" date,
    "plannedEndDate"   date,
    "actualStartDate"  timestamp,
    "actualEndDate"    timestamp
);

alter table activity
    owner to postgres;

create table milestone
(
    id            uuid default uuid_generate_v4() not null
        primary key,
    title         varchar(255)                    not null,
    description   text,
    "plannedDate" date,
    "actualDate"  date,
    "phaseId"     uuid
        constraint "FK_e9db259d4261b726a08031fa64a"
            references project_phase
            on delete cascade,
    "activityId"  uuid
        constraint "FK_77c1aa010dd10b68363d9f4f20e"
            references activity
            on delete cascade
);

alter table milestone
    owner to postgres;

create table work_hours
(
    id               uuid          default uuid_generate_v4() not null
        primary key,
    activity_id      uuid                                     not null
        references activity
            on delete cascade,
    hours            numeric(5, 2) default 0                  not null
        constraint work_hours_hours_check
            check (hours >= (0)::numeric),
    date_worked_from timestamp                                not null,
    date_worked_to   timestamp                                not null,
    assignment_id    uuid
        references employee_pm_function
            on delete cascade,
    constraint work_hours_check
        check (date_worked_to >= date_worked_from)
);

alter table work_hours
    owner to postgres;

create table document_type
(
    id   uuid default uuid_generate_v4() not null
        constraint "PK_2e1aa55eac1947ddf3221506edb"
            primary key,
    name varchar(50)                     not null
        constraint "UQ_d63f0a80a96310fe1e9657795ff"
            unique
);

alter table document_type
    owner to postgres;

create table document
(
    id          uuid      default uuid_generate_v4() not null
        constraint "PK_e57d3357f83f3cdc0acffc3d777"
            primary key,
    title       varchar(255)                         not null,
    content     text                                 not null,
    "createdAt" timestamp default now()              not null
);

alter table document
    owner to postgres;

create table document_relation
(
    id              uuid default uuid_generate_v4() not null
        constraint "PK_dac3a8b8f3d2046383d97b4d80d"
            primary key,
    "relatedId"     uuid                            not null,
    "documentId"    uuid
        constraint "FK_c8d3cadad36fa91424c0fbdec5d"
            references document
            on delete cascade,
    "relatedTypeId" uuid
        constraint "FK_bbb1fe3e2782da2a4343a108e22"
            references document_type
            on delete cascade
);

alter table document_relation
    owner to postgres;

-- Rollen (z.B. Admin, Nutzer*innen)
INSERT INTO role (id, name) VALUES
                                (uuid_generate_v4(), 'Admin'),
                                (uuid_generate_v4(), 'Projektmanager*in'),
                                (uuid_generate_v4(), 'Entwickler*in'),
                                (uuid_generate_v4(), 'Testingenieur*in');


INSERT INTO pm_user (id, username, email, password, "createdAt") VALUES
                                                                     (uuid_generate_v4(), 'AdaLovelace42', 'ada@babbage.net', 'pass123', now()),
                                                                     (uuid_generate_v4(), 'NonBinarySkywalker', 'skywalker@jedi.space', 'force2024', now()),
                                                                     (uuid_generate_v4(), 'CaptainMarvelFan', 'carol@avengers.org', 'higherfurtherfaster', now()),
                                                                     (uuid_generate_v4(), 'XenonTheAI', 'xenon@future.ai', 'beepboop42', now()),
                                                                     (uuid_generate_v4(), 'CyberFeminist', 'hacker@cyberpunk.net', 'matrixHasYou', now());

-- Mitarbeitende
INSERT INTO employee (id, last_name, first_name, created_at) VALUES
                                                                 (uuid_generate_v4(), 'Lovelace', 'Ada', now()),
                                                                 (uuid_generate_v4(), 'Skywalker', 'Non-Binary', now()),
                                                                 (uuid_generate_v4(), 'Danvers', 'Carol', now()),
                                                                 (uuid_generate_v4(), 'Turing', 'Alan', now()),
                                                                 (uuid_generate_v4(), 'Bletchley', 'Joan', now());

-- Verbindung von Usern zu Mitarbeitenden
INSERT INTO employee_user (employee_id, user_id) VALUES
                                                     ((SELECT id FROM employee WHERE last_name = 'Lovelace'), (SELECT id FROM pm_user WHERE username = 'AdaLovelace42')),
                                                     ((SELECT id FROM employee WHERE last_name = 'Skywalker'), (SELECT id FROM pm_user WHERE username = 'NonBinarySkywalker')),
                                                     ((SELECT id FROM employee WHERE last_name = 'Danvers'), (SELECT id FROM pm_user WHERE username = 'CaptainMarvelFan')),
                                                     ((SELECT id FROM employee WHERE last_name = 'Turing'), (SELECT id FROM pm_user WHERE username = 'XenonTheAI')),
                                                     ((SELECT id FROM employee WHERE last_name = 'Bletchley'), (SELECT id FROM pm_user WHERE username = 'CyberFeminist'));

-- Projekt-Prioritäten
INSERT INTO project_priority (id, name) VALUES
                                            (uuid_generate_v4(), 'Hoch'),
                                            (uuid_generate_v4(), 'Mittel'),
                                            (uuid_generate_v4(), 'Niedrig');

-- Projekt-Status
INSERT INTO project_status (id, name) VALUES
                                          (uuid_generate_v4(), 'Geplant'),
                                          (uuid_generate_v4(), 'In Arbeit'),
                                          (uuid_generate_v4(), 'Abgeschlossen'),
                                          (uuid_generate_v4(), 'Archiviert');

-- Projekte mit nerdigen & feministischen Bezügen
INSERT INTO project (id, title, description, status_id, methodology, progress, "projectReference", "approvalDate", "createdAt", "priorityId") VALUES
                                                                                                                                                  (uuid_generate_v4(), 'Projekt CyberFeminism', 'Ein Open-Source-Projekt für mehr Diversität in der IT.',
                                                                                                                                                   (SELECT id FROM project_status WHERE name = 'Geplant'), 'Scrum', 10, 'CF2024', now(), now(),
                                                                                                                                                   (SELECT id FROM project_priority WHERE name = 'Hoch')),

                                                                                                                                                  (uuid_generate_v4(), 'Queer Game Jam', 'Ein Hackathon für queere Narrative in Videospielen.',
                                                                                                                                                   (SELECT id FROM project_status WHERE name = 'In Arbeit'), 'Kanban', 50, 'QGJ2024', now(), now(),
                                                                                                                                                   (SELECT id FROM project_priority WHERE name = 'Mittel')),

                                                                                                                                                  (uuid_generate_v4(), 'Diversity AI', 'Künstliche Intelligenz zur Reduktion von Bias in Algorithmen.',
                                                                                                                                                   (SELECT id FROM project_status WHERE name = 'In Arbeit'), 'Agile', 35, 'DAI2024', now(), now(),
                                                                                                                                                   (SELECT id FROM project_priority WHERE name = 'Hoch')),

                                                                                                                                                  (uuid_generate_v4(), 'Turing Tribute', 'Eine App zur Würdigung von LGBTQ+ Pionier*innen in der Informatik.',
                                                                                                                                                   (SELECT id FROM project_status WHERE name = 'Abgeschlossen'), 'Waterfall', 100, 'TTR2023', now(), now(),
                                                                                                                                                   (SELECT id FROM project_priority WHERE name = 'Mittel'));

-- Phasen-Status
INSERT INTO phase_status (id, name) VALUES
                                        (uuid_generate_v4(), 'Start'),
                                        (uuid_generate_v4(), 'Analyse'),
                                        (uuid_generate_v4(), 'Entwicklung'),
                                        (uuid_generate_v4(), 'Test'),
                                        (uuid_generate_v4(), 'Release');

-- Projekt-Phasen
INSERT INTO project_phase (id, progress, "projectId", "phaseStatusId") VALUES
                                                                           (uuid_generate_v4(), 25, (SELECT id FROM project WHERE title = 'Projekt CyberFeminism'), (SELECT id FROM phase_status WHERE name = 'Analyse')),
                                                                           (uuid_generate_v4(), 60, (SELECT id FROM project WHERE title = 'Queer Game Jam'), (SELECT id FROM phase_status WHERE name = 'Entwicklung')),
                                                                           (uuid_generate_v4(), 80, (SELECT id FROM project WHERE title = 'Diversity AI'), (SELECT id FROM phase_status WHERE name = 'Test')),
                                                                           (uuid_generate_v4(), 100, (SELECT id FROM project WHERE title = 'Turing Tribute'), (SELECT id FROM phase_status WHERE name = 'Release'));

-- Aktivitäts-Status
INSERT INTO activity_status (id, name) VALUES
                                           (uuid_generate_v4(), 'To-Do'),
                                           (uuid_generate_v4(), 'In Bearbeitung'),
                                           (uuid_generate_v4(), 'Fertig');

-- Aktivitäten für die Projekte
INSERT INTO activity (id, phase_id, activity_status_id, title, estimation, progress, "plannedStartDate", "plannedEndDate") VALUES
                                                                                                                               (uuid_generate_v4(), (SELECT id FROM project_phase WHERE "projectId" = (SELECT id FROM project WHERE title = 'Projekt CyberFeminism')),
                                                                                                                                (SELECT id FROM activity_status WHERE name = 'To-Do'), 'Community-Recherche', 5, 10, now(), now() + INTERVAL '7 days'),

                                                                                                                               (uuid_generate_v4(), (SELECT id FROM project_phase WHERE "projectId" = (SELECT id FROM project WHERE title = 'Queer Game Jam')),
                                                                                                                                (SELECT id FROM activity_status WHERE name = 'In Bearbeitung'), 'Story-Design', 10, 50, now(), now() + INTERVAL '14 days'),

                                                                                                                               (uuid_generate_v4(), (SELECT id FROM project_phase WHERE "projectId" = (SELECT id FROM project WHERE title = 'Diversity AI')),
                                                                                                                                (SELECT id FROM activity_status WHERE name = 'To-Do'), 'Datensätze evaluieren', 7, 5, now(), now() + INTERVAL '10 days');

-- Meilensteine
INSERT INTO milestone (id, title, description, "plannedDate", "actualDate", "phaseId") VALUES
                                                                                           (uuid_generate_v4(), 'Kickoff-Meeting', 'Erstes Team-Meeting zur Definition der Ziele.', now(), NULL,
                                                                                            (SELECT id FROM project_phase WHERE "projectId" = (SELECT id FROM project WHERE title = 'Projekt CyberFeminism'))),

                                                                                           (uuid_generate_v4(), 'Erster Prototyp', 'Fertigstellung des ersten spielbaren Demos.', now() + INTERVAL '30 days', NULL,
                                                                                            (SELECT id FROM project_phase WHERE "projectId" = (SELECT id FROM project WHERE title = 'Queer Game Jam')));

-- Dokumenttypen
INSERT INTO document_type (id, name) VALUES
                                         (uuid_generate_v4(), 'Projektbeschreibung'),
                                         (uuid_generate_v4(), 'Design-Dokument'),
                                         (uuid_generate_v4(), 'Test-Plan');

-- Dokumente
INSERT INTO document (id, title, content, "createdAt") VALUES
                                                           (uuid_generate_v4(), 'Projektübersicht CyberFeminism', 'Hier steht eine ausführliche Beschreibung des Projekts.', now()),
                                                           (uuid_generate_v4(), 'Story Outline Queer Game Jam', 'Hier steht die narrative Outline für das Spiel.', now());

-- Dokument-Verknüpfungen
INSERT INTO document_relation (id, "relatedId", "documentId", "relatedTypeId") VALUES
    (uuid_generate_v4(), (SELECT id FROM document_type WHERE name = 'Projektbeschreibung'),
     (SELECT id FROM document WHERE title = 'Projektübersicht CyberFeminism'), (SELECT id FROM document_type WHERE name = 'Projektbeschreibung'));


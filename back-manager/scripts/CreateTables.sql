DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Benutzer*innenverwaltung
CREATE TABLE pm_user (
                         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                         username VARCHAR(50) UNIQUE NOT NULL,
                         email VARCHAR(320) UNIQUE NOT NULL,
                         password VARCHAR(255) NOT NULL,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role (
                      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                      name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO role (id, name) VALUES
                                (uuid_generate_v4(), 'Admin'),
                                (uuid_generate_v4(), 'DB_Manager'),
                                (uuid_generate_v4(), 'View_Creator'),
                                (uuid_generate_v4(), 'Editor');

CREATE TABLE user_role (
                           user_id UUID NOT NULL,
                           role_id UUID NOT NULL,
                           PRIMARY KEY (user_id, role_id),
                           FOREIGN KEY (user_id) REFERENCES pm_user(id) ON DELETE CASCADE,
                           FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

CREATE TABLE employee (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          employee_number VARCHAR(50) UNIQUE NOT NULL,
                          last_name VARCHAR(100) NOT NULL,
                          first_name VARCHAR(100) NOT NULL,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE employee_user (
                               employee_id UUID NOT NULL,
                               user_id UUID NOT NULL,
                               PRIMARY KEY (employee_id, user_id),
                               FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
                               FOREIGN KEY (user_id) REFERENCES pm_user(id) ON DELETE CASCADE
);

CREATE TABLE pm_function (
                             id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                             pm_function_name VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO pm_function (id, pm_function_name) VALUES
                                       (uuid_generate_v4(), 'Designer'),
                                       (uuid_generate_v4(), 'Application-Engineer'),
                                       (uuid_generate_v4(), 'Architect'),
                                       (uuid_generate_v4(), 'Product Owner'),
                                       (uuid_generate_v4(), 'UX_Manager');

CREATE TABLE employee_pm_function (
                                    id UUID NOT NULL  DEFAULT uuid_generate_v4(),
                                    employee_id UUID NOT NULL,
                                    pm_function_id UUID NOT NULL,
                                    workload DECIMAL(5,2) NOT NULL CHECK (workload >= 0 AND workload <= 100),
                                    PRIMARY KEY (id),
                                      FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
                                      FOREIGN KEY (pm_function_id) REFERENCES pm_function(id) ON DELETE CASCADE
);

-- Projektverwaltung
CREATE TABLE project_priority (
                                  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                  name VARCHAR(50) NOT NULL
    );

INSERT INTO project_priority (id, name) VALUES
                                            (uuid_generate_v4(), 'High'),
                                            (uuid_generate_v4(), 'Medium'),
                                            (uuid_generate_v4(), 'Low');

CREATE TABLE project_status (
                                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO project_status (id, name) VALUES
                                            (uuid_generate_v4(), 'Planned'),
                                            (uuid_generate_v4(), 'In progress'),
                                            (uuid_generate_v4(), 'Done'),
                                            (uuid_generate_v4(), 'Paused');

CREATE TABLE project (
                         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                         project_reference VARCHAR(50) UNIQUE NOT NULL,
                         title VARCHAR(255) NOT NULL,
                         description TEXT,
                         approval_date DATE,
                         approval_signature VARCHAR(255),
                         priority_id UUID NOT NULL,
                         status_id UUID NOT NULL,
                         planned_start_date DATE,
                         planned_end_date DATE,
                         actual_start_date DATE,
                         actual_end_date DATE,
                         methodology VARCHAR(50) NOT NULL,
                         progress DECIMAL(5,2) DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         FOREIGN KEY (status_id) REFERENCES project_status(id) ON DELETE CASCADE,
                         FOREIGN KEY (priority_id) REFERENCES project_priority(id) ON DELETE CASCADE
);



CREATE TABLE phase_status (
                              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                              name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO phase_status (id, name) VALUES
                                        (uuid_generate_v4(), 'Planned'),
                                        (uuid_generate_v4(), 'In progress'),
                                        (uuid_generate_v4(), 'Done'),
                                        (uuid_generate_v4(), 'Paused');

CREATE TABLE project_phase (
                               id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                               project_id UUID NOT NULL,
                               planned_start_date DATE,
                               planned_end_date DATE,
                               actual_start_date DATE,
                               actual_end_date DATE,
                               review_date DATE,
                               approval_date DATE,
                               approval_signature VARCHAR(255),
                               phase_status_id UUID NOT NULL,
                               progress DECIMAL(5,2) DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
                               FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
                               FOREIGN KEY (phase_status_id) REFERENCES phase_status(id) ON DELETE CASCADE
);

CREATE TABLE activity_status (
                                 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                 name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO activity_status (id, name) VALUES
                                           (uuid_generate_v4(), 'Planned'),
                                           (uuid_generate_v4(), 'In progress'),
                                           (uuid_generate_v4(), 'Done'),
                                           (uuid_generate_v4(), 'Paused');


CREATE TABLE activity (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          phase_id UUID NOT NULL,
                          activity_status_id UUID NOT NULL,
                          title VARCHAR(255) NOT NULL,
                          planned_start_date DATE,
                          planned_end_date DATE,
                          actual_start_date timestamp,
                          actual_end_date timestamp,
                          progress DECIMAL(5,2) DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
                          FOREIGN KEY (phase_id) REFERENCES project_phase(id) ON DELETE CASCADE,
                          FOREIGN KEY (activity_status_id) REFERENCES activity_status(id) ON DELETE CASCADE
);

CREATE TABLE milestone (
                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                           project_id UUID,
                           phase_id UUID,
                           activity_id UUID,
                           title VARCHAR(255) NOT NULL,
                           planned_date DATE,
                           actual_date DATE,
                           description TEXT,
                           FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
                           FOREIGN KEY (activity_id) REFERENCES activity(id) ON DELETE CASCADE,
                           FOREIGN KEY (phase_id) REFERENCES project_phase(id) ON DELETE CASCADE
);

-- Ressourcenmanagement
CREATE TABLE estimation (
                            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                            activity_id UUID NOT NULL,
                            estimation DECIMAL(5,2) DEFAULT 0 NOT NULL,
                            FOREIGN KEY (activity_id) REFERENCES activity(id) ON DELETE CASCADE
);



CREATE TABLE work_hours (
                            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                            activity_id UUID NOT NULL,
                            hours DECIMAL(5,2) NOT NULL DEFAULT 0 CHECK (hours >= 0),
                            date_worked_from TIMESTAMP NOT NULL,
                            date_worked_to TIMESTAMP NOT NULL,
                            assignment_id UUID,
                            FOREIGN KEY (activity_id) REFERENCES activity(id) ON DELETE CASCADE,
                            FOREIGN KEY (assignment_id) REFERENCES employee_pm_function(id) ON DELETE CASCADE,
                            CHECK (date_worked_to >= date_worked_from)
);

CREATE OR REPLACE FUNCTION calculate_hours()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.hours := EXTRACT(EPOCH FROM (NEW.date_worked_to - NEW.date_worked_from)) / 3600;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_calculate_hours
    BEFORE INSERT OR UPDATE ON work_hours
    FOR EACH ROW
EXECUTE FUNCTION calculate_hours();

-- Aufträge (Orders)
CREATE TABLE order_status (
                              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                              name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE orders (
                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                        project_id UUID NOT NULL,
                        supplier VARCHAR(255) NOT NULL,
                        order_date DATE NOT NULL,
                        delivery_date DATE,
                        status_id UUID NOT NULL,
                        total_cost DECIMAL(10,2) NOT NULL CHECK (total_cost >= 0),
                        FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
                        FOREIGN KEY (status_id) REFERENCES order_status(id) ON DELETE CASCADE
);

CREATE TABLE external_cost_type (
                                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE external_costs (
                                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                order_id UUID NOT NULL,
                                cost_type UUID NOT NULL,
                                actual_costs DECIMAL(10,2) CHECK (actual_costs >= 0),
                                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                                FOREIGN KEY (cost_type) REFERENCES external_cost_type(id) ON DELETE CASCADE
);

-- Einfügen der Werte in die Status-Tabellen
INSERT INTO order_status (id, name) VALUES
                                        (uuid_generate_v4(), 'Ordered'),
                                        (uuid_generate_v4(), 'Delivered'),
                                        (uuid_generate_v4(), 'Cancelled');
-- Dokumentenverwaltung
CREATE TABLE document (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          title VARCHAR(255) NOT NULL,
                          content TEXT NOT NULL
);

CREATE TABLE document_type (
                               id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                               name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE document_relation (
                                   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                   document_id UUID NOT NULL,
                                   related_id UUID NOT NULL,
                                   related_type_id UUID NOT NULL,
                                   FOREIGN KEY (document_id) REFERENCES document(id) ON DELETE CASCADE,
                                   FOREIGN KEY (related_type_id) REFERENCES document_type(id) ON DELETE CASCADE
);

INSERT INTO document_type (id, name) VALUES
                                         (uuid_generate_v4(), 'Activity Document'),
                                         (uuid_generate_v4(), 'Project Document'),
                                         (uuid_generate_v4(), 'Phase Document');

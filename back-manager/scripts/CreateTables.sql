-- Erstellt die Tabellen für das Projektmanagement-System in PostgreSQL basierend auf dem ER-Diagramm

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Benutzerverwaltung
CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE role (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE user_role (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    role_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_number VARCHAR(50) UNIQUE NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL
);

CREATE TABLE function (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    function_name VARCHAR(100) NOT NULL
);

CREATE TABLE employee_function (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL,
    function_id UUID NOT NULL,
    workload DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
    FOREIGN KEY (function_id) REFERENCES function(id) ON DELETE CASCADE
);

-- Projektverwaltung
CREATE TABLE project (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_reference VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    approval_date DATE,
    approval_signature VARCHAR(255),
    priority VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL,
    planned_start_date DATE,
    planned_end_date DATE,
    actual_start_date DATE,
    actual_end_date DATE,
    methodology VARCHAR(50) NOT NULL,
    progress DECIMAL(5,2) DEFAULT 0
);

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
    phase_status VARCHAR(50) NOT NULL,
    progress DECIMAL(5,2) DEFAULT 0,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

CREATE TABLE activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phase_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    planned_start_date DATE,
    planned_end_date DATE,
    actual_start_date DATE,
    actual_end_date DATE,
    budget DECIMAL(10,2),
    costs DECIMAL(10,2),
    progress DECIMAL(5,2) DEFAULT 0,
    FOREIGN KEY (phase_id) REFERENCES project_phase(id) ON DELETE CASCADE
);

CREATE TABLE milestone (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL,
    phase_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    planned_date DATE,
    actual_date DATE,
    description TEXT,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
    FOREIGN KEY (phase_id) REFERENCES project_phase(id) ON DELETE CASCADE
);

-- Ressourcenmanagement
CREATE TABLE work_hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    activity_id UUID NOT NULL,
    employee_id UUID NOT NULL,
    function_id UUID NOT NULL,
    planned_hours DECIMAL(10,2),
    actual_hours DECIMAL(10,2),
    FOREIGN KEY (activity_id) REFERENCES activity(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
    FOREIGN KEY (function_id) REFERENCES function(id) ON DELETE CASCADE
);

-- Aufträge
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL,
    supplier VARCHAR(255) NOT NULL,
    order_date DATE NOT NULL,
    delivery_date DATE,
    status VARCHAR(50) NOT NULL,
    total_cost DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);

CREATE TABLE external_costs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL,
    cost_type VARCHAR(100) NOT NULL,
    budgeted_costs DECIMAL(10,2),
    actual_costs DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Dokumentenmanagement
CREATE TABLE document (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE document_assignment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL,
    referenced_id UUID NOT NULL,
    reference_type VARCHAR(50) NOT NULL,
    FOREIGN KEY (document_id) REFERENCES document(id) ON DELETE CASCADE
);

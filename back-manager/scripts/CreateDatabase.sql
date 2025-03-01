-- Database: DB_ProjectManager

 DROP DATABASE "DB_ProjectManager";

CREATE DATABASE "DB_ProjectManager"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'German_Switzerland.1252'
    LC_CTYPE = 'German_Switzerland.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

ALTER ROLE teko_db_project_manager_administration_role IN DATABASE "DB_ProjectManager"
    SET application_name TO 'DB_ProjectManager';

GRANT ALL ON DATABASE "DB_ProjectManager" TO postgres;

GRANT TEMPORARY, CONNECT ON DATABASE "DB_ProjectManager" TO PUBLIC;

GRANT ALL ON DATABASE "DB_ProjectManager" TO project_manager_user;

import {
    IsString,
    IsOptional,
    IsArray,
    IsNumber,
    IsDate,
    IsEmail,
    IsUUID,
    ValidateNested,
    Min,
    Max, Length,
} from 'class-validator';
import {Type} from 'class-transformer';
import {ProjectStatusDto} from './project-status.dto';

// 1. Project Priority
export class CreateProjectPriorityDto {
    @IsString()
    @Length(1, 50, {
        message: 'The priority name must be between 1 and 50 characters long.',
    })
    name: string;
}



export class UpdateProjectPriorityDto {
    @IsOptional()
    @IsString()
    @Length(1, 50, {
        message: 'The priority name must be between 1 and 50 characters long.',
    })
    name?: string;
}

export class ProjectPriorityDto {
    @IsUUID()
    id: string;

    @IsString()
    @Length(1, 50, {
        message: 'The priority name must be between 1 and 50 characters.',
    })
    name: string; // Name der Priorität
}

export class CreateUserDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    employees?: string[];
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    employees?: string[];
}

// 4. PM Function
export class CreatePmFunctionDto {
    @IsString()
    pmFunctionName: string;
}

export class UpdatePmFunctionDto {
    @IsOptional()
    @IsString()
    pmFunctionName?: string;
}


export class UpdateEmployeePmFunctionDto {
    @IsOptional()
    @IsString()
    @IsUUID()
    employee?: string; // Muss eine gültige UUID sein

    @IsOptional()
    @IsString()
    @IsUUID()
    pmFunction?: string; // Muss eine gültige UUID sein

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    workload?: number;
}


// 6. Employee
export class CreateEmployeeDto {

    @IsString()
    lastName: string; // Nachname

    @IsString()
    firstName: string; // Vorname

    @IsOptional()
    @IsArray()
    @IsUUID(undefined, { each: true }) // Liste von UUIDs der mit dem Employee verknüpften Benutzer
    users?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true }) // Liste der Funktionen des Mitarbeiters
    employeePmFunctions?: string[];
}

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    lastName?: string; // Optional: Nachname

    @IsOptional()
    @IsString()
    firstName?: string; // Optional: Vorname

    @IsOptional()
    @IsArray()
    @IsUUID(undefined, { each: true }) // Optional: Liste mit UUIDs von Benutzern
    users?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true }) // Optional: Liste mit Rollen/Funktionen
    employeePmFunctions?: string[];
}

export class CreateEmployeePmFunctionDto {
    @IsUUID()
    employee_id: string;

    @IsUUID()
    pmFunction_id: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    workload: number;
}


class DocumentRelationDto {
    @IsUUID()
    id: string; // ID der Relation

    @IsUUID()
    related_id: string; // ID des z. B. referenzierten Projekts, Dokuments etc.

    @IsUUID()
    related_type_id: string; // ID des Dokumenttyps (z. B. "Projekt", "Milestone")
}

export class CreateDocumentDto {
    @IsString()
    title: string;

    @IsString()
    @Length(1, 5000, {
        message: 'The content must be between 1 and 5000 characters long.', // Beschränke Inhalt optional auf max. 5000 Zeichen
    })
    content: string;

    @IsOptional()
    @ValidateNested({ each: true }) // Validierung der verschachtelten Relationen
    @Type(() => DocumentRelationDto) // Transformation des JSON in eine Klasse
    relations?: DocumentRelationDto[]; // Liste von zugehörigen Relationen
}


export class UpdateDocumentDto {
    @IsString()
    @IsUUID()
    document_id: string; // ID des zu aktualisierenden Dokuments

    @IsString()
    @Length(1, 255, {
        message: 'The title must be between 1 and 255 characters long.',
    })
    title?: string;

    @IsString()
    @Length(1, 5000, {
        message: 'The content must be between 1 and 5000 characters long.', // Beschränke Inhalt optional auf max. 5000 Zeichen
    })
    content?: string; // Neuer Inhalt (optional)
}


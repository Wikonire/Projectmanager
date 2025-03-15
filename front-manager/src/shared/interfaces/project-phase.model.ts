import {Document} from './document.model';

export interface PhaseName {
  name?: string;
  id?: string;
}

export interface PhaseStatus {
  name?: string;
  id?: string;
}
export interface ProjectPhase {
  id: string;
  phaseName: PhaseName;
  progress: number;
  plannedStartDate: Date;
  plannedEndDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  phaseStatus: PhaseStatus;
  documents?: Document[];
}

import {Methodology} from './methodology.model';
import {ProjectPhase} from './project-phase.model';
import {ProjectStatus} from './status.model';
import {Priority} from './priority.model';
import {Document} from './document.model';

export interface Project {
  id: string;
  title: string;
  description: string;
  approvalDate?: Date;
  approvalSignature: string;
  progress: number;
  plannedStartDate: Date;
  plannedEndDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date ;
  createdAt: string;
  priority?: Priority;
  status?: ProjectStatus;
  methodology?: Methodology;
  projectPhases?: ProjectPhase[];
  documents?: Document[];
}

export interface ProjectOverviewData {
  id: string;
  title: string;
  description?: string;
  progress: Number;
  plannedStartDate?: Date;
  plannedEndDate?: Date;
  priority: {
    name?: string;
    style: { background: string; color: string; padding: string; borderRadius: string };
  };
}

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
  leader: {first_name: string, last_name:string}&string;
  progress: number;
  plannedStartDate: Date;
  plannedEndDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date ;
  externalCosts?: {actualCost: number, costType: { name: string}}[] ;
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

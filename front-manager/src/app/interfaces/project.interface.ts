import {IPhase} from './phase.interface';

export interface IProject {
  id: string;
  name: string;
  progress: number;
  status: string;
  methodology: string;
  approvalDate?: Date;
  approvalSignature?: string;
  plannedStartDate?: Date;
  plannedEndDate?: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  createdAt?: Date;
  priority: string;
  phases: IPhase[];
}

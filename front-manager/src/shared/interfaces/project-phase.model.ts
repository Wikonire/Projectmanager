export interface PhaseName {
  name: string;
  id: string;
}
export interface ProjectPhase {
  id: string;
  progress: number;
  plannedStartDate: string;
  plannedEndDate: string;
  actualStartDate: string | null;
  actualEndDate: string | null;
  phaseName: PhaseName;
  status: string;
}

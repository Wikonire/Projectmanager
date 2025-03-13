import { InjectionToken } from '@angular/core';
import { ProjectPhase } from '../interfaces/project-phase.model';

export const EDIT_PROJECT_DATA_TOKEN = new InjectionToken<ProjectPhase>('EDIT_PROJECT_DATA_TOKEN');

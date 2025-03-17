import {Role} from './role.model';

export interface User {
  id: string;
  name: string;
  email?: string;
  password?: string;
  roles: Role[];
}


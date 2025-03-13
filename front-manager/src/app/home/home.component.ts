import { Component } from '@angular/core';
import {OverviewAction} from '../../shared/interfaces/overview-action.model';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];

  displayedColumns: string[] = ['id', 'name', 'email'];

  actions: OverviewAction<User>[] = [
    { label: 'Bearbeiten', icon: 'edit', action: (selectedUsers: User[]) => console.log('Bearbeiten:', selectedUsers), showIfAllSelected: false, description: (count) => `Wählt die markiert${count===1?'e':'en'} ${count===1?"Benutzer*in":"Benutzer*innen" } zum bearbeiten aus` },
    { label: 'Löschen', icon: 'delete', action: (selectedUsers: User[]) => console.log('Löschen:', selectedUsers), showIfAllSelected: false },
    { label: 'Exportieren', icon: 'download', action: (selectedUsers: User[]) => console.log('Exportieren:', selectedUsers), showIfAllSelected: true }
  ];
}

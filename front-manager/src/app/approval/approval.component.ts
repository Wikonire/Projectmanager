import {Component, Input} from '@angular/core';
import {User} from '../../shared/interfaces/user.model';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.scss'
})
export class ApprovalComponent {

  @Input() user: User = {} as User;

}

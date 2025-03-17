import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/interfaces/user.model';
import {AuthService} from '../../shared/services/auth.service';
import {Observable} from 'rxjs';

/**
 * The ApprovalComponent is a UI component responsible for rendering approval features
 * within the application. It is an Angular component with selector `app-approval` that
 * uses a specific template and styles for display.
 *
 * Properties:
 * - `user`: An input property of type `User` that provides the necessary user data
 *   to be displayed or used within the component.
 *
 * This component relies on external inputs and Angular's component-based architecture
 * for integration and display within the application.
 */
@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.scss'
})
export class ApprovalComponent {

  @Input() user: User = {} as User;

}

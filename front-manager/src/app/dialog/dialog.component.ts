import {ChangeDetectionStrategy, Component, inject, Inject, Input, model} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  public readonly data = inject<{
    dialogContent: string,
    dialogTitle: string,
    dialogActionButton: {
      label: string,
      icon: string
    }
    dialogActionCancel: {
      label: string,
      icon: string
    }}>(MAT_DIALOG_DATA);
  readonly onClickActionButton = model(true);


  close():void {
    this.dialogRef.close();
  }
}

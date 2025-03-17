import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditDocumentComponent} from './edit-document.component';
import {MarkdownModule} from './markdown/markdown.module';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatCardActions} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';



@NgModule({
  declarations: [EditDocumentComponent],
    imports: [
        CommonModule,
        MarkdownModule,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatInput,
        FormsModule,
        MatCardActions,
        MatDialogClose,
        MatButton,
        CdkTextareaAutosize,
        MatDialogActions,
      MatFormFieldModule
    ], exports: [EditDocumentComponent]
})
export class EditDocumentModule { }

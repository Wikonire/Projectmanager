import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocumentListComponent} from './document-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {EditDocumentModule} from './document-dialog/edit-document.module';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MarkdownComponent} from './document-dialog/markdown/markdown.component';



@NgModule({
  declarations: [DocumentListComponent],
  imports: [
    CommonModule,
    EditDocumentModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [DocumentListComponent]
})
export class DocumentListModule { }

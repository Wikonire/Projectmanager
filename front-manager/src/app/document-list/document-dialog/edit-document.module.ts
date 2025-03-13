import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditDocumentComponent} from './edit-document.component';
import {MarkdownComponent} from './markdown/markdown.component';



@NgModule({
  declarations: [EditDocumentComponent],
  imports: [
    CommonModule
  ], exports: [EditDocumentComponent]
})
export class EditDocumentModule { }

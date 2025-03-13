import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EditDocumentComponent} from './document-dialog/edit-document.component';
import { Document } from '../../shared/interfaces/document.model';
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent implements OnInit, OnChanges {
  @Input() documents: Document[] = [];
  @Input() dialogWidth: string = '500px';
  displayedColumns: string[] = ['title','content', 'createdAt', 'actions'];

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.documents = changes['documents']?.currentValue;
    this.dialogWidth = changes['dialogWidth']?.currentValue;
  }
  openDocument(document: Document): void {
    this.dialog.open(EditDocumentComponent, {
      width: this.dialogWidth,
      data: document
    });
  }
}

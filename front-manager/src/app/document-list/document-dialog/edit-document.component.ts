import {AfterViewInit, Component, Inject, inject, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Document} from '../../../shared/interfaces/document.model'
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {DialogRef} from '@angular/cdk/dialog';
import {DocumentsService} from '../../../shared/services/documents.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './edit-document.component.html',
  styleUrl: './edit-document.component.scss'
})
export class EditDocumentComponent implements OnChanges, OnInit {
  dialogRef = inject<DialogRef<Document>>(DialogRef<Document>);
  isInEditMode: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Document,
    public documentService: DocumentsService,
    public readonly router: Router,
    public snackbarService: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.documentService.findDocument(this.data.id).subscribe(
      (document: Document) => {
        this.data = document;
        console.log(this.data)
      }
    )
  }

  ngOnChanges(): void {
    this.isInEditMode = this.data.id != null;
    console.log('EditDocumentComponent', this.data);
    this.autosize.resizeToFitContent(true);
    this.documentService.findDocument(this.data.id).subscribe(
      (document: Document) => {
        this.data = document;
      }
    )
  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  saveDocument(document:Document):void {
    this.documentService.updateDocument(document.id, document).subscribe(
      {
        next: (updated) => {
          this.data = updated
          this.snackbarService.showSuccess('gespeichert');
          this.isInEditMode = false;
        },
        error: (error) => {
          this.snackbarService.showError(error, 'Speichern');
        }}
    );


  }
}

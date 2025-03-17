import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Document} from '../interfaces/document.model'
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private apiUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) { }

  /** Document aktualisieren **/
  updateDocument(docId: string, document:Document): Observable<Document> {
    const {id, ...restDocument} = document;
    return this.http.put<Document>(`${this.apiUrl}/${docId}`, restDocument);

  }

  findDocument(docId: string): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/${docId}`);
  }
}

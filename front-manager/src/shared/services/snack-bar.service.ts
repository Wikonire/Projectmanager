import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  showError(error: any, action: 'Löschen'|'Speichern'|'Laden'):void {
    console.error('Fehler beim Löschen der Projekte:', error);
    this.snackBar.open(
      `Fehler beim ${action} der Projekte. Bitte versuche es erneut.`,
      'Schliessen',
      {duration: 10000, panelClass: ['snackbar-error']}
    );
  }

  showSuccess(action:'gelöscht'|'gespeichert'):void {
    this.snackBar.open(
      `Das Projekt wurde erfolgreich ${action}.`,
      'Schliessen',
      {duration: 10000} // Snackbar verschwindet nach 10 Sekunden
    );
  }
}

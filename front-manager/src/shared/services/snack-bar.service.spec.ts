import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let snackBarMock: { open: jest.Mock };

  beforeEach(() => {
    snackBarMock = { open: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        SnackBarService,
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    });
    service = TestBed.inject(SnackBarService);
  });

  describe('showError', () => {
    it('should log the error and show an error snackbar for deletion', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const error = new Error('Test error');
      service.showError(error, 'Löschen');

      expect(consoleSpy).toHaveBeenCalledWith('Fehler beim Löschen der Projekte:', error);
      expect(snackBarMock.open).toHaveBeenCalledWith(
        'Fehler beim Löschen der Projekte. Bitte versuche es erneut.',
        'Schliessen',
        { duration: 10000, panelClass: ['snackbar-error'] }
      );
      consoleSpy.mockRestore();
    });

    it('should show an error snackbar for saving', () => {
      service.showError('Server not responding', 'Speichern');

      expect(snackBarMock.open).toHaveBeenCalledWith(
        'Fehler beim Speichern der Projekte. Bitte versuche es erneut.',
        'Schliessen',
        { duration: 10000, panelClass: ['snackbar-error'] }
      );
    });

    it('should show an error snackbar for loading', () => {
      service.showError('Timeout', 'Laden');

      expect(snackBarMock.open).toHaveBeenCalledWith(
        'Fehler beim Laden der Projekte. Bitte versuche es erneut.',
        'Schliessen',
        { duration: 10000, panelClass: ['snackbar-error'] }
      );
    });
  });

  describe('showSuccess', () => {
    it('should show a success snackbar for deletion', () => {
      service.showSuccess('gelöscht');

      expect(snackBarMock.open).toHaveBeenCalledWith(
        'Das Projekt wurde erfolgreich gelöscht.',
        'Schliessen',
        { duration: 10000 }
      );
    });

    it('should show a success snackbar for saving', () => {
      service.showSuccess('gespeichert');

      expect(snackBarMock.open).toHaveBeenCalledWith(
        'Das Projekt wurde erfolgreich gespeichert.',
        'Schliessen',
        { duration: 10000 }
      );
    });
  });
});

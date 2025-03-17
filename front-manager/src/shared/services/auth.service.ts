import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {User} from '../interfaces/user.model';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from '../interfaces/role.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `http://localhost:3000/auth`;
  private tokenKey = 'authToken';
  private userSubject = new BehaviorSubject<User|undefined>(undefined);
  user$:Observable<User|undefined> = this.userSubject.asObservable();

  constructor(private readonly http: HttpClient, private readonly router: Router) {
    this.loadUserIdFromStorage();
  }

  /**
   * Login-Methode: Sendet die Anmeldedaten an das Backend und speichert das Token & User-Daten.
   * @param credentials { username: string, password: string }
   * @returns Observable mit Login-Antwort
   */
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response) {
          this.storeUser(response);
        }
      })
    );
  }

  private storeUser(response: { access_token: string }): void {
    const decoded = jwtDecode<JwtPayload>(response.access_token) as { username: string, sub: string, exp: number, roles: Role[] };
    localStorage.setItem(this.tokenKey, response.access_token);

    const user: User = {
      id: decoded.sub,
      name: decoded.username,
      roles: decoded.roles
    };
    this.userSubject.next(user);
  }

  /**
   * Logout-Methode: Entfernt Token und User-Daten und setzt das User-Observable auf `null`.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(undefined);
    this.router.navigate(['/login']);
  }

  /**
   * Prüft, ob ein User eingeloggt ist.
   * @returns `true`, wenn ein Token vorhanden ist, sonst `false`.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Lädt den Benutzer aus `localStorage` und setzt ihn im `BehaviorSubject`.
   */
  private loadUserIdFromStorage(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return; // Kein Token im Speicher
    }

    try {
      this.storeUser({ access_token: token });
    } catch (error) {
      console.error('Invalid token provided in localStorage:', error);
      // Entfernt ungültige Token
      localStorage.removeItem(this.tokenKey);
    }
  }

  /**
   * Gibt das gespeicherte Token zurück.
   * @returns JWT-Token oder `null`, wenn kein Token vorhanden ist.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

}

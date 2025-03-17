import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard is used to protect routes by determining whether the user is authenticated.
 * It implements the CanActivate interface to decide if a route can be activated.
 *
 * The guard checks the current authentication state using the AuthService.
 * If the user is authenticated, access to the route is granted.
 * Otherwise, the guard will redirect the user to the login page and include the target URL in query parameters.
 *
 * This class should be provided at the root level for application-wide usage.
 *
 * Dependencies:
 * - AuthService: A service responsible for providing authentication state information.
 * - Router: Angular Router used for navigation and redirection.
 *
 * Methods:
 * - canActivate: Determines if the route can be activated. Returns true if the user is authenticated or a UrlTree redirecting to the login page otherwise.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true; // Zugriff erlaubt
    }

    // Falls nicht eingeloggt, auf Login-Seite umleiten
    return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
}

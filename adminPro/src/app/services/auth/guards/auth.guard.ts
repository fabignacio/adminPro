import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

/* SERVICIO */
import { LoginService } from '../login/login.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private token: LoginService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.token.validarToken()
      .pipe(
        tap(isAuth => { if (!isAuth) { this.router.navigateByUrl('/login'); }; })
      );
  };

};

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

/* SERVICIO */
import { UsuarioService } from '../usuario/usuario.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private token: UsuarioService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.token.validarToken()
      .pipe(
        tap(isAuth => { if (!isAuth) { this.router.navigateByUrl('/login'); }; })
      );
  };

};

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

/* SERVICIO */
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private token: UsuarioService,
    private router: Router
  ) { }

  canLoad(): Observable<boolean> {
    return this.token.validarToken()
      .pipe(
        tap(isAuth => { if (!isAuth) { this.router.navigateByUrl('/login'); }; })
      );
  };

  canActivate(): Observable<boolean> {
    return this.token.validarToken()
      .pipe(
        tap(isAuth => { if (!isAuth) { this.router.navigateByUrl('/login'); }; })
      );
  };

};

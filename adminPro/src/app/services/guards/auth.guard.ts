import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

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

  canActivate() {
    return this.token.validarToken()
      .pipe(
        tap(isAuth => { if (!isAuth) { this.router.navigateByUrl('/login'); }; })
      );
  };

};

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/*SERVICIOS */
import { UsuarioService } from './../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  canActivate(): boolean {

    if (this.usuarioService.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.router.navigateByUrl(`/dashboard`);
      return false;
    }
  }

}

import { Component } from '@angular/core';

/* SERVICIOS */
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { UsuarioService } from './../../services/auth/usuario/usuario.service';

/* MODELO */
import { Usuario } from './../../models/usuarios/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public usuario: Usuario;

  constructor(
    public sideBarSevice: SidebarService,
    private loginS: UsuarioService
  ) {
    this.usuario = loginS.usuario;
  };

};

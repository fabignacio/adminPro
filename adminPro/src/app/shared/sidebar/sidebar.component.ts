import { Component } from '@angular/core';

/* SERVICIOS */
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { LoginService } from './../../services/auth/login/login.service';

/* MODELO */
import { Usuario } from './../../models/usuarios/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public menuItems: any[] = [];
  public usuario: Usuario;

  constructor(
    private sideBarSevice: SidebarService,
    private loginS: LoginService
  ) {
    this.menuItems = sideBarSevice.menu;
    this.usuario = loginS.usuario;
  };

};

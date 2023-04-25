import { Component } from '@angular/core';

/* GOOGLE */
declare const google: any;

/* SERVICIO */
import { UsuarioService } from '../../services/auth/usuario/usuario.service';

/* MODELO */
import { Usuario } from './../../models/usuarios/usuario.model';

/* VARIABLES DE ENTORNO */
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {


  private readonly _client_id: string = environment.CLIENT_ID;
  public usuario: Usuario;

  constructor(private loginS: UsuarioService) {
    this.usuario = loginS.usuario;
  };

  logout() {

    google.accounts.id.initialize({
      client_id: this._client_id
    });

    this.loginS.logout(google);
  };

};

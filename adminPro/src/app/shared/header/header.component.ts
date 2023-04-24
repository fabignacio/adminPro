import { Component } from '@angular/core';

/* GOOGLE */
declare const google: any;

/* SERVICIO */
import { LoginService } from '../../services/auth/login/login.service';

/* VARIABLES DE ENTORNO */
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(private loginService: LoginService) { }

  private readonly _client_id: string = environment.CLIENT_ID;

  logout() {

    google.accounts.id.initialize({
      client_id: this._client_id
    });

    this.loginService.logout(google);
  };

};

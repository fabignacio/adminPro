import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

/* INTERFACE */
import { RegisterForm } from '../../interfaces/usuario/register-form.interface';
import { LoginForm } from '../../interfaces/usuario/login-form.interface';

/* VARIABLES DE ENTORNO */
import { environment } from './../../../environments/environment';

const url: string = `${environment.URL_BACKEND}/usuarios`
const urlLogin: string = `${environment.URL_BACKEND}/login`

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  crearUsuario = (formData: RegisterForm) => {
    return this.http.post(url, formData)
      .pipe((
        tap((resp: any) => { sessionStorage.setItem('token', resp.token); }) /* GUARDAMOS EL TOKEN EN EL SESSION STORAGE */
      ));
  };

  login = (formData: LoginForm) => {
    return this.http.post(urlLogin, formData)
      .pipe((
        tap((resp: any) => { sessionStorage.setItem('token', resp.token); })
      ));
  };

};

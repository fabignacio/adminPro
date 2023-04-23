import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* INTERFACE */
import { RegisterForm } from '../../interfaces/usuario/register-form.interface';

/* VARIABLES DE ENTORNO */
import { environment } from './../../../environments/environment';

const url: string = `${environment.URL_BACKEND}/usuarios`

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  crearUsuario = (formData: RegisterForm) => {
    console.log(url);
    return this.http.post(url, formData);
  };

};

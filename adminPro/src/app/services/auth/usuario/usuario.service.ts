import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

/*INTERFACE */
import { LoginForm } from '../../../interfaces/usuario/login-form.interface';
import { RegisterForm } from './../../../interfaces/usuario/register-form.interface';
import { CargarUsuario } from './../../../interfaces/usuario/cargar-usuario.interface';

/* MODELO */
import { Usuario } from '../../../models/usuarios/usuario.model';

/* ENVIROMENT */
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

const baseUrl: string = environment.URL_BACKEND_LOGIN;
const baseUrlU: string = environment.URL_BACKEND_USUARIO;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { };

  get token(): string {
    return sessionStorage.getItem('token') || '';
  };

  get uid(): string {
    return this.usuario.uid || '';
  };

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  };

  googleInit(google?: any) {
    this.logout(google)
  };

  logout(google: any) {
    sessionStorage.removeItem('token');

    google.accounts.id.revoke('fa.alarconm@duocuc.cl', (done: any) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  };

  login = (formData: LoginForm) => {
    return this.http.post(baseUrl, formData)
      .pipe((
        tap((resp: any) => { sessionStorage.setItem('token', resp.token); })
      ));
  };

  loginGoogle = (token: string) => {
    return this.http.post(`${baseUrl}/google`, { token })
      .pipe(
        tap((resp: any) => { sessionStorage.setItem('token', resp.token); })
      );
  };

  validarToken = (): Observable<boolean> => {

    return this.http.get(`${baseUrl}/renew`, {
      headers: {
        'x-token': this.token
      }
    })
      .pipe(
        map((resp: any) => {
          const { nombre, email, estado, img = '', google, role, uid } = resp.usuario

          this.usuario = new Usuario(nombre, email, estado, '', img, google, role, uid);
          sessionStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((err: any) => of(false))
      );
  };

  crearUsuario = (formData: RegisterForm) => {
    return this.http.post(baseUrlU, formData)
      .pipe((
        tap((resp: any) => { sessionStorage.setItem('token', resp.token); }) /* GUARDAMOS EL TOKEN EN EL SESSION STORAGE */
      ));
  };

  actualizarPerfil = (data: { email: string, nombre: string, role: string }) => {
    return this.http.put(`${baseUrlU}/${this.uid}`, data, this.headers);
  };

  cargarUsuario = (desde: number = 0) => {

    const url = `${baseUrlU}/activos/?desde=${desde}`

    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(user => new Usuario(
            user.nombre, user.email, user.estado, '', user.img, user.google, user.role, user.uid
          ));

          return {
            total: resp.totalActivos,
            usuarios
          };
        })
      )

  };

  eliminarUsuario = (uid: string) => {

    const url = `${baseUrlU}/${uid}`;
    return this.http.delete(url, this.headers);

  };

  actualizarRole = (usuario: Usuario) => {
    return this.http.put(`${baseUrlU}/${usuario.uid}`, usuario, this.headers);
  };

};

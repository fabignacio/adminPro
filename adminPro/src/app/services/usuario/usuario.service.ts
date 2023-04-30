import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

/*INTERFACE */
import { LoginForm } from '../../interfaces/usuario/login-form.interface';
import { RegisterForm } from '../../interfaces/usuario/register-form.interface';
import { CargarUsuario } from '../../interfaces/usuario/cargar-usuario.interface';

/* MODELO */
import { Usuario } from '../../models/usuarios/usuario.model';

/* ENVIROMENT */
import { environment } from '../../../environments/environment';
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

  /* GETTERS */

  get token(): string {
    return localStorage.getItem('token') || '';
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

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  };

  /* FIN GETTERS */

  guardarLocalStorage = (token: string, menu: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  };

  /* METODOS DE GOOGLE */

  googleInit(google?: any) {
    this.logout(google)
  };

  logout(google: any) {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    google.accounts.id.revoke('fa.alarconm@duocuc.cl', (done: any) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  };

  loginGoogle = (token: string) => {
    return this.http.post(`${baseUrl}/google`, { token })
      .pipe(
        tap((resp: any) => { this.guardarLocalStorage(resp.token, resp.menu) })
      );
  };

  /* FIN METODOS DE GOOGLE */

  login = (formData: LoginForm) => {
    return this.http.post(baseUrl, formData)
      .pipe((
        tap((resp: any) => { this.guardarLocalStorage(resp.token, resp.menu) })
      ));
  };

  validarToken = (): Observable<boolean> => {

    return this.http.get(`${baseUrl}/renew`, this.headers)
      .pipe(
        map((resp: any) => {
          const { nombre, email, estado, img = '', google, role, uid } = resp.usuario

          this.usuario = new Usuario(nombre, email, estado, '', img, google, role, uid);
          this.guardarLocalStorage(resp.token, resp.menu);
          return true;
        }),
        catchError((err: any) => of(false))
      );
  };

  /* METODOS DE USUARIO */

  crearUsuario = (formData: RegisterForm) => {
    return this.http.post(baseUrlU, formData)
      .pipe((
        tap((resp: any) => { this.guardarLocalStorage(resp.token, resp.menu); }) /* GUARDAMOS EL TOKEN EN EL LOCAL STORAGE */

      ));
  };

  actualizarPerfil = (data: { email: string, nombre: string }) => {
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

          return { total: resp.totalActivos, usuarios };
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

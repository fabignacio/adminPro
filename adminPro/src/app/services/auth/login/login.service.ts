import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

/*INTERFACE */
import { LoginForm } from '../../../interfaces/usuario/login-form.interface';

/* MODELO */
import { Usuario } from './../../../models/usuarios/usuario.model';

/* ENVIROMENT */
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

const baseUrl: string = `${environment.URL_BACKEND_LOGIN}`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { };

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

    const token = sessionStorage.getItem('token') || '';

    return this.http.get(`${baseUrl}/renew`, {
      headers: {
        'x-token': token
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

};

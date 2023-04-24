import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

/*INTERFACE */
import { LoginForm } from '../../../interfaces/usuario/login-form.interface';

/* ENVIROMENT */
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

const baseUrl: string = `${environment.URL_BACKEND_LOGIN}`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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
        tap((resp: any) => { sessionStorage.setItem('token', resp.token); }),
        map(resp => true),
        catchError((err: any) => of(false))
      );
  };

};

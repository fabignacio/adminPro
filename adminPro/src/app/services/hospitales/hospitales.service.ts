import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

/* VARIABLES DE ENTORNO */
import { environment } from '../../../environments/environment';

/* MODELO */
import { Hospital } from '../../models/hospital/hospital.model';

const baseUrl: string = environment.URL_BACKEND_HOSPITALES;

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(private http: HttpClient) { };

  get token(): string {
    return sessionStorage.getItem('token') || '';
  };

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  };

  cargarHospitales = () => {

    const url = `${baseUrl}/activos/`

    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales)
      )

  };

}

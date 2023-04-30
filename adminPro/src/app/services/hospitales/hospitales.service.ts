import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

/* VARIABLES DE ENTORNO */
import { environment } from '../../../environments/environment';

/* MODELO */
import { Hospital } from '../../models/hospital/hospital.model';

/* INTERFACE */
import { CargarHospitales } from './../../interfaces/hospital/cargar-hospitales.interface';

const baseUrl: string = environment.URL_BACKEND_HOSPITALES;

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(private http: HttpClient) { };

  get token(): string {
    return localStorage.getItem('token') || '';
  };

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  };

  cargarHospitales = (desde: number = 0) => {

    const url: string = `${baseUrl}/activos/?desde=${desde}`
    return this.http.get<CargarHospitales>(url, this.headers)
      .pipe(
        map(resp => {
          const hospitales = resp.hospitales.map(hospital => new Hospital(
            hospital.nombre, hospital.estado, hospital.uid, hospital.usuario, hospital.img
          ));

          return { total: resp.totalActivos, hospitales };
        })
      );
  };

  cargasHospitalesResumido = () => {
    const url: string = `${baseUrl}/activos/todos`;
    return this.http.get<CargarHospitales>(url, this.headers);
  };

  crearHospital = (nombre: string) => {
    const url = `${baseUrl}/`
    return this.http.post(url, { nombre }, this.headers);
  };

  actualizarHospital = (uid: string, nombre: string) => {
    const url = `${baseUrl}/${uid}`
    return this.http.put(url, { nombre }, this.headers);
  };

  eliminarHospital = (uid: string) => {
    const url = `${baseUrl}/${uid}`
    return this.http.delete(url, this.headers);
  };


}

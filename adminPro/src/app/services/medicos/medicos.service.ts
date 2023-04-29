import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

/* VARIABLES DE ENTORNO */
import { environment } from '../../../environments/environment';

/* INTERFACE */
import { CargarMedicos } from '../../interfaces/medicos/cargar-medico.interface';

/* MODELO */
import { Medico } from '../../models/medico/medico.model';

const baseUrl: string = environment.URL_BACKEND_MEDICOS;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

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

  cargarMedicos = (desde: number = 0) => {

    const url = `${baseUrl}/activos/?desde=${desde}`
    return this.http.get<CargarMedicos>(url, this.headers)
      .pipe(
        map(resp => {
          const medicos = resp.medicos.map(medico => new Medico(
            medico.nombre, medico.estado, medico.uid, medico.usuario, medico.hospital, medico.img
          ));

          return { total: resp.totalActivos, medicos };
        })
      );
  };

  crearMedico = (medico: Medico) => {
    const url = `${baseUrl}`;
    return this.http.post(url, medico, this.headers);
  };

  actualizarMedico = (medico: Medico) => {
    const url = `${baseUrl}/${medico.uid}`;
    return this.http.put(url, medico, this.headers);
  };

  eliminarMedico = (uid: string) => {
    const url = `${baseUrl}/${uid}`
    return this.http.delete(url, this.headers);
  };

};

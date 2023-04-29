import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

/* VARIABLES DE ENTORNO */
import { environment } from './../../../environments/environment';

/* MODELOS */
import { Usuario } from '../../models/usuarios/usuario.model';
import { Hospital } from '../../models/hospital/hospital.model';
import { Medico } from './../../models/medico/medico.model';

const Baseurl: string = environment.URL_BACKEND_BUSQUEDA;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient) { }

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

  private transformarUsuarios(resultados: any[]): Usuario[] {


    return resultados.map(user =>
      new Usuario(user.nombre, user.email, user.estado, '',
        user.img, user.google, user.role, user.uid
      ));
  };

  private transformarHospitales(resultados: any[]): Hospital[] {
    return resultados.map(hospital => new Hospital(
      hospital.nombre, hospital.estado, hospital.uid, hospital.usuario, hospital.img));
  };

  private transformarMedicos(resultados: any[]): Medico[] {
    return resultados.map(medico => new Medico(
      medico.nombre, medico.estado, medico.uid, medico.usuario, medico.hospital, medico.img));
  }

  buscar =

    (
      tipo: 'usuarios' | 'medicos' | 'hospitales',
      terminoBusqueda: string = ''
    ) => {

      const url: string = `${Baseurl}/coleccion/${tipo}/${terminoBusqueda}`

      return this.http.get<any[]>(url, this.headers)
        .pipe(
          map((resp: any) => {
            switch (tipo) {
              case 'usuarios':
                return this.transformarUsuarios(resp.resultado);

              case 'hospitales':
                return this.transformarHospitales(resp.resultado);

              case 'medicos':
                return this.transformarMedicos(resp.resultado);

              default:
                return [];
            }
          })
        );

    };
};

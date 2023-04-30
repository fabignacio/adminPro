import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

const baseUrl: string = environment.URL_BACKEND_IMG;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { };

  async actualizaImagen(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {

    try {
      const url = `${baseUrl}/${tipo}/${id}`;
      const formData = new FormData();

      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'post',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if (data.ok) {
        return data.nombreArchivo;
      } else {
        return false;
      };

    } catch (error) {
      console.log(error);
      return false;
    };

  };
};

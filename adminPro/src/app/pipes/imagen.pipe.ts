import { Pipe, PipeTransform } from '@angular/core';

import { environment } from './../../environments/environment';

const _baseUrl: string = environment.URL_BACKEND_IMG;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'hospitales' | 'medicos'): unknown {

    let urlImagen: string = ''

    if (!img) {
      urlImagen = `${_baseUrl}/${tipo}/no-image`;
    } else if (img) {

      if (img?.includes('https')) { return urlImagen; };

      urlImagen = `${_baseUrl}/${tipo}/${img}`;
    };

    return urlImagen;
  };

};

import { EventEmitter, Injectable } from '@angular/core';

/* VARIABLES DE ENTORNO */
import { environment } from './../../../environments/environment';

const baseUrl: string = environment.URL_BACKEND_IMG;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales' = 'usuarios';
  public id: string = '';
  public img: string = '';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>()

  get ocultarModal() {
    return this._ocultarModal;
  };

  abrirModal = (
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-image'
  ) => {

    this._ocultarModal = false;

    this.tipo = tipo;
    this.id = id;


    if (img) {
      if (img.includes('https')) {
        this.img = img
      } else {
        this.img = `${baseUrl}/${tipo}/${img}`;
      };
    } else {
      this.img = `${baseUrl}/${tipo}/no-image`;
    }

  };

  cerrarModal = () => {
    this._ocultarModal = true;
  };

  constructor() { }


};

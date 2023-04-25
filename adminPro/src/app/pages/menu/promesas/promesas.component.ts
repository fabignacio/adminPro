import { Component } from '@angular/core';

/*VARIABLES DE ENTORNO */
import { environment } from './../../../../environments/environment';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent {

  public url: string = environment.URL_API_PRUEBA;

  constructor() { }

  ngOnInit(): void {

    /* 
      const promesa = new Promise((resolve, reject) => {
  
        if (false) {
          resolve('Hola Mundo');
        } else {
          reject('Algo salio mal');
        }
  
      });
  
      promesa.then((mensaje) => {
        console.log(mensaje);
      })
        .catch(error => console.log('Error en la promesa', ' ', error));
  
      console.log('Fin del Init');
    */
    this.getUsuarios()
      .then(usuarios => console.log(usuarios));
  };

  getUsuarios = () => {

    const promesa = new Promise(resolve => {
      fetch(this.url)
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    });

    return promesa;
  };

};

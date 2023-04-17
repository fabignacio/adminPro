import { Component } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {



    const obs$ = new Observable(observer => {

      let i = -1;

      const intervalo = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 5) {
          clearInterval(intervalo);
          observer.complete();
        };

        if (i === 2) {
          i = 0;
          observer.error('i llego al valor de 2');
        };

      }, 1000)

    });

    obs$
      .pipe(
        retry(1) //Entre parentesis va la cantidad de veces que quiero que lo vuelva a intentar
      )
      .subscribe(
        {
          next: (valor) => console.log('Subs', valor),
          error: (err) => console.warn(err),
          complete() {
            console.info('Obs terminado') //Aqui se manda un valor cuando se completa el observable
          },
        }
      );

  };

  ngOnInit(): void {

  }

}

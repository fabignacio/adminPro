import { Component } from '@angular/core';
import {
  Observable,
  retry,
  interval,
  take,
  map,
  filter,
  Subscription
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable()
    //   .pipe(
    //     retry(1) //Entre parentesis va la cantidad de veces que quiero que lo vuelva a intentar
    //   )
    //   .subscribe(
    //     {
    //       next: (valor) => console.log('Subs', valor),
    //       error: (err) => console.warn(err),
    //       complete() {
    //         console.info('Obs terminado') //Aqui se manda un valor cuando se completa el observable
    //       },
    //     }
    //   );

    this.intervalSubs = this.retornaIntervalo().subscribe(
      {
        next: console.log
      }
    );
  };

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo = (): Observable<number> => {

    return interval(100)
      .pipe(
        map(valor => valor + 1),
        filter(valor => (valor % 2 == 0 ? true : false)),
        //take(10),
      );
  };

  retornaObservable = (): Observable<number> => {
    let i = -1;

    return new Observable<number>(observer => {

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
  };

}

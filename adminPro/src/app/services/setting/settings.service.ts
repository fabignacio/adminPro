import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _linkTheme = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css'
    this._linkTheme?.setAttribute('href', url);
  };

  /* CAMBIA EL TEMA */
  changeTheme = (tema: string) => {

    const url = `./assets/css/colors/${tema}.css`

    this._linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    /*PARA COLOCAR EL CHECK */
    this.checkCurrentTheme();
  };

  checkCurrentTheme = () => {

    const links = document.querySelectorAll('.selector');

    links.forEach((element) => {

      element.classList.remove('working');

      /* SE OBTIENE EL TEMA DEL BOTON Y DEL URL */
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this._linkTheme?.getAttribute('href');

      /* SE COMPARAN AMBOS PARA ESTABLECER A CUAL AGREGAR LA CLASE WORKING */
      if (btnThemeUrl === currentTheme) {
        element.classList.add('working')
      };

    });
  };

}

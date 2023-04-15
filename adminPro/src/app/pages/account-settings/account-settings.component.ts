import { Component } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent {

  linkTheme = document.querySelector('#theme');

  changeTheme = (tema: string) => {

    const url = `./assets/css/colors/${tema}.css`

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
  };

}

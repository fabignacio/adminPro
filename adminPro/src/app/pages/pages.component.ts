import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent {

  linkTheme = document.querySelector('#theme');
  defaultTheme: string = './assets/css/colors/default.css';

  ngOnInit() {

    const url = localStorage.getItem('theme');

    url ? this.linkTheme?.setAttribute('href', url) : this.linkTheme?.setAttribute('href', this.defaultTheme);
  }

}

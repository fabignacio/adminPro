import { Component } from '@angular/core';

declare function customInitFunctions(): void;

/*SERVICIO */
import { SettingsService } from '../services/setting/settings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent {

  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}

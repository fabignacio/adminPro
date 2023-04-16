import { Component } from '@angular/core';

/*SERVICIO */
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent {

  constructor(private settingService: SettingsService) { }

}

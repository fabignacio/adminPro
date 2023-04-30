import { Component } from '@angular/core';

declare function customInitFunctions(): void;

/*SERVICIO */
import { SettingsService } from '../services/setting/settings.service';
import { SidebarService } from '../services/sidebar/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent {

  constructor(
    private settingService: SettingsService,
    private sideBarService: SidebarService
  ) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sideBarService.cargarMenu();
  }

};


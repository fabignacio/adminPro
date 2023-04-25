import { Component } from '@angular/core';

/*SERVICIO */
import { SettingsService } from '../../../services/setting/settings.service';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent {

  constructor(private settingService: SettingsService) { }

  ngOnInit() { this.settingService.checkCurrentTheme(); };

  changeTheme = (tema: string) => { this.settingService.changeTheme(tema); };

};

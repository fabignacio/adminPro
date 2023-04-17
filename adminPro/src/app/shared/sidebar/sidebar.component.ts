import { Component } from '@angular/core';

/*SERVICIO */
import { SidebarService } from './../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[] = [];

  constructor(private sideBarSevice: SidebarService) { this.menuItems = sideBarSevice.menu; }

}

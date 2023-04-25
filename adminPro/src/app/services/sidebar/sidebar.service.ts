import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Menu',
      icono: 'mdi mdi-gauge',
      subMenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Graficas', url: 'grafica1' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'Rxjs', url: 'rxjs' },
      ]
    },

    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      subMenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Hospitales', url: 'hospitales' },
        { titulo: 'Medicos', url: 'medicos' },
      ]
    }
  ];
  constructor() { }
}

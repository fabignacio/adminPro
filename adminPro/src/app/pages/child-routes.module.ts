import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* GUARDS */
import { AdminGuard } from '../services/guards/admin.guard';

/* COMPONENTES DASHBOARD */
import { AccountSettingsComponent } from './menu/account-settings/account-settings.component';
import { BusquedaComponent } from './menu/busqueda/busqueda.component';
import { DashboardComponent } from './menu/dashboard/dashboard.component';
import { Grafica1Component } from './menu/grafica1/grafica1.component';
import { ProgressComponent } from './menu/progress/progress.component';
import { PromesasComponent } from './menu/promesas/promesas.component';
import { RxjsComponent } from './menu/rxjs/rxjs.component';

/* COMPONENTES MANTENIMIENTO */
import { UsuariosComponent } from './mantenimiento/usuario/usuarios/usuarios.component';
import { PerfilComponent } from './mantenimiento/usuario/perfil/perfil.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medico/medicos.component';
import { ActualizarComponent } from './mantenimiento/medico/actualizar/actualizar.component';



const childRoutes: Routes = [
  /* MENU DASHBOARD */
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Búsquedas' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  /* MANTENIMIENTO */
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
  { path: 'medico/:id', component: ActualizarComponent, data: { titulo: 'Editar Medico' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },

  /* RUTAS DEL ADMIN_ROLE */
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    component: UsuariosComponent,
    data: { titulo: 'Mantenimiento de Usuarios' }
  },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }

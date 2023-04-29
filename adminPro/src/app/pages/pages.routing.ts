import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/*SERVICIO GUARD */
import { AuthGuard } from '../services/auth/guards/auth.guard';

/* COMPONENTES DASHBOARD */
import { AccountSettingsComponent } from './menu/account-settings/account-settings.component';
import { DashboardComponent } from './menu/dashboard/dashboard.component';
import { Grafica1Component } from './menu/grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './menu/progress/progress.component';
import { PromesasComponent } from './menu/promesas/promesas.component';
import { RxjsComponent } from './menu/rxjs/rxjs.component';

/* COMPONENTES MANTENIMIENTO */
import { UsuariosComponent } from './mantenimiento/usuario/usuarios/usuarios.component';
import { PerfilComponent } from './mantenimiento/usuario/perfil/perfil.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medico/medicos.component';
import { ActualizarComponent } from './mantenimiento/medico/actualizar/actualizar.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [

            /* MENU DASHBOARD */
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

            /* MANTENIMIENTO */
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' } },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
            { path: 'medico/:id', component: ActualizarComponent, data: { titulo: 'Editar Medico' } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
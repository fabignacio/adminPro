import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* MODULOS PERSONALIZADOS */
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

/* COMPONENTES */
import { AccountSettingsComponent } from './menu/account-settings/account-settings.component';
import { DashboardComponent } from './menu/dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './menu/grafica1/grafica1.component';
import { ProgressComponent } from './menu/progress/progress.component';
import { PromesasComponent } from './menu/promesas/promesas.component';
import { RxjsComponent } from './menu/rxjs/rxjs.component';
import { PerfilComponent } from './mantenimiento/usuario/perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuario/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medico/medicos.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PagesComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent
  ],
  exports: [
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class PagesModule { }

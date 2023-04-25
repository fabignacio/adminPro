import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* MODULOS RUTAS HIJAS*/
import { AuthRouterModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

/* COMPONENTES */
import { DashboardComponent } from './pages/menu/dashboard/dashboard.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

const routes: Routes = [

  //path: '/dashboard' PagesRouting
  //path: '/auth AuthRouting
  { path: '', component: DashboardComponent },
  { path: '**', component: NopagefoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRouterModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

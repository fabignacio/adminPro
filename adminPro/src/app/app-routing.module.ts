import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* MODULOS RUTAS HIJAS*/
import { AuthRouterModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

/* COMPONENTES */
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

const routes: Routes = [

  //path: '/dashboard' PagesRouting
  //path: '/auth AuthRouting

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRouterModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

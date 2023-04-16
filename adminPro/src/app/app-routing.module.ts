import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* MODULOS RUTAS HIJAS*/
import { AuthRouterModule } from './auth/auth.routing';

/* COMPONENTES */
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

const routes: Routes = [

  //path: '/dashboard' PagesRouting
  //path: '/auth AuthRouting
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/pages.module').then(d => d.PagesModule)
  },
  { path: '**', component: NopagefoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRouterModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

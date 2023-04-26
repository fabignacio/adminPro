import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/* MODULO RUTAS */
import { AppRoutingModule } from './app-routing.module';

/* MODULOS PERSONALIZADOS POR PAGINAS */
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

/* COMPONENTES */
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    PagesModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

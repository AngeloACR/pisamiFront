import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormArtistasComponent } from './components/form-artistas/form-artistas.component';
import { FormNotificacionesComponent } from './components/form-notificaciones/form-notificaciones.component';
import { FormPoliticasComponent } from './components/form-politicas/form-politicas.component';
import { FormGenerosComponent } from './components/form-generos/form-generos.component';
import { FormUsuariosComponent } from './components/form-usuarios/form-usuarios.component';
import { HeaderComponent } from './components/header/header.component';
import { ListaComponent } from './components/lista/lista.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { ListaArtistasComponent } from './components/lista-artistas/lista-artistas.component';
import { ListaGenerosComponent } from './components/lista-generos/lista-generos.component';
import { ListaNotificacionesComponent } from './components/lista-notificaciones/lista-notificaciones.component';
import { ListaPoliticasComponent } from './components/lista-politicas/lista-politicas.component';
import { LoginComponent } from './components/login/login.component';
import { ValidacionComponent } from './components/validacion/validacion.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    ValidacionComponent,
    AdminComponent,
    FormArtistasComponent,
    FormNotificacionesComponent,
    FormPoliticasComponent,
    FormGenerosComponent,
    FormUsuariosComponent,
    HeaderComponent,
    ListaComponent,
    ListaUsuariosComponent,
    ListaArtistasComponent,
    ListaGenerosComponent,
    ListaNotificacionesComponent,
    ListaPoliticasComponent,
    LoginComponent,    

    ],
  entryComponents: [
    FormArtistasComponent,
    FormNotificacionesComponent,
    FormPoliticasComponent,
    FormGenerosComponent,
    FormUsuariosComponent,
    HeaderComponent,
    ListaComponent,
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

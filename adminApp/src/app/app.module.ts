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
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';
import { RegistroArtistasComponent } from './components/registro-artistas/registro-artistas.component';
import { RegistroGenerosComponent } from './components/registro-generos/registro-generos.component';
import { RegistroNotificacionesComponent } from './components/registro-notificaciones/registro-notificaciones.component';
import { RegistroPoliticasComponent } from './components/registro-politicas/registro-politicas.component';
import { RestorePassComponent } from './components/restore-pass/restore-pass.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { EditarUsuariosComponent } from './components/editar-usuarios/editar-usuarios.component';
import { EditarArtistasComponent } from './components/editar-artistas/editar-artistas.component';
import { EditarGenerosComponent } from './components/editar-generos/editar-generos.component';
import { EditarNotificacionesComponent } from './components/editar-notificaciones/editar-notificaciones.component';
import { EditarPoliticasComponent } from './components/editar-politicas/editar-politicas.component';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    RestorePassComponent,
    ResetPassComponent,
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
    EditarUsuariosComponent,
    RegistroUsuariosComponent,
    EditarArtistasComponent,
    RegistroArtistasComponent,
    EditarGenerosComponent,
    RegistroGenerosComponent,
    EditarNotificacionesComponent,
    RegistroNotificacionesComponent,
    EditarPoliticasComponent,
    RegistroPoliticasComponent,   

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

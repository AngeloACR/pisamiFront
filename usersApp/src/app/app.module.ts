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
import { BuscadorComponent } from './components/buscador/buscador.component';
import { DetalleArtistaComponent } from './components/detalle-artista/detalle-artista.component';
import { FormArtistasComponent } from './components/form-artistas/form-artistas.component';
import { FormBuscadorComponent } from './components/form-buscador/form-buscador.component';
import { FormUsuariosComponent } from './components/form-usuarios/form-usuarios.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RatingComponent } from './components/rating/rating.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ResultadosBuscadorComponent } from './components/resultados-buscador/resultados-buscador.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PoliticaComponent } from './components/politica/politica.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscadorComponent,
    DetalleArtistaComponent,
    FormArtistasComponent,
    FormBuscadorComponent,
    FormUsuariosComponent,
    HeaderComponent, 
    LoginComponent,
    RatingComponent, 
    RegistroComponent,
    ResultadosBuscadorComponent, 
    ],
  entryComponents: [
    DetalleArtistaComponent,
    FormArtistasComponent,
    FormBuscadorComponent,
    FormUsuariosComponent,
    HeaderComponent,
    RatingComponent,
    ResultadosBuscadorComponent,     
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

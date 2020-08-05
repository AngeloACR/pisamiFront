import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { RouteReuseStrategy } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicStorageModule } from "@ionic/storage";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BuscadorComponent } from "./components/buscador/buscador.component";
import { DetalleArtistaComponent } from "./components/detalle-artista/detalle-artista.component";
import { FormArtistasComponent } from "./components/form-artistas/form-artistas.component";
import { FormBuscadorComponent } from "./components/form-buscador/form-buscador.component";
import { FormUsuariosComponent } from "./components/form-usuarios/form-usuarios.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoginComponent } from "./components/login/login.component";
import { RatingComponent } from "./components/rating/rating.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { VideosComponent } from "./components/videos/videos.component";
import { ResultadosBuscadorComponent } from "./components/resultados-buscador/resultados-buscador.component";
import { CancionesComponent } from "./components/canciones/canciones.component";
import { PerfilComponent } from "./components/perfil/perfil.component";
import { BuscadorVideosComponent } from "./components/buscador-videos/buscador-videos.component";
import { PoliticaComponent } from "./components/politica/politica.component";
import { BuscadorCancionesComponent } from "./components/buscador-canciones/buscador-canciones.component";
import { RestorePassComponent } from "./components/restore-pass/restore-pass.component";
import { ResetPassComponent } from "./components/reset-pass/reset-pass.component";
import { FavoritosComponent } from "./components/favoritos/favoritos.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { SplashComponent } from "./components/splash/splash.component";
import { AngularFileUploaderModule } from "angular-file-uploader";


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
    PerfilComponent,
    RatingComponent,
    RestorePassComponent,
    ResetPassComponent,
    RegistroComponent,
    ResultadosBuscadorComponent,
    VideosComponent,
    PoliticaComponent,
    CancionesComponent,
    BuscadorCancionesComponent,
    BuscadorVideosComponent,
    FavoritosComponent,
    WelcomeComponent,
    LogoutComponent,
    SplashComponent
  ],
  entryComponents: [
    DetalleArtistaComponent,
    FormArtistasComponent,
    FormBuscadorComponent,
    FormUsuariosComponent,
    HeaderComponent,
    RatingComponent,
    ResultadosBuscadorComponent,
    VideosComponent,
    CancionesComponent,
    BuscadorCancionesComponent,
    BuscadorVideosComponent,
    SplashComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

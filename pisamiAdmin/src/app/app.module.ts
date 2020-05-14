import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from "@angular/common";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicStorageModule } from "@ionic/storage";

import { AppComponent } from "./app.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { LoginComponent } from "./components/login/login.component";
import { ArtistasComponent } from "./components/artistas/artistas.component";
import { GenerosComponent } from "./components/generos/generos.component";
import { NotificacionesComponent } from "./components/notificaciones/notificaciones.component";
import { PoliticasComponent } from "./components/politicas/politicas.component";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { SidemenuComponent } from "./components/sidemenu/sidemenu.component";
import { AppRoutingModule } from "./app-routing.module";

import { FileValueAccessor } from "./directives/fileControl";
import { FileValidator } from "./directives/fileValidator";

@NgModule({
  declarations: [
    AppComponent,
    ArtistasComponent,
    GenerosComponent,
    NotificacionesComponent,
    PoliticasComponent,
    UsuariosComponent,
    RegistroComponent,
    LoginComponent,
    SidemenuComponent,
    FileValueAccessor,
    FileValidator
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    DatePipe,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

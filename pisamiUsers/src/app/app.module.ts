import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { PoliticasComponent } from './components/politicas/politicas.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RatingComponent } from './components/rating/rating.component';
import { HeaderComponent } from './components/header/header.component';

import { FileValueAccessor } from './directives/fileControl';
import { FileValidator } from './directives/fileValidator';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    BuscadorComponent,
    PoliticasComponent,
    PerfilComponent,
    RatingComponent,
    HeaderComponent,
    FileValueAccessor,
    FileValidator
  ],
  entryComponents: [
    RatingComponent,
    HeaderComponent
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
    DatePipe,
    FileOpener,
    FileTransfer,
    DocumentViewer,
    File,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

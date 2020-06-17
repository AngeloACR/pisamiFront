import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'MÓDULO ADMINISTRADOR',
      url: '/admin',
      icon: 'assets/2- menu/modulo.png'
    },
    {
      title: 'REGISTRO DE USUARIOS',
      url: '/registrousuarios',
      icon: 'assets/2- menu/registro.png'
    },
    {
      title: 'LISTA DE USUARIOS',
      url: '/listausuarios',
      icon: 'assets/2- menu/lista de ususarios.png'
    },
    {
      title: 'REGISTRO DE ARTISTAS',
      url: '/registroartistas',
      icon: 'assets/2- menu/registro artista.png'
    },
    {
      title: 'VALIDACIÓN DE CUENTAS',
      url: '/validacion',
      icon: 'assets/2- menu/validaciòn.png'
    },
    {
      title: 'LISTA DE ARTISTAS',
      url: '/listaartistas',
      icon: 'assets/2- menu/lista de artistas.png'
    },
    {
      title: 'CREACIÓN DE GENERO',
      url: '/creageneros',
      icon: 'assets/2- menu/genero.png'
    },
    {
      title: 'LISTA DE GENEROS',
      url: '/listageneros',
      icon: 'assets/2- menu/lista generos.png'
    },
    {
      title: 'NOTIFICACIONES',
      url: '/notificaciones',
      icon: 'assets/2- menu/netificaciones.png'
    },
    {
      title: 'LISTA DE NOTIFICACIONES',
      url: '/listanotificaciones',
      icon: 'assets/2- menu/lista noti.png'
    },
    {
      title: 'POLÍTICAS',
      url: '/politicas',
      icon: 'assets/2- menu/politicas.png'
    },
    {
      title: 'LISTA DE POLÍTICAS',
      url: '/listapoliticas',
      icon: 'assets/2- menu/politicas.png'
    },
    {
      title: 'CERRAR SESIÓN',
      url: '/logout',
      icon: 'assets/2- menu/cerrar.png'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

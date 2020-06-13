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
      title: 'BUSCAR ARTISTAS',
      url: '/buscador/0',
      icon: 'assets/7-menu/artista.png'
    },
    {
      title: 'FAVORITOS',
      url: '/favoritos/0',
      icon: 'assets/7-menu/favorito.png'
    },
    {
      title: 'VIDEOS',
      url: '/videos',
      icon: 'assets/7-menu/videos.png'
    },
    {
      title: 'CANCIONES',
      url: '/canciones',
      icon: 'assets/7-menu/canciones.png'
    },
    {
      title: 'MI CUENTA',
      url: '/perfil',
      icon: 'assets/7-menu/perfil.png'
    },
    {
      title: 'POLITICAS',
      url: '/politica/0',
      icon: 'assets/7-menu/politicas.png'
    },
    {
      title: 'CERRAR SESION',
      url: '/logout',
      icon: 'assets/7-menu/cerrar.png'
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

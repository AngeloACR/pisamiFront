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
      icon: 'mail'
    },
    {
      title: 'MI CUENTA (EDITAR PERFIL)',
      url: '/perfil/0',
      icon: 'paper-plane'
    },
    {
      title: 'POLÍTICAS',
      url: '/politicas/0',
      icon: 'paper-plane'
    },
    {
      title: 'CERRAR SESIÓN',
      url: '/logout',
      icon: 'paper-plane'
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
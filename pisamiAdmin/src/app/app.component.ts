import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'MODULO ADMINISTRADOR',
      url: '/registro/0',
      class: {
        aBox: false
      },
      icon: 'assets/MENU/MODULOADMINIS.png',
      childs: [
        {
          title: 'REGISTRO DE USUARIOS',
          url: '/registro/0',
          icon: 'assets/MENU/REGISTROUSU.png'
        }, {
          title: 'LISTA DE USUARIOS',
          url: '/administrador/0',
          icon: 'assets/MENU/LISTAUSU.png'
        }, {
          title: 'REGISTRO DE ARTISTAS',
          url: '/registro/1',
          icon: 'assets/MENU/REGISTROARTISTA.png'
        },
      ]
    },
    {
      title: 'VALIDACIÓN DE CUENTAS',
      url: '/artistas/1',
      class: {
        aBox: false
      },
      icon: 'assets/MENU/VALIDADCUENTA.png',
      childs: [
        {
          title: 'LISTA DE ARTISTAS',
          url: '/artistas/1',
          icon: 'assets/MENU/LISTAARTISTA.png'
        }
      ]
    },
    {
      title: 'CONFIGURACIÒN',
      url: '/generos/0',
      class: {
        aBox: false
      },
      icon: 'assets/MENU/CONFIGURACION.png',
      childs: [
        {
          title: 'CREACIÓN DE GÉNERO',
          url: '/generos/0',
          icon: 'assets/MENU/GUARDARGENERO.png'
        }, {
          title: 'LISTA DE GÉNEROS',
          url: '/generos/1',
          icon: 'assets/MENU/LISTAGENEROS.png'
        }, {
          title: 'NOTIFICACIONES',
          url: '/notificaciones/0',
          icon: 'assets/MENU/NOTIFICACIONES.png'
        },
        {
          title: 'LISTA DE NOTIFICACIONES',
          url: '/notificaciones/1',
          icon: 'assets/MENU/LISTANOTIFICACIONES.png'
        }
      ]
    }, {
      title: 'POLÍTICAS',
      url: '/politicas/0',
      class: {
        aBox: false
      },
      icon: 'assets/MENU/POLITICAS.png',
      childs: [
        {
          title: 'CREACIÓN DE POLÍTICAS',
          url: '/politicas/0',
          icon: 'assets/MENU/GUARDARGENERO.png'
        }, {
          title: 'LISTA DE POLÍTICAS',
          url: '/politicas/1',
          icon: 'assets/MENU/LISTAGENEROS.png'
        }
      ]
    },
    {
      title: 'CERRAR SESIÓN',
      url: '/login',
      class: {
        aBox: false
      },
      icon: 'assets/MENU/CERRARSESION.png'
    }
  ];

  /*   public appPages = [
      {
        title: 'Registro',
        url: '/registro',
        icon: 'mail'
      },
      {
        title: 'Iniciar sesión',
        url: '/login',
        icon: 'paper-plane'
      }
    ]; */

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

  ngOnInit() {

  }

  tMenu(event, item, i) {
    this.selectedIndex = i;
    this.closeMenus();
    this.appPages[i].class = {
      aBox: true,
    }
  }

  closeMenus() {
    this.appPages.forEach(item => {
      item.class = {
        aBox: false,
      }
    });
  }

}

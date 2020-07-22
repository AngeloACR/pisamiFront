import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonSlides } from '@ionic/angular';
import {AuthService} from './services/auth.service'



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  currentMenu: any;
  menuBoxes: any;
  adminBoxes: any;
  configBoxes: any;
  politicasBoxes: any;
  selectedTitle: string = 'Menú'

  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  menuSlider: any;
  adminSlider: any;
  configSlider: any;
  politicasSlider: any;

  mainMenu: boolean = true
  adminMenu: boolean = false
  configMenu: boolean = false
  politicasMenu: boolean = false

  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    effect: 'slide',
  };

  public config = {
      title: 'CONFIGURACIÓN',
      url: '/config',
      icon: 'assets/2- menu/configuracion.png'
    };

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
      url: '/listapoliticas',
      icon: 'assets/2- menu/politicas.png'
    },
    {
      title: 'CERRAR SESIÓN',
      url: '/logout',
      icon: 'assets/2- menu/cerrar.png'
    }
  ];

  public menuPages = [
    {
      title: 'MÓDULO ADMINISTRADOR',
      url: '/admin',
      icon: 'assets/2- menu/modulo.png'
    },
    {
      title: 'CONFIGURACIÓN',
      url: '/logout',
      icon: 'assets/2- menu/configuracion.png'
    },
    {
      title: 'POLÍTICAS',
      url: '/listapoliticas',
      icon: 'assets/2- menu/politicas.png'
    },
    {
      title: 'CERRAR SESIÓN',
      url: '/logout',
      icon: 'assets/2- menu/cerrar.png'
    }
  ];

  public adminPages = [
    {
      title: 'VALIDACIÓN DE CUENTAS',
      url: '/validacion',
      icon: 'assets/2- menu/validaciòn.png'
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
      title: 'LISTA DE ARTISTAS',
      url: '/listaartistas',
      icon: 'assets/2- menu/lista de artistas.png'
    },
  ];

  public configPages = [
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
  ];


  public politicasPages = [
    
    {
      title: 'CREAR POLÍTICAS',
      url: '/politicas',
      icon: 'assets/2- menu/politicas.png'
    },
    {
      title: 'LISTA DE POLÍTICAS',
      url: '/listapoliticas',
      icon: 'assets/2- menu/politicas.png'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
  ) {
    this.initializeApp();
    this.initSliders();
  }

  initSliders(){
    this.menuBoxes = [];
    let menuOpts = 4;
    let length = this.menuPages.length;
    var i,j;
    for (i=0,j=length; i<j; i+=menuOpts) {
        let aux = {
          menuPages: this.menuPages.slice(i,i+menuOpts)
        };
        this.menuBoxes.push(aux)
    }

    this.menuSlider = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: this.menuBoxes
    };
    this.adminBoxes = [];

    length = this.adminPages.length;

    for (i=0,j=length; i<j; i+=menuOpts) {
        let aux = {
          menuPages: this.adminPages.slice(i,i+menuOpts)
        };
        this.adminBoxes.push(aux)
    }

    this.adminSlider = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: this.adminBoxes
    };
    
    this.configBoxes = [];

    length = this.configPages.length;

    for (i=0,j=length; i<j; i+=menuOpts) {
        let aux = {
          menuPages: this.configPages.slice(i,i+menuOpts)
        };
        this.configBoxes.push(aux)
    }

    this.configSlider = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: this.configBoxes
    };
    this.politicasBoxes = [];

    length = this.politicasPages.length;

    for (i=0,j=length; i<j; i+=menuOpts) {
        let aux = {
          menuPages: this.politicasPages.slice(i,i+menuOpts)
        };
        this.politicasBoxes.push(aux)
    }

    this.politicasSlider = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: this.politicasBoxes
    };


  }

  changeMenu(event, i){
    this.mainMenu = false;
    this.adminMenu = false;
    this.configMenu = false;
    this.politicasMenu = false;
    if(i == 0){
      this.selectedTitle = 'Módulo Administrador'
      this.adminMenu = true;
    }else if (i == 1){
      this.configMenu = true;
      this.selectedTitle = 'Configuración'
    }else if( i == 2){
      this.politicasMenu = true;
      this.selectedTitle = 'Políticas'

    }else if( i == 3){
      this.auth.logout();
    }
  }

  volverMenu(){
    this.selectedTitle = 'Menú';
    this.mainMenu = true;
    this.adminMenu = false;
    this.configMenu = false;
    this.politicasMenu = false;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

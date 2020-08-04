import { Component, OnInit, ViewChild } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonSlides } from "@ionic/angular";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  currentMenu: any;
  menuBoxes: any;
  public identity;
  public token;

  @ViewChild("slideWithNav", { static: false }) slideWithNav: IonSlides;

  menuSlider: any;
  showSplash: boolean = true;
  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    effect: "slide"
  };

  public config = {
    title: "CONFIGURACIÓN",
    url: "/config",
    icon: "assets/7-menu/configuración.png"
  };

  public appPages = [
    {
      title: "BUSCAR ARTISTAS",
      url: "/buscador/0",
      icon: "assets/7-menu/artista.png"
    },
    {
      title: "FAVORITOS",
      url: "/favoritos",
      icon: "assets/7-menu/favorito.png"
    },
    {
      title: "VIDEOS",
      url: "/videos",
      icon: "assets/7-menu/videos.png"
    },
    {
      title: "CANCIONES",
      url: "/canciones",
      icon: "assets/7-menu/canciones.png"
    },
    {
      title: "MI CUENTA",
      url: "/perfil/0",
      icon: "assets/7-menu/perfil.png"
    },
    {
      title: "POLITICAS",
      url: "/politica/0",
      icon: "assets/7-menu/politicas.png"
    },
    {
      title: "CERRAR SESION",
      url: "/logout",
      icon: "assets/7-menu/cerrar.png"
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public _userService: UserService
  ) {
    this.initializeApp();
    this.initSlider();
    this.identity = this._userService.getIdentity();
    //Item object for Nature
  }

  initSlider() {
    this.menuBoxes = [];
    let menuOpts = 4;
    let length = this.appPages.length;
    var i, j;
    for (i = 0, j = length; i < j; i += menuOpts) {
      let aux = {
        menuPages: this.appPages.slice(i, i + menuOpts)
      };
      this.menuBoxes.push(aux);
    }

    this.menuSlider = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: this.menuBoxes
    };
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.showSplash = false;
      }, 2500);
    });
  }

  ngOnInit() {}

  ionViewDidLoad() {
    console.log(this.slideWithNav);
    this.slideWithNav.update();
  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(event, object, slideView) {
    console.log("change");
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then(istrue => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then(istrue => {
      object.isEndSlide = istrue;
    });
  }
}

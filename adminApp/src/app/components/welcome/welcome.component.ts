import { CommonService } from "../../services/common.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { MenuController } from "@ionic/angular";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  selectedTitle: string = "Bienvenido";
  welcomeMsg: string;
  isUsuario: boolean;
  isMusico: boolean;
  isPrimerInicio: boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
    private common: CommonService,
    private menuCtrl: MenuController
  ) {}

  async ngOnInit() {
    this.menuCtrl.enable(false);
    this.isUsuario = false;
    this.isMusico = false;
    this.welcomeMsg =
      "Bienvenido a Ibagué Musical, una aplicación donde encontrarás un directorio musical a través de nuestro servicio. ¡Anímate a conocer más de tus artistas favoritos!";
  }

  welcomeUser() {
    this.router.navigateByUrl("/listausuarios");
  }
}

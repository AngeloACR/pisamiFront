import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";
import { CommonService } from "../../services/common.service";

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
  isPrimerInicio: boolean = false;
  constructor(
    private auth: AuthService,
    private common: CommonService,
    private router: Router
  ) {}

  async ngOnInit() {
    let type = await this.auth.getType();
    this.isUsuario = false;
    this.isMusico = false;
    if (type == "usuario") {
      this.isUsuario = true;
      this.welcomeMsg =
        "Bienvenido(a) a Ibagué Musical, una aplicación donde encontrarás un directorio musical a través de nuestro servicio. ¡Anímate a conocer más de tus artistas favoritos!";
    } else {
      this.isMusico = true;
      this.welcomeMsg =
        "Bienvenido(a) a Ibagué Musical, una aplicación donde encontrarás un directorio musical a través de nuestro servicio. ¡Anímate a conocer más de tus artistas favoritos!";
      this.isPrimerInicio = await this.auth.primerInicio();
      if (this.isPrimerInicio) {
        this.welcomeMsg =
          "Si eres solista, dúo o si cuentas con una banda, debes completar tu perfil seleccionando la opción de acuerdo a tu condición. De esta manera empezarás a disfrutar de los beneficios que tiene Ibagué Músical para ti.";
      }
    }
  }

  welcomeUser() {
    this.router.navigateByUrl("/perfil/0");
  }
}

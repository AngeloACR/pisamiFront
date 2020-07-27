import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";
import { AuthService } from "../../services/auth.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"]
})
export class RegistroComponent implements OnInit {
  id: string;
  selectedTitle: any;

  tipoSelected: String;
  isUser: Boolean;
  isMusico: Boolean;
  isSolista: Boolean;
  isDuo: Boolean;
  isInfo: Boolean;
  isOrquesta: Boolean;
  
  showForm: {};
  hideOption: {};
  selectedImg: String;
  userImg: String;
  musicoImg: String;
  solistaImg: String;
  duoImg: String;
  orquestaImg: String;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private platform: Platform
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params["id"];
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == "registro") {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }
      });
    });
  }

  ngOnInit() {
        this.selectedTitle = 'Regístrate'
    this.isUser = false;
    this.isSolista = false;
    this.isDuo = false;
    this.isOrquesta = false;
    this.isMusico = false;
    this.musicoImg = "assets/4-registro/musico.png";
    this.userImg = "assets/4-registro/usuario.png";
    this.solistaImg = "assets/5-tipo/musicao.png";
    this.duoImg = "assets/5-tipo/duo.png";
    this.orquestaImg = "assets/5-tipo/orquesta.png";
  }

  toggleForm(event, tipo) {
    let img;
    switch (tipo) {
      case "user":
        this.selectedTitle = 'Registro de Usuario'
        this.isUser = true;
        this.isMusico = false;
        this.isSolista = false;
        this.isDuo = false;
        this.isOrquesta = false;
        img = this.userImg;
        break;
      case "solista":
        this.selectedTitle = 'Registro de Músico Cantante'
        this.isUser = false;
        this.isSolista = true;
        this.isDuo = false;
        this.isOrquesta = false;
        img = this.solistaImg;
        break;
      case "duo":
        this.selectedTitle = 'Registro de Dúo'
        this.isUser = false;
        this.isSolista = false;
        this.isDuo = true;
        this.isOrquesta = false;
        img = this.duoImg;
        break;
      default:
        this.selectedTitle = 'Registro de Orquesta'
        this.isUser = false;
        this.isSolista = false;
        this.isDuo = false;
        this.isOrquesta = true;
        img = this.orquestaImg;
        break;
    }

    this.selectedImg = img;
    this.tipoSelected = tipo;
    this.showForm = {
      formAct: true
    };
    this.hideOption = {
      hideOption: true
    };
    console.log(this.tipoSelected);
  }

  firstToggle(event, tipo) {
    switch (tipo) {
      case "usuario":
        this.toggleForm(event, "user");
        break;
      default:
        this.isMusico = true;
        break;
    }
  }

  closeForm() {
    this.showForm = {
      formAct: false
    };
    this.hideOption = {
      hideOption: false
    };
  }

  volverInfoArtista() {
    this.isSolista = this.tipoSelected == "solista";
    this.isDuo = this.tipoSelected == "duo";
    this.isOrquesta = this.tipoSelected == "orquesta";
    this.isInfo = false;
  }

  volverSeleccionMusico() {
    this.isSolista = false;
    this.isDuo = false;
    this.isOrquesta = false;
  }

  registerCompleted(){
    this.router.navigateByUrl("/login");
  }

}

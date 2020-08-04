import { CommonService } from "../../services/common.service";
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
  selector: "app-registro-artistas",
  templateUrl: "./registro-artistas.component.html",
  styleUrls: ["./registro-artistas.component.scss"]
})
export class RegistroArtistasComponent implements OnInit {
  id: string;

  tipoSelected: String;
  isSolista: Boolean;
  isDuo: Boolean;
  isInfo: Boolean;
  isOrquesta: Boolean;
  selectedTitle: any;

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
    private common: CommonService,
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
    this.selectedTitle = "Registro de Artistas";
    this.solistaImg = "assets/5-tipo/musicao.png";
    this.duoImg = "assets/5-tipo/duo.png";
    this.orquestaImg = "assets/5-tipo/orquesta.png";
  }

  toggleForm(event, tipo) {
    let img;
    switch (tipo) {
      case "solista":
        this.selectedTitle = "Registro de Músico Cantante";

        this.isSolista = true;
        this.isDuo = false;
        this.isOrquesta = false;
        img = this.solistaImg;
        break;
      case "duo":
        this.selectedTitle = "Registro de Dúo";
        this.isSolista = false;
        this.isDuo = true;
        this.isOrquesta = false;
        img = this.duoImg;
        break;
      default:
        this.selectedTitle = "Registro de Orquesta";
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

  soundLinks = new FormArray([]);
  youLinks = new FormArray([]);
  addYoutube() {
    const group = new FormGroup({
      nombre: new FormControl(""),
      link: new FormControl("")
    });

    this.youLinks.push(group);
  }
  addSoundcloud() {
    const group = new FormGroup({
      nombre: new FormControl(""),
      link: new FormControl("")
    });

    this.soundLinks.push(group);
  }
}

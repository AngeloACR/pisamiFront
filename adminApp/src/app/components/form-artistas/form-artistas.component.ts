import { Component, OnInit, Input } from "@angular/core";
import { Platform } from "@ionic/angular";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { DbHandlerService } from "../../services/db-handler.service";
import { FileHandlerService } from "../../services/file-handler.service";
import { FileValidator } from "../../directives/fileValidator";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { forkJoin } from "rxjs";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: 'app-form-artistas',
  templateUrl: './form-artistas.component.html',
  styleUrls: ['./form-artistas.component.scss'],
})
export class FormArtistasComponent implements OnInit {
  
@Input()
editMode: number;

@Input()
user: any;

@Input()
tipo: string;


  id: string;
  generos = ["Cumbia", "Bachata", "Vallenato", "Rock"];

  registroMusico: FormGroup;

  tipoSelected: String;
  isSolista: Boolean;
  isDuo: Boolean;
  isOrquesta: Boolean;
  isInfo: Boolean;
  selectedImg: String;
  musicoImg: String;
  solistaImg: String;
  duoImg: String;
  orquestaImg: String;

  fileName1: String;
  fileName2: String;
  fileName3: String;

  file1: any;
  file2: any;
  file3: any;

  soundLinks = new FormArray([]);
  youLinks = new FormArray([]);

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dbHandler: DbHandlerService,
    private fileHanlder: FileHandlerService,
    public actionSheetController: ActionSheetController,
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
    this.isInfo = false;
    this.isSolista = false;
    this.isDuo = false;
    this.isOrquesta = false;
    this.initForm(this.editMode);
    this.toggleForm(this.tipo);
  }

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

  initForm(editMode) {
    this.registroMusico = new FormGroup({
      nombreReal: new FormControl("", Validators.required),
      nombreArtistico: new FormControl("", Validators.required),
      salir: new FormControl("", Validators.required),
      ciudadOrigen: new FormControl("", Validators.required),
      tieneRepresentante: new FormControl("", Validators.required),
      nombreRepresentante: new FormControl("", Validators.required),
      telefono: new FormControl("", Validators.required),
      correo: new FormControl("", [Validators.required, Validators.email]),
      descripcion: new FormControl("", Validators.required),
      instagram: new FormControl("", Validators.required),
      facebook: new FormControl(""),
      paginaWeb: new FormControl(""),
      numeroIntegrantes: new FormControl("", Validators.required),
      generos: new FormControl("", Validators.required),
      imagen1: new FormControl("", [FileValidator.validate]),
      imagen2: new FormControl("", [FileValidator.validate]),
      imagen3: new FormControl("", [FileValidator.validate])
      /*       soundLinks: new FormControl('', Validators.required),
      youLinks: new FormControl('', Validators.required),
      soundNombres: new FormControl('', Validators.required),
      youNombres: new FormControl('', Validators.required), */
    });
    if(editMode){
      this.registroMusico.controls['numeroIntegrantes'].setValue(this.user.numeroIntegrantes);
      this.registroMusico.controls['nombreReal'].setValue(this.user.nombreReal);
      this.registroMusico.controls['nombreArtistico'].setValue(this.user.nombreArtistico);
      this.registroMusico.controls['salir'].setValue(this.user.salir);
      this.registroMusico.controls['ciudadOrigen'].setValue(this.user.ciudadOrigen);
      this.registroMusico.controls['tieneRepresentante'].setValue(this.user.tieneRepresentante);
      this.registroMusico.controls['nombreRepresentante'].setValue(this.user.nombreRepresentante);
      this.registroMusico.controls['telefono'].setValue(this.user.telefono);
      this.registroMusico.controls['correo'].setValue(this.user.correo);
      this.registroMusico.controls['descripcion'].setValue(this.user.descripcion);
      this.registroMusico.controls['instagram'].setValue(this.user.instagram);
      this.registroMusico.controls['facebook'].setValue(this.user.facebook);
      this.registroMusico.controls['paginaWeb'].setValue(this.user.paginaWeb);

    }
  }

  get fMusico() {
    return this.registroMusico.controls;
  }


  toggleForm(tipo) {
    let img;
    switch (tipo) {
      case "solista":
        this.isSolista = true;
        this.registroMusico.controls['numeroIntegrantes'].setValue(1);
        this.registroMusico.controls['numeroIntegrantes'].disable();
        img = this.solistaImg;
        break;
      case "duo":
          this.isDuo = true;
          this.registroMusico.controls['numeroIntegrantes'].setValue(2);
        this.registroMusico.controls['numeroIntegrantes'].disable();
        img = this.duoImg;
        break;
      default:
          this.isOrquesta = true;
          img = this.orquestaImg;
        break;
    }

    this.selectedImg = img;
    this.tipoSelected = tipo;
  }

  toggleInfo() {
    if (this.catchUserErrors()) {
      this.toggleError();
    } else {
      this.isSolista = false;
      this.isDuo = false;
      this.isOrquesta = false;
      this.isInfo = true;
    }
  }

  endRegistro() {
    if (this.catchUserErrors()) {
      this.toggleError();
    } else {
      console.log("Registrando");
    }
  }

  async toggleError() {
    let actionSheet = await this.actionSheetController.create({
      header:
        "Hay errores en el formulario. Por favor, revíselo e intente de nuevo",
      buttons: [
        {
          text: "VOLVER",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("CANCELANDO...");
          }
        }
      ]
    });
    await actionSheet.present();
  }

  volverInfoArtista() {
    this.isSolista = this.tipoSelected == "solista";
    this.isDuo = this.tipoSelected == "duo";
    this.isOrquesta = this.tipoSelected == "orquesta";
    this.isInfo = false;
  }

  volverSeleccionMusico() {
    this.registroMusico.controls['numeroIntegrantes'].enable();
    this.isSolista = false;
    this.isDuo = false;
    this.isOrquesta = false;
  }

  catchUserErrors() {

      let aux1 = this.fMusico.nombreReal.errors
        ? this.fMusico.nombreReal.errors.required
        : false;
      let aux2 = this.fMusico.nombreArtistico.errors
        ? this.fMusico.nombreArtistico.errors.required
        : false;
      let aux3 = this.fMusico.ciudadOrigen.errors
        ? this.fMusico.ciudadOrigen.errors.required
        : false;
      let aux4 = this.fMusico.nombreRepresentante.errors
        ? this.fMusico.nombreRepresentante.errors.required
        : false;
      let aux5 = this.fMusico.telefono.errors
        ? this.fMusico.telefono.errors.required
        : false;
      let aux6 = this.fMusico.correo.errors
        ? this.fMusico.correo.errors.required
        : false;
      let aux7 = this.fMusico.correo.errors
        ? this.fMusico.correo.errors.email
        : false;
      let aux8 = this.fMusico.descripcion.errors
        ? this.fMusico.descripcion.errors.required
        : false;
      let aux9 = this.fMusico.paginaWeb.errors
        ? this.fMusico.paginaWeb.errors.required
        : false;

      let error =
        aux1 || aux2 || aux3 || aux4 || aux5 || aux6 || aux7 || aux8 || aux9;
      return error;
  }
}

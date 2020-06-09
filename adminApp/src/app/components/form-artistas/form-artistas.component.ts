import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { DbHandler } from "../../services/db-handler.service";
import { FileHandler } from "../../services/file-handler.service";
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


  id: string;
  generos = ["Cumbia", "Bachata", "Vallenato", "Rock"];

  registroMusica: FormGroup;

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
    private fb: FormBuilder,
    private dbHandler: DbHandler,
    private fileHanlder: FileHandler,
    public actionSheetController: ActionSheetController,
  ) {  }

  ngOnInit() {
    this.isInfo = false;
    this.isSolista = false;
    this.isDuo = false;
    this.isOrquesta = false;
    this.initForm(this.editMode);
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
      paginaWeb: new FormControl("", Validators.required)
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
      this.registroMusico.controls['paginaWeb'].setValue(this.user.paginaWeb);

    }
  }

  get fMusico() {
    return this.registroDuo.controls;
  }


  toggleForm(tipo) {
    this.formSelected = true;
    let img;
    switch (tipo) {
      case "solista":
        this.isSolista = true;
        this.registroMusico..controls['numeroIntegrantes'].setValue(1);
        this.registroMusico..controls['numeroIntegrantes'].disable();
        break;
      case "duo":
          this.isDuo = true;
          this.registroMusico..controls['numeroIntegrantes'].setValue(2);
        this.registroMusico..controls['numeroIntegrantes'].disable();
        break;
      default:
          this.isOrquesta = true;
        break;
    }

    this.selectedImg = img;
    this.tipoSelected = tipo;
    this.showForm = {
      formAct: true
    };
    this.showBlack = {
      blackAct: true
    };

    this.hideOption = {
      hideOption: true
    };
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

  catchUserErrors() {

      let aux1 = this.fSolista.nombreReal.errors
        ? this.fSolista.nombreReal.errors.required
        : false;
      let aux2 = this.fSolista.nombreArtistico.errors
        ? this.fSolista.nombreArtistico.errors.required
        : false;
      let aux3 = this.fSolista.ciudadOrigen.errors
        ? this.fSolista.ciudadOrigen.errors.required
        : false;
      let aux4 = this.fSolista.nombreRepresentante.errors
        ? this.fSolista.nombreRepresentante.errors.required
        : false;
      let aux5 = this.fSolista.telefono.errors
        ? this.fSolista.telefono.errors.required
        : false;
      let aux6 = this.fSolista.correo.errors
        ? this.fSolista.correo.errors.required
        : false;
      let aux7 = this.fSolista.correo.errors
        ? this.fSolista.correo.errors.email
        : false;
      let aux8 = this.fSolista.descripcion.errors
        ? this.fSolista.descripcion.errors.required
        : false;
      let aux9 = this.fSolista.paginaWeb.errors
        ? this.fSolista.paginaWeb.errors.required
        : false;

      let error =
        aux1 || aux2 || aux3 || aux4 || aux5 || aux6 || aux7 || aux8 || aux9;
      return error;
  }
}

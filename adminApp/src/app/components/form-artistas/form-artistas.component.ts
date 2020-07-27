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

  soundFrames = new FormArray([]);
  youFrames = new FormArray([]);

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
      iframe: new FormControl("")
    });

    this.youFrames.push(group);
  }
  addSoundcloud() {
    const group = new FormGroup({
      nombre: new FormControl(""),
      iframe: new FormControl("")
    });

    this.soundFrames.push(group);
  }

  initForm(editMode) {
    this.registroMusico = new FormGroup({
      nombreArtistico: new FormControl("", Validators.required),
      salir: new FormControl("", Validators.required),
      ciudadOrigen: new FormControl("", Validators.required),
      tieneRepresentante: new FormControl("", Validators.required),
      nombreRepresentante: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      instagram: new FormControl(""),
      facebook: new FormControl(""),
      paginaWeb: new FormControl(""),
      numeroIntegrantes: new FormControl("", Validators.required),
      generos: new FormControl("", Validators.required),
      imagen1: new FormControl("", [FileValidator.validate]),
      imagen2: new FormControl("", [FileValidator.validate]),
      imagen3: new FormControl("", [FileValidator.validate]),
      soundFrames: this.soundFrames,
      youFrames: this.youFrames,
      /*       soundFrames: new FormControl('', Validators.required),
      youFrames: new FormControl('', Validators.required),
      soundNombres: new FormControl('', Validators.required),
      youNombres: new FormControl('', Validators.required), */
    });
    if(editMode){
      this.registroMusico.controls['numeroIntegrantes'].setValue(this.user.numeroIntegrantes);
      this.registroMusico.controls['nombreArtistico'].setValue(this.user.nombreArtistico);
      this.registroMusico.controls['salir'].setValue(this.user.salir);
      this.registroMusico.controls['ciudadOrigen'].setValue(this.user.ciudadOrigen);
      this.registroMusico.controls['tieneRepresentante'].setValue(this.user.tieneRepresentante);
      this.registroMusico.controls['nombreRepresentante'].setValue(this.user.nombreRepresentante);
      this.registroMusico.controls['generos'].setValue(this.user.generos);
      this.registroMusico.controls['descripcion'].setValue(this.user.descripcion);
      this.registroMusico.controls['instagram'].setValue(this.user.instagram);
      this.registroMusico.controls['facebook'].setValue(this.user.facebook);
      this.registroMusico.controls['paginaWeb'].setValue(this.user.paginaWeb);
          console.log(this.user.soundFrames)

        let soundAuxs = this.user.soundFrames;
        soundAuxs.forEach(soundAux => {
          this.addSoundcloud()
        });

       var soundControls = this.soundFrames.controls;
        let i = 0;
       for (let control of soundControls) {
        if (control instanceof FormGroup) {
          let nombre = this.user.soundFrames[i].nombre;
          let iframe = this.user.soundFrames[i].iframe;
          control.controls['nombre'].setValue(nombre);
          control.controls['iframe'].setValue(iframe);
          i++;
        }
       }
        
        let youAuxs = this.user.youFrames;
        youAuxs.forEach(youAux => {
          this.addYoutube()
        });
        let j = 0;
       var youControls = this.youFrames.controls;
       for (let control of youControls) {
        if (control instanceof FormGroup) {
          let nombre = this.user.youFrames[j].nombre
          let iframe = this.user.youFrames[j].iframe
          control.controls['nombre'].setValue(nombre);
          control.controls['iframe'].setValue(iframe);
          j++
        }
       }
    }
  }

  get fMusico() {
    return this.registroMusico.controls;
  }


  toggleForm(tipo) {
    let img;
    console.log(tipo)
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
      let msg ="Hay errores en el formulario. Por favor, revíselo e intente de nuevo"
      this.toggleError(msg);
    } else {
      this.isSolista = false;
      this.isDuo = false;
      this.isOrquesta = false;
      this.isInfo = true;
    }
  }


  endRegistro() {
    if (this.catchUserErrors()) {
      let msg ="Hay errores en el formulario. Por favor, revíselo e intente de nuevo"
      this.toggleError(msg);
    } else {
      let soundLinks = []
      var soundControls = this.soundFrames.controls;
       for (let control of soundControls) {
        if (control instanceof FormGroup) {
          let soundFrame = control.controls['iframe'].value;
          let soundLink = soundFrame.substring(
            soundFrame.lastIndexOf("src=\"") + 5, 
            soundFrame.lastIndexOf("\"></iframe>")
        );
        soundLinks.push(soundLink);
        }
      } 

      let youLinks = []
      var youControls = this.youFrames.controls;
       for (let control of youControls) {
        if (control instanceof FormGroup) {
          let youFrame = control.controls['iframe'].value;
          let youLink = youFrame.substring(
            youFrame.lastIndexOf("http"), 

            youFrame.lastIndexOf("\" frameborder")
        );
        youLinks.push(youLink);
        }
      }
      let endpoint = '/perfiles'
      let dataAux = this.registroMusico.value;
      let dataValues = {
        youLinks: youLinks,
        soundLinks: soundLinks,
      };
      this.dbHandler.postSomething(dataValues, endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.ngOnInit()
        }
      });
      console.log("Registrando");
    }
  }

  endUpdate() {
    if (this.catchUserErrors()) {
      let msg ="Hay errores en el formulario. Por favor, revíselo e intente de nuevo"
      this.toggleError(msg);
    } else {
      console.log("Registrando");
      let endpoint = '/perfiles'
      let dataAux = this.registroMusico.value;
      let dataValues = {
      };
      this.dbHandler.putSomething(dataValues, endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.ngOnInit()
        }
      });
    }
  }

  async toggleError(msg) {
    let actionSheet = await this.actionSheetController.create({
      header:
        msg,
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


  fileProgress(fileInput, imagen) {
    let registro = this;
    let files = fileInput.target.files;
    let file = files[0];

    if (files && file) {
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = function() {
        switch (imagen) {
          case "imagen1":

            registro.fileName1 = file.name;
            registro.file1 = reader.result.toString().split(',')[1];
//            registro.file1 = reader.result;
            break;
          case "imagen2":
            registro.fileName2 = file.name;
            registro.file2 = reader.result.toString().split(',')[1];
//            registro.file2 = reader.result;
            break;
          default:
            registro.fileName3 = file.name;
            registro.file3 = reader.result.toString().split(',')[1];
//            registro.file3 = reader.result;
            break;
        }
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    } else {
      this.fileName1 = "";
      this.fileName2 = "";
      this.fileName3 = "";
    }
  }

}

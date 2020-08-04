import { CommonService } from "../../services/common.service";
import { Component, OnInit, Input } from "@angular/core";
import { Platform } from "@ionic/angular";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import {LinkService} from "../../services/link.service";
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
import * as crypto from 'crypto-js'; 


@Component({
  selector: 'app-form-artistas',
  templateUrl: './form-artistas.component.html',
  styleUrls: ['./form-artistas.component.scss'],
  providers: [UserService,LinkService],
})
export class FormArtistasComponent implements OnInit {
    
  @Input()
  editMode: number;

  @Input()
  user: any;

  @Input()
  tipo: string;


  id: string;
  generos = [1, 2, 3, 4];
  status;

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
  IdPerfil: string;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private common: CommonService,
    private dbHandler: DbHandlerService,
    private fileHanlder: FileHandlerService,
    public actionSheetController: ActionSheetController,
    private _userService : UserService,
    private _linkService : LinkService,
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
    console.log(this.tipo);
    console.log(this.editMode);    
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
      nombre_artistico: new FormControl("", Validators.required),
      dispuesto_salir: new FormControl("", Validators.required),
      ciudad_origen: new FormControl("", Validators.required),
      representante: new FormControl("", Validators.required),
      nombre_representante: new FormControl("", Validators.required),
      telefono: new FormControl("", Validators.required),
      correo: new FormControl("", [Validators.required, Validators.email]),
      descripcion: new FormControl("", Validators.required),
      instagram: new FormControl("", Validators.required),
      facebook: new FormControl(""),
      pagina_web: new FormControl(""),
      num_integrantes: new FormControl("", Validators.required),
      genero: new FormControl("", Validators.required),
      imagen1: new FormControl("", [FileValidator.validate]),
      imagen2: new FormControl("", [FileValidator.validate]),
      imagen3: new FormControl("", [FileValidator.validate]),
      soundFrames: this.soundFrames,
      youFrames: this.youFrames,
    });
    if(editMode){
      this._userService.perfilId(this._userService.getIdentity().userId).subscribe(
        response => {
          if(response.status == "success"){
           this.status = response.status;
           console.log(response.perfiles[0]);
            localStorage.setItem('idPerfil',response.perfiles[0].id);
            this.registroMusico.controls['num_integrantes'].setValue(response.perfiles[0].num_integrantes);
            this.registroMusico.controls['nombre_artistico'].setValue(response.perfiles[0].nombre_artistico);
            this.registroMusico.controls['dispuesto_salir'].setValue(response.perfiles[0].dispuesto_salir);
            this.registroMusico.controls['ciudad_origen'].setValue(response.perfiles[0].ciudad_origen);
            this.registroMusico.controls['representante'].setValue(response.perfiles[0].representante);
            this.registroMusico.controls['nombre_representante'].setValue(response.perfiles[0].nombre_representante);
            this.registroMusico.controls['telefono'].setValue(response.perfiles[0].telefono);
            this.registroMusico.controls['correo'].setValue(response.perfiles[0].correo);
            this.registroMusico.controls['descripcion'].setValue(response.perfiles[0].descripcion);
            this.registroMusico.controls['instagram'].setValue(response.perfiles[0].instagram);
            this.registroMusico.controls['facebook'].setValue(response.perfiles[0].facebook);
            this.registroMusico.controls['pagina_web'].setValue(response.perfiles[0].pagina_web);
            this.registroMusico.controls['genero'].setValue(response.perfiles[0].genero);
            this.registroMusico.controls['descripcion'].setValue(this.user.descripcion);
            this.registroMusico.controls['instagram'].setValue("n/a");
            this.registroMusico.controls['facebook'].setValue("n/a");
            this.registroMusico.controls['pagina_web'].setValue("n/a");
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
        else{
        this.status = 'error';
        }
      },
      error => {
      this.status = 'error';
      console.log(<any>error);
      }
    );
    this.IdPerfil = localStorage.getItem("idPerfil");
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
      let endpoint = '/artista'
      let dataAux = this.registroMusico.value;
      
      let dataValues = {
        nombre_artistico: dataAux.nombre_artistico,
        num_integrantes: dataAux.num_integrantes,
        ciudad_origen: dataAux.ciudad_origen,
        dispuesto_salir: dataAux.dispuesto_salir,
        representante: dataAux.representante,
        nombre_representante: dataAux.nombre_representante,
        telefono: dataAux.telefono,
        correo: dataAux.correo,
        descripcion: dataAux.descripcion,
        genero: dataAux.genero,

      };
      //subir musica de soundcloud
      let soundLinks = []
      var soundControls = this.soundFrames.controls;
       for (let control of soundControls) {
        if (control instanceof FormGroup) {
          let soundFrame = control.controls['iframe'].value;
          let soundLink = soundFrame.substring(
            soundFrame.lastIndexOf("src=\"") + 5, 
            soundFrame.lastIndexOf("\"></iframe>")
        );
        //soundLinks.push(soundLink);
        let nameFrame = control.controls['nombre'].value;
        let plataforma = "SoundCloud";
        soundLink = btoa(soundLink);
        console.log(soundLink);
        let linksSouncloud = {
          nombre_cancion: nameFrame,
          plataforma: plataforma,
          link: soundLink,
          perfil_id: this.IdPerfil,
        };
        this._linkService.register(linksSouncloud).subscribe(response =>{
          console.log("ok");
        });

        }
      }
      //subir videos de youtube
      let youLinks = []
      var youControls = this.youFrames.controls;
       for (let control of youControls) {
        if (control instanceof FormGroup) {
          let youFrame = control.controls['iframe'].value;
          let youLink = youFrame.substring(
            youFrame.lastIndexOf("http"), 

            youFrame.lastIndexOf("\" frameborder")
        );
        //soundLinks.push(soundLink);
        let nameFrame = control.controls['nombre'].value;
        let plataforma = "Youtube";
        youLink = btoa(youLink);
        console.log(youLink);
        let linksYoutube = {
          nombre_cancion: nameFrame,
          plataforma: plataforma,
          link: youLink,
          perfil_id: this.IdPerfil,
        };
        this._linkService.register(linksYoutube).subscribe(response =>{
          console.log("ok");
        });
        }
      }
      
      this._userService.actualizarPerfil(this.IdPerfil,dataValues).subscribe(
        response => {
          if(response.status == "success"){
           this.status = response.status;
           this.router.navigate(['perfil/0']);
           console.log("ok");
          }
          else{
           this.status = 'error';
           console.log(this.status);
          }
        },
        error => {
         this.status = 'error';
         console.log(<any>error);
        }
     );
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


      let aux2 = this.fMusico.nombre_artistico.errors
        ? this.fMusico.nombre_artistico.errors.required
        : false;
      let aux3 = this.fMusico.ciudad_origen.errors
        ? this.fMusico.ciudad_origen.errors.required
        : false;
      let aux4 = this.fMusico.nombre_representante.errors
        ? this.fMusico.nombre_representante.errors.required
        : false;
      let aux7 = this.fMusico.correo.errors
        ? this.fMusico.correo.errors.email
        : false;
      let aux8 = this.fMusico.descripcion.errors
        ? this.fMusico.descripcion.errors.required
        : false;
      let aux9 = this.fMusico.pagina_web.errors
        ? this.fMusico.paginaWeb.errors.required
        : false;

      let error =
        aux2 || aux3 || aux4 || aux7 || aux8 || aux9;
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

import { Component, OnInit } from "@angular/core";
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
import { FileValidator } from "../../directives/fileValidator";
import { ConfirmPasswordValidator } from "../../directives/must-match.validator";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  generos = ["Cumbia", "Bachata", "Vallenato", "Rock"];
  id: string;
  title: string;
  usuarioEscogido: any;
  artistaEscogido: any;

  registroUser: FormGroup;
  registroSolista: FormGroup;
  registroDuo: FormGroup;
  registroOrquesta: FormGroup;
  registroInfo: FormGroup;
  formCompleted: Boolean;
  formSelected: Boolean;
  tipoSelected: String;

  isUser: Boolean;
  isMusico: Boolean;
  isSolista: Boolean;
  isDuo: Boolean;
  isInfo: Boolean;
  isOrquesta: Boolean;

  isRegistrar: Boolean;
  isEditar: Boolean;

  showBlack: {};
  showForm: {};
  hideOption: {};
  selectedImg: String;
  userImg: String;
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
    public actionSheetController: ActionSheetController
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params["id"];
      if (params["usuario"]) {
        this.usuarioEscogido = JSON.parse(params["usuario"]);
      }
      if (params["artista"]) {
        this.artistaEscogido = JSON.parse(params["artista"]);
      }
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
    this.isMusico = false;
    this.isRegistrar = false;
    this.isEditar = false;
    this.initForm();
    if (this.id == "0") {
      this.isRegistrar = true;
      this.firstToggle("", "usuario");
      this.title = "REGISTRO DE USUARIO";
    } else if (this.id == "1") {
      this.isRegistrar = true;
      this.firstToggle("", "musico");
      this.title = "REGISTRO DE ARTISTAS";
    } else if (this.id == "2") {
      this.isEditar = true;
      this.editUsuario(this.usuarioEscogido);
      this.firstToggle("", "usuario");
      this.title = "EDITAR USUARIO";
    } else if (this.id == "3") {
      this.isEditar = true;
      this.editArtista(this.artistaEscogido);
      this.toggleForm("", this.artistaEscogido.tipo);
      this.title = "EDITAR ARTISTA";
    }
    this.musicoImg = "assets/REGISTRO/MUSICO.png";
    this.userImg = "assets/REGISTRO/USUARIO.png";
    this.solistaImg = "assets/TIPO DE PERFIL/CANTANTEMUSICO.png";
    this.duoImg = "assets/TIPO DE PERFIL/DUO.png";
    this.orquestaImg = "assets/TIPO DE PERFIL/ORQUESTA.png";
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

  initForm() {
    this.registroUser = new FormGroup(
      {
        nombre: new FormControl("", Validators.required),
        apellido: new FormControl("", Validators.required),
        tlf: new FormControl("", Validators.required),
        correo: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(6)
        ]),
        cpassword: new FormControl("", Validators.required)
      },
      ConfirmPasswordValidator.MatchPassword
    );

    this.registroSolista = new FormGroup({
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
    });

    this.registroDuo = new FormGroup({
      nombreArtistico: new FormControl("", Validators.required),
      salir: new FormControl("", Validators.required),
      ciudadOrigen: new FormControl("", Validators.required),
      tieneRepresentante: new FormControl("", Validators.required),
      nombreRepresentante: new FormControl("", Validators.required),
      telefono: new FormControl("", Validators.required),
      correo: new FormControl("", [Validators.required, Validators.email]),
      descripcion: new FormControl("", Validators.required),
      paginaWeb: new FormControl("", Validators.required)
    });

    this.registroOrquesta = new FormGroup({
      nombreArtistico: new FormControl("", Validators.required),
      numeroIntegrantes: new FormControl("", Validators.required),
      salir: new FormControl("", Validators.required),
      ciudadOrigen: new FormControl("", Validators.required),
      tieneRepresentante: new FormControl("", Validators.required),
      nombreRepresentante: new FormControl("", Validators.required),
      telefono: new FormControl("", Validators.required),
      correo: new FormControl("", [Validators.required, Validators.email]),
      descripcion: new FormControl("", Validators.required),
      paginaWeb: new FormControl("", Validators.required)
    });

    this.registroInfo = new FormGroup({
      generos: new FormControl("", Validators.required),
      imagen1: new FormControl("", [FileValidator.validate]),
      imagen2: new FormControl("", [FileValidator.validate]),
      imagen3: new FormControl("", [
        FileValidator.validate
      ]) /* 
      soundLinks: new FormControl('', Validators.required),
      youLinks: new FormControl('', Validators.required),
      soundNombres: new FormControl('', Validators.required),
      youNombres: new FormControl('', Validators.required), */
    });
  }

  get fUser() {
    return this.registroUser.controls;
  }

  get fSolista() {
    return this.registroSolista.controls;
  }

  get fDuo() {
    return this.registroDuo.controls;
  }

  get fOrquesta() {
    return this.registroOrquesta.controls;
  }

  get fInfo() {
    return this.registroInfo.controls;
  }

  editUsuario(usuario) {
    this.registroUser.controls["nombre"].setValue(usuario.nombre);
    this.registroUser.controls["apellido"].setValue(usuario.apellido);
    this.registroUser.controls["tlf"].setValue(usuario.telefono);
    this.registroUser.controls["correo"].setValue(usuario.correo);
    this.registroUser.controls["correo"].disable();
  }

  editArtista(artista) {
    let tipo = artista.tipo;
    switch (tipo) {
      case "solista":
        this.registroSolista.controls["nombreReal"].setValue(
          artista.nombreReal
        );
        this.registroSolista.controls["nombreArtistico"].setValue(
          artista.nombreArtistico
        );
        this.registroSolista.controls["salir"].setValue(artista.salir);
        this.registroSolista.controls["ciudadOrigen"].setValue(
          artista.ciudadOrigen
        );
        this.registroSolista.controls["tieneRepresentante"].setValue(
          artista.tieneRepresentante
        );
        this.registroSolista.controls["nombreRepresentante"].setValue(
          artista.nombreRepresentante
        );
        this.registroSolista.controls["telefono"].setValue(artista.telefono);
        this.registroSolista.controls["correo"].setValue(artista.correo);
        this.registroSolista.controls["descripcion"].setValue(
          artista.descripcion
        );
        this.registroSolista.controls["paginaWeb"].setValue(artista.paginaWeb);
        break;
      case "duo":
        this.registroDuo.controls["nombreArtistico"].setValue(
          artista.nombreArtistico
        );
        this.registroDuo.controls["salir"].setValue(artista.salir);
        this.registroDuo.controls["ciudadOrigen"].setValue(
          artista.ciudadOrigen
        );
        this.registroDuo.controls["tieneRepresentante"].setValue(
          artista.tieneRepresentante
        );
        this.registroDuo.controls["nombreRepresentante"].setValue(
          artista.nombreRepresentante
        );
        this.registroDuo.controls["telefono"].setValue(artista.telefono);
        this.registroDuo.controls["correo"].setValue(artista.correo);
        this.registroDuo.controls["descripcion"].setValue(artista.descripcion);
        this.registroDuo.controls["paginaWeb"].setValue(artista.paginaWeb);

        break;
      default:
        this.registroOrquesta.controls["nombreArtistico"].setValue(
          artista.nombreArtistico
        );
        this.registroOrquesta.controls["numeroIntegrantes"].setValue(
          artista.numeroIntegrantes
        );
        this.registroOrquesta.controls["salir"].setValue(artista.salir);
        this.registroOrquesta.controls["ciudadOrigen"].setValue(
          artista.ciudadOrigen
        );
        this.registroOrquesta.controls["tieneRepresentante"].setValue(
          artista.tieneRepresentante
        );
        this.registroOrquesta.controls["nombreRepresentante"].setValue(
          artista.nombreRepresentante
        );
        this.registroOrquesta.controls["telefono"].setValue(artista.telefono);
        this.registroOrquesta.controls["correo"].setValue(artista.correo);
        this.registroOrquesta.controls["descripcion"].setValue(
          artista.descripcion
        );
        this.registroOrquesta.controls["paginaWeb"].setValue(artista.paginaWeb);
        break;
    }
  }

  toggleForm(event, tipo) {
    this.formSelected = true;
    let img;
    switch (tipo) {
      case "user":
        this.isUser = true;
        this.isSolista = false;
        this.isDuo = false;
        this.isOrquesta = false;
        img = this.userImg;
        break;
      case "solista":
        this.isUser = false;
        this.isSolista = true;
        this.isDuo = false;
        this.isOrquesta = false;
        img = this.solistaImg;
        break;
      case "duo":
        this.isUser = false;
        this.isSolista = false;
        this.isDuo = true;
        this.isOrquesta = false;
        img = this.duoImg;
        break;
      default:
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
    this.showBlack = {
      blackAct: true
    };

    this.hideOption = {
      hideOption: true
    };
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
    this.showBlack = {
      blackAct: false
    };

    this.hideOption = {
      hideOption: false
    };
  }

  regisGmail() {
    console.log("Going to gmail");
  }

  regisFacebook() {
    console.log("Going to facebook");
  }

  toggleInfo() {
    if (this.catchUserErrors()) {
      this.toggleError();
    } else {
      this.isUser = false;
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
      console.log("REGISTRANDO...");
    }
  }

  editarElemento() {
    if (this.catchUserErrors()) {
      this.toggleError();
    } else {
      console.log("Editando");
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
    if (this.isUser) {
      let aux1 = this.fUser.nombre.errors
        ? this.fUser.nombre.errors.required
        : false;
      let aux2 = this.fUser.correo.errors
        ? this.fUser.correo.errors.required
        : false;
      let aux3 = this.fUser.apellido.errors
        ? this.fUser.apellido.errors.required
        : false;
      let aux4 = this.fUser.tlf.errors ? this.fUser.tlf.errors.required : false;
      let aux5 = this.fUser.password.errors
        ? this.fUser.password.errors.required
        : false;
      let aux6 = this.fUser.password.errors
        ? this.fUser.password.errors.minlength
        : false;
      let error = aux1 || aux2 || aux3 || aux4 || aux5 || aux6;
      return error;
    } else if (this.isSolista) {
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
    } else if (this.isDuo) {
      let aux2 = this.fDuo.nombreArtistico.errors
        ? this.fDuo.nombreArtistico.errors.required
        : false;
      let aux3 = this.fDuo.ciudadOrigen.errors
        ? this.fDuo.ciudadOrigen.errors.required
        : false;
      let aux4 = this.fDuo.nombreRepresentante.errors
        ? this.fDuo.nombreRepresentante.errors.required
        : false;
      let aux5 = this.fDuo.telefono.errors
        ? this.fDuo.telefono.errors.required
        : false;
      let aux6 = this.fDuo.correo.errors
        ? this.fDuo.correo.errors.required
        : false;
      let aux7 = this.fDuo.correo.errors
        ? this.fDuo.correo.errors.email
        : false;
      let aux8 = this.fDuo.descripcion.errors
        ? this.fDuo.descripcion.errors.required
        : false;
      let aux9 = this.fDuo.paginaWeb.errors
        ? this.fDuo.paginaWeb.errors.required
        : false;

      let error = aux2 || aux3 || aux4 || aux5 || aux6 || aux7 || aux8 || aux9;
      return error;
    } else if (this.isOrquesta) {
      let aux2 = this.fOrquesta.nombreArtistico.errors
        ? this.fOrquesta.nombreArtistico.errors.required
        : false;
      let aux3 = this.fOrquesta.ciudadOrigen.errors
        ? this.fOrquesta.ciudadOrigen.errors.required
        : false;
      let aux4 = this.fOrquesta.nombreRepresentante.errors
        ? this.fOrquesta.nombreRepresentante.errors.required
        : false;
      let aux5 = this.fOrquesta.telefono.errors
        ? this.fOrquesta.telefono.errors.required
        : false;
      let aux6 = this.fOrquesta.correo.errors
        ? this.fOrquesta.correo.errors.required
        : false;
      let aux7 = this.fOrquesta.correo.errors
        ? this.fOrquesta.correo.errors.email
        : false;
      let aux8 = this.fOrquesta.descripcion.errors
        ? this.fOrquesta.descripcion.errors.required
        : false;
      let aux9 = this.fOrquesta.paginaWeb.errors
        ? this.fOrquesta.paginaWeb.errors.required
        : false;

      let error = aux2 || aux3 || aux4 || aux5 || aux6 || aux7 || aux8 || aux9;
      return error;
    }
  }

  fileProgress(fileInput, imagen) {
    let registro = this;
    let file = fileInput.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = function() {
        switch (imagen) {
          case "imagen1":
            registro.fileName1 = file.name;
            registro.file1 = reader.result;
            break;
          case "imagen2":
            registro.fileName2 = file.name;
            registro.file2 = reader.result;
            break;
          default:
            registro.fileName3 = file.name;
            registro.file3 = reader.result;
            break;
        }
        //me.modelvalue = reader.result;
        console.log(reader.result);
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

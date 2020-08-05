import { CommonService } from "../../services/common.service";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { ActionSheetController } from "@ionic/angular";
import { DbHandlerService } from "../../services/db-handler.service";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";
import { UserService } from "../../services/user.service";
import { FormUsuariosComponent } from "../form-usuarios/form-usuarios.component";

@Component({
  selector: "app-lista-artistas",
  templateUrl: "./lista-artistas.component.html",
  styleUrls: ["./lista-artistas.component.scss"],
  providers: [UserService, FormUsuariosComponent]
})
export class ListaArtistasComponent implements OnInit {
  artistas: any;
  fields: any;
  buscarArtista: FormGroup;
  listData: any;
  selectedTitle: any;

  constructor(
    private router: Router,
    private dbHandler: DbHandlerService,
    private actionSheetController: ActionSheetController,
    private common: CommonService,
    private _userService: UserService,
    private _usuarioComponent: FormUsuariosComponent
  ) {}

  ngOnInit() {
    this.selectedTitle = "Lista de Artistas";
    this._userService.listaArtistas().subscribe(data => {
      this.artistas = data["user"];
      this.fields = ["Id", "Nombre", "Apellido", "Correo", "Teléfono"];
      this.listData = [];
      this.artistas.forEach(artista => {
        let aux = {
          id: artista.id,
          nombre: artista.nombre,
          apellido: artista.apellido,
          correo: artista.correo,
          telefono: artista.telefono
        };
        this.listData.push(aux);
      });
    });
    this.initForm();
  }

  editarElemento(id) {
    let idArtista = id;
    this.router.navigate(["editarusuario"]);
    return this._usuarioComponent.initForm(1, idArtista);
  }
  estado(usuario,estado){
    let dataValues = {
      estado : estado
    };
    this._userService.actualizarUsuario(usuario,dataValues).subscribe(response => {
      console.log(response);
    });
  }

  initForm() {
    this.buscarArtista = new FormGroup({
      nombre: new FormControl(""),
      genero: new FormControl("")
    });
  }

  filtrarArtista() {
    let dataAux = this.buscarArtista.value;

    let endpoint = `/perfiles/nombre/${dataAux.nombre}`;

    this.dbHandler.getSomething(endpoint).then((data: any) => {
      // data is already a JSON object
      if (!data.status) {
        let errorMsg = data.msg;
        this.toggleError(errorMsg);
      } else {
        this.artistas = data;
      }
    });
  }

  habilitarArtista(event) {}

  editarArtista(event) {
    let artista = this.artistas[event];
    artista = JSON.stringify(artista);
    this.router.navigate(["/editarartista", { artista: artista }]);
  }

  eliminarArtista(event) {
    let id = event.id;
    let endpoint = `/perfiles/delete/${id}`;
    this.dbHandler.deleteSomething(endpoint).then((data: any) => {
      // data is already a JSON object
      if (!data.status) {
        let errorMsg = data.msg;
        this.toggleError(errorMsg);
      } else {
        this.ngOnInit();
      }
    });
  }

  async toggleError(msg) {
    let actionSheet = await this.actionSheetController.create({
      header: msg,
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
}

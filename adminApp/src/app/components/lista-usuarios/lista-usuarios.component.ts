import { CommonService } from "../../services/common.service";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
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
  selector: "app-lista-usuarios",
  templateUrl: "./lista-usuarios.component.html",
  styleUrls: ["./lista-usuarios.component.scss"],
  providers: [UserService, FormUsuariosComponent]
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: any;

  @Output()
  editar = new EventEmitter<any>();

  fields: any;
  buscarUsuario: FormGroup;
  listData: any;
  selectedTitle: any;
  constructor(
    private router: Router,
    private dbHandler: DbHandlerService,
    private common: CommonService,
    private actionSheetController: ActionSheetController,
    private _userService: UserService,
    private _usuarioComponent: FormUsuariosComponent
  ) {}

  ngOnInit() {
    this.selectedTitle = "Lista de Usuarios";
    this._userService.listaUsuarios().subscribe(data => {
      this.usuarios = data["user"];
      this.fields = ["Id", "Nombre", "Apellido", "Correo", "Teléfono"];
      this.listData = [];
      this.usuarios.forEach(usuario => {
        let aux = {
          id: usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
          telefono: usuario.telefono
        };
        this.listData.push(aux);
      });
    });
    this.initForm();

    /* let endpoint = `/usuarios`
      this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.usuarios = data;
        }
      }); */
  }
  editarElemento(id) {
    let iduser = id;
    this.router.navigate(["editarusuario"]);
    return this._usuarioComponent.initForm(1, iduser);
  }
  getData() {
    this._userService.listaUsuarios().subscribe(data => {
      let usuarios = data["user"];
      return usuarios;
    });
  }

  initForm() {
    this.buscarUsuario = new FormGroup({
      nombre: new FormControl(""),
      apellido: new FormControl(""),
      correo: new FormControl("")
    });
  }

  filtrarUsuario() {
    let dataAux = this.buscarUsuario.value;

    let endpoint = `/usuarios/nombre/${dataAux.nombre}`;

    this.dbHandler.getSomething(endpoint).then((data: any) => {
      // data is already a JSON object
      if (!data.status) {
        let errorMsg = data.msg;
        this.toggleError(errorMsg);
      } else {
        this.usuarios = data;
      }
    });
  }
  habilitarUsuario(event) {}

  editarUsuarios(event) {
    let user = this.usuarios[event];
    user = JSON.stringify(user);
    this.router.navigate(["/editarusuario", { user: user }]);
  }

  eliminarUsuario(event) {
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

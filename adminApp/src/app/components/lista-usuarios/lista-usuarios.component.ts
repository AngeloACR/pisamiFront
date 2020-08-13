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
  ) {
    this.initForm(); //ESTO DEBE IR DE PRIMERO
  }

  async ngOnInit() {
    this.selectedTitle = "Lista de Usuarios";
    await this.common.showLoader();
    this._userService.listaUsuarios().subscribe(data => {
      this.common.hideLoader();
      this.usuarios = data["user"];
      
    });

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
  disableNombre(){
    this.buscarUsuario.controls['correo'].setValue("");
    this.buscarUsuario.controls['apellido'].setValue("");
    this.buscarUsuario.controls['nombre'].enable();
  }
  disableApellido(){

    this.buscarUsuario.controls['correo'].setValue("");
    this.buscarUsuario.controls['nombre'].setValue("");
    this.buscarUsuario.controls['apellido'].enable();
  }
  disableCorreo(){
    this.buscarUsuario.controls['nombre'].setValue("");
    this.buscarUsuario.controls['apellido'].setValue("");
    this.buscarUsuario.controls['correo'].enable();
  }
  async estado(usuario, estado) {
    let dataValues = {
      estado: estado
    };
    await this.common.showLoader();
    this._userService
      .actualizarUsuario(usuario, dataValues)
      .subscribe(response => {
        this.common.hideLoader();
        this.ngOnInit();
      });
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
   
    if(this.buscarUsuario.controls['nombre'].value != ""){
      var filtro = "nombre";
      var value = this.buscarUsuario.controls['nombre'].value;
    }
    else if(this.buscarUsuario.controls['apellido'].value != ""){
      var filtro = "apellido";
      var value = this.buscarUsuario.controls['apellido'].value;
    }
    else{
    var filtro = "correo";
      var value = this.buscarUsuario.controls['correo'].value;
    }
    this.selectedTitle = "Lista de Usuarios";
    this._userService.userBy(filtro,value).subscribe(data => {
      this.usuarios = data["user"];
      
    });

  }
  habilitarUsuario(event) {}

  editarUsuarios(event) {
    let user = this.usuarios[event];
    user = JSON.stringify(user);
    this.router.navigate(["/editarusuario", { user: user }]);
  }

  async eliminarUsuario(event) {
    let id = event.id;
    let endpoint = `/perfiles/delete/${id}`;
    await this.common.showLoader();
    this.dbHandler.deleteSomething(endpoint).then((data: any) => {
      this.common.hideLoader();
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

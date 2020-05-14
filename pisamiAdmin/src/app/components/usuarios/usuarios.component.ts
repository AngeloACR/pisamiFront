import { Component, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { forkJoin } from "rxjs";
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.scss"]
})
export class UsuariosComponent implements OnInit {
  id: string;
  title: string;
  registroUsuario: FormGroup;
  buscarUsuario: FormGroup;
  usuarios: any;
  usuarioEscogido: any;

  isEditar: Boolean;
  isListar: Boolean;

  formCompleted: Boolean;
  formSelected: Boolean;
  tipoSelected: String;
  showBlack: {};
  showForm: {};
  hideOption: {};

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController   
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params["id"];
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == "usuarios") {
          console.log(this.id);
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }
      });
    });
  }

  ngOnInit() {
    this.usuarios = [
      {
        id: "539524",
        nombre: "Juanito",
        apellido: "Alimaña",
        correo: "juanitoalimaña@gmail.com",
        telefono: "553-6989597"
      },
      {
        id: "539524",
        nombre: "Juanito",
        apellido: "Alimaña",
        correo: "juanitoalimaña@gmail.com",
        telefono: "553-6989597"
      }
    ];

    this.initForm();
    if (this.id == "0") {
      this.isEditar = true;
      this.isListar = false;
      this.title = "CREAR USUARIO";
    } else if (this.id == "1") {
      this.isEditar = false;
      this.isListar = true;
      this.title = "LISTA DE USUARIOS";
    }
  }

  initForm() {
    this.registroUsuario = new FormGroup({});
    this.buscarUsuario = new FormGroup({
      nombre: new FormControl(""),
      apellido: new FormControl(""),
      correo: new FormControl("")
    });
  }



  endRegistro() {}

  filtrarUsuario() {}

  editarUsuario(event, usuario) {
    let aux = JSON.stringify(usuario)
    this.router.navigate(['/registro/2', { usuario: aux }]);
  }

  async habilitarUsuario(event, usuario, habilitar) {
    let actionSheet;
    if (habilitar == 0) {
    actionSheet = await this.actionSheetController.create({
      header: '¿Seguro que desea deshabilitar este elemento?',
      buttons: [{
        text: 'DESHABILITAR',
        icon: 'close-circle',
        handler: () => {
          console.log('DESHANILITANDO');
          console.log(usuario);
        }
      }, {
        text: 'CANCELAR',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('CANCELANDO...');
        }
      }]
    });
    } else if (habilitar == '1') {
    actionSheet = await this.actionSheetController.create({
      header: '¿Seguro que desea habilitar este elemento?',
      buttons: [{
        text: 'HABILITAR',
        icon: 'checkmark-circle',
        handler: () => {
          console.log('HABILITANDO');
          console.log(usuario);
        }
      }, {
        text: 'CANCELAR',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('CANCELANDO...');
        }
      }]
    });
    }
    await actionSheet.present();
  }


}

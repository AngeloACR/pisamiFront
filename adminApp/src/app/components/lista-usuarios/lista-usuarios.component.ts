import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { ActionSheetController } from "@ionic/angular";
import { DbHandlerService } from "../../services/db-handler.service";

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: any;
  fields: any;
  buscarUsuario: FormGroup;

  constructor(
    private dbHandler: DbHandlerService,
    private actionSheetController: ActionSheetController,
  ) { }

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

    let endpoint = `/usuarios`
      this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.usuarios = data;
        }
      });
    this.fields = [
      'Id', 'Nombre', 'Apellido', 'Correo', 'Teléfono'      
    ]    
    this.initForm();
  }

  initForm() {
    this.buscarUsuario = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      correo: new FormControl(''),
    });
  
  }

  filtrarUsuario() {
    let dataAux = this.buscarUsuario.value;
    
    let endpoint = `/usuarios/nombre/${dataAux.nombre}`

    this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.usuarios = data;
        }
      });
  }
  habilitarUsuario(event){
    
  }

  editarUsuario(event){
    
  }

  eliminarUsuario(event){
        let id = event.id;
    let endpoint = `/perfiles/delete/${id}`;
        this.dbHandler.deleteSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.ngOnInit();
        }
      });
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

}

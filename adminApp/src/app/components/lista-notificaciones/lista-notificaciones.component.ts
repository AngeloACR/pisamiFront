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
  selector: 'app-lista-notificaciones',
  templateUrl: './lista-notificaciones.component.html',
  styleUrls: ['./lista-notificaciones.component.scss'],
})
export class ListaNotificacionesComponent implements OnInit {

  notificaciones: any;
  fields: any;
  buscarNotificacion: FormGroup;
  
  constructor(
    private dbHandler: DbHandlerService,
    private actionSheetController: ActionSheetController,
  ) { }


  ngOnInit() {
    this.notificaciones = [{
      id: '29384',
      nombre: 'BIENVENIDO',
      },{
      id: '29385',
      nombre: 'EXPULSADO', 
      }, {
      id: '29386',
      nombre: 'ENCUENTRO VALLENATERO', 
      }, {
      id: '29387',
      nombre: 'ENCUENTRO DEL POP'
      }
    ];    
    let endpoint = `/notificaciones`    
    
    this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.notificaciones = data;
        }
      });  
    this.fields = [
      'Id', 'Nombre'
    ];
    this.initForm();
  }

  initForm() {
    this.buscarNotificacion = new FormGroup({
      nombre: new FormControl(''),
    });
  
  }

  filtrarNotificacion() {
  }

    habilitarNotificacion(event){
    
  }

  editarNotificacion(event){
    let dataAux = this.buscarNotificacion.value;
    
    let endpoint = `/notificaciones/nombre/${dataAux.nombre}`

    this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.notificaciones = data;
        }
      });    
  }

  eliminarNotificacion(event){
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

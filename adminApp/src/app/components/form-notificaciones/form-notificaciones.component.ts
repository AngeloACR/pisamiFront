import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { DbHandlerService } from "../../services/db-handler.service";

@Component({
  selector: 'app-form-notificaciones',
  templateUrl: './form-notificaciones.component.html',
  styleUrls: ['./form-notificaciones.component.scss'],
})
export class FormNotificacionesComponent implements OnInit {
  @Input()
  editMode: number;

  @Input()
  notificacion: any;

  registroNotificacion: FormGroup;

  constructor(
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    public dbHandler: DbHandlerService   
  ) {
   }

  ngOnInit() {
    this.initForm(this.editMode);
  }


  initForm(editMode) {
    this.registroNotificacion = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });

    if(editMode){
      this.registroNotificacion.controls['nombre'].setValue(this.notificacion.nombre);
      this.registroNotificacion.controls['descripcion'].setValue(this.notificacion.descripcion);
    }
  }

    get fNotificacion() { 
      return this.registroNotificacion.controls;
     }


  endRegistro() {
    if(this.catchUserErrors()){
      let msg ="Hay errores en el formulario. Por favor, revíselo e intente de nuevo"
      this.toggleError(msg);
    } else{
      console.log('Registro');
            let endpoint = '/notificaciones'
      let dataAux = this.registroNotificacion.value;
      let dataValues = {
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
    }
  }

  endUpdate() {
    if (this.catchUserErrors()) {
      let msg ="Hay errores en el formulario. Por favor, revíselo e intente de nuevo"
      this.toggleError(msg);
    } else {
      console.log("Registrando");
      let endpoint = '/notificaciones'
      let dataAux = this.registroNotificacion.value;
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

    catchUserErrors(){
        let aux1 = this.fNotificacion.nombre.errors ? this.fNotificacion.nombre.errors.required : false;
        let aux2 = this.fNotificacion.descripcion.errors ? this.fNotificacion.descripcion.errors.required : false;
        let error = aux1 || aux2;
        return error
      
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';

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
    public actionSheetController: ActionSheetController   
  ) {
   }

  ngOnInit() {
    this.initForm(this.editMode);
  }


  initForm() {
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
      this.toggleError();
    } else{
      console.log('Registro')
    }
  }


   async toggleError() {
    let actionSheet = await this.actionSheetController.create({
      header: 'Hay errores en el formulario. Por favor, revíselo e intente de nuevo',
      buttons: [{
        text: 'VOLVER',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('CANCELANDO...');
        }
      }]
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

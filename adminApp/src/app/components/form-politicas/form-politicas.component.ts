import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-form-politicas',
  templateUrl: './form-politicas.component.html',
  styleUrls: ['./form-politicas.component.scss'],
})
export class FormPoliticasComponent implements OnInit {
  @Input()
  editMode: number;

  @Input()
  politica: any;

  registroPolitica: FormGroup;

  constructor(
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController   
  ) {
   }

  ngOnInit() {
    this.initForm(this.editMode);
  }


  initForm(editMode) {
    this.registroPolitica = new FormGroup({
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });

    if(editMode){
      this.registroPolitica.controls['nombre'].setValue(this.politica.nombre);
      this.registroPolitica.controls['id'].setValue(this.politica.id);
    }
  }

  get fPolitica() { 
      return this.registroPolitica.controls;
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
        let aux1 = this.fPolitica.nombre.errors ? this.fPolitica.nombre.errors.required : false;
        let aux2 = this.fPolitica.id.errors ? this.fPolitica.id.errors.required : false;
        let error = aux1 || aux2;
        return error
      
  }
}

import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-form-generos',
  templateUrl: './form-generos.component.html',
  styleUrls: ['./form-generos.component.scss'],
})
export class FormGenerosComponent implements OnInit {
  @Input()
  editMode: number;

  @Input()
  genero: any;

  id: string;
  title: string;
  generos: any;

  registroGenero: FormGroup;

  constructor(
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController   
  ) { }

  ngOnInit() {
    this.initForm(this.editMode)
  }

  initForm(editMode) {
    this.registroGenero = new FormGroup({
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });

    if(editMode){
      this.registroGenero.controls['id'].setValue(this.genero.id);
      this.registroGenero.controls['nombre'].setValue(this.genero.nombre);
      this.registroGenero.controls['descripcion'].setValue(this.genero.descripcion);
    }
  
  }

  get fGenero() { 
    return this.registroGenero.controls;
  }


  endRegistro() {
     if(this.catchUserErrors()){
      this.toggleError();
    } else{  
      console.log('Registrando')
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
        let aux1 = this.fGenero.nombre.errors ? this.fGenero.nombre.errors.required : false;
        let aux2 = this.fGenero.descripcion.errors ? this.fGenero.descripcion.errors.required : false;
        let aux3 = this.fGenero.id.errors ? this.fGenero.id.errors.required : false;
        let error = aux1 || aux2 || aux3;
        return error
      
  }

}

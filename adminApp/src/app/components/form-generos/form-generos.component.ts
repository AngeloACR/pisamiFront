import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { DbHandlerService } from "../../services/db-handler.service";
import { GenreService } from 'src/app/services/genres.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-generos',
  templateUrl: './form-generos.component.html',
  styleUrls: ['./form-generos.component.scss'],
  providers : [GenreService]
})
export class FormGenerosComponent implements OnInit {
  @Input()
  editMode: number;

  @Input()
  genero: any;

  id: string;
  title: string;
  generos: any;
  status;

  registroGenero: FormGroup;

  constructor(
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    private dbHandler: DbHandlerService,
    private _genreService: GenreService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initForm(this.editMode)
  }

  initForm(editMode) {
    this.registroGenero = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });

    if(editMode){
      this.registroGenero.controls['nombre'].setValue(this.genero.nombre);
      this.registroGenero.controls['descripcion'].setValue(this.genero.descripcion);
    }
  
  }

  get fGenero() { 
    return this.registroGenero.controls;
  }


  endRegistro() {
     if(this.catchUserErrors()){
      let msg ="Hay errores en el formulario. Por favor, revíselo e intente de nuevo"
      this.toggleError(msg);
    } else{  
      console.log('Registrando');
            let endpoint = '/generos'
      let dataAux = this.registroGenero.value;
      let dataValues = {
        nombre: dataAux.nombre,
        descripcion: dataAux.descripcion,
      };

      this._genreService.addGenre(dataValues).subscribe(
        response => {
          if(response.status != 'error'){
            console.log(response);
            this.status = 'success';
          }
          else{
            this.status = 'error';
  
          }
        },
        error => {
          this.status = 'error';
          console.log(<any>error)
        }
      );
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
      let endpoint = '/generos'
      let dataAux = this.registroGenero.value;
      let dataValues = {
        id: this.genero.id,
        nombre: dataAux.nombre,
        descripcion: dataAux.descripcion,
      };
      this._genreService.updateGenre(dataValues).subscribe(
        response => {
          if(response.status != 'error'){
            console.log(response);
            this.status = 'success';
          }
          else{
            this.status = 'error';
  
          }
        },
        error => {
          this.status = 'error';
          console.log(<any>error)
        }
      );
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
        let aux1 = this.fGenero.nombre.errors ? this.fGenero.nombre.errors.required : false;
        let aux2 = this.fGenero.descripcion.errors ? this.fGenero.descripcion.errors.required : false;
        let error = aux1 || aux2;
        return error
      
  }

}

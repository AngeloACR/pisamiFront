import { CommonService } from "../../services/common.service";
import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { DbHandlerService } from "../../services/db-handler.service";
import { GenreService } from 'src/app/services/genres.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';


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
  generoId;

  registroGenero: FormGroup;

  constructor(
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    private dbHandler: DbHandlerService,
    private common: CommonService,
    private _genreService: GenreService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.initForm(this.editMode)
    if(this.editMode == 1){
      if(JSON.parse(localStorage.getItem('generoEdit'))){
        this.generoId = JSON.parse(localStorage.getItem('generoEdit'));
        localStorage.removeItem("generoEdit");
        this._genreService.genreById(this.generoId).subscribe(data =>{
          console.log(data);
          let genero = data['genero'];
          this.registroGenero.controls['nombre'].setValue(genero.nombre);
          this.registroGenero.controls['descripcion'].setValue(genero.descripcion);        
        });
      }
    }
  }

  initForm(editMode,generoId?) {
    this.registroGenero = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });

    if(generoId){
      localStorage.setItem('generoEdit',generoId);
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
        nombre: dataAux.nombre,
        descripcion: dataAux.descripcion,
      };
      this._genreService.updateGenre(this.generoId,dataValues).subscribe(
        response => {
          if(response.status != 'error'){
            this.router.navigate(['listageneros']);
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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css'],
})
export class GenerosComponent implements OnInit {

  id: string;
  title: string;
  generos: any;
  generoEscogido: any;

  registroGenero: FormGroup;
  buscarGenero: FormGroup;

  isCrear: Boolean;
  isListar: Boolean;
  isEditar: Boolean;

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
      this.id = params['id'];
      if (params['genero']) {
        this.generoEscogido = JSON.parse(params['genero']);
      }
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == 'generos') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.isEditar = false;
    this.generos = [{
      id: '29384',
      nombre: 'Cumbia',
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      },{
      id: '29385',
      nombre: 'Bachata', 
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      }, {
      id: '29386',
      nombre: 'Vallenato', 
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      }, {
      id: '29387',
      nombre: 'Rock',
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      }
    ]
    this.initForm();
    if (this.id == '0') {
      this.isCrear = true;
      this.isListar = false;
      this.title = 'CREAR GÉNERO MUSICAL';
    } else if (this.id == '1') {
      this.isCrear = false;
      this.isListar = true;
      this.title = 'LISTA DE GÉNEROS MUSICALES';
    } else if (this.id == '2') {
      this.isCrear = false;
      this.isListar = false;
      this.isEditar = true;
      this.title = 'EDITAR GÉNERO';
      this.editForm(this.generoEscogido)
    }
  }

  initForm() {
    this.registroGenero = new FormGroup({
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });
    this.buscarGenero = new FormGroup({
      nombre: new FormControl(''),
    });
  
  }

    get fGenero() { 
      return this.registroGenero.controls;
     }


  editForm(elemento){
    this.registroGenero.controls['nombre'].setValue(elemento.nombre);
    this.registroGenero.controls['id'].setValue(elemento.id);
    this.registroGenero.controls['descripcion'].setValue(elemento.descripcion);
  }


  endRegistro() {
     if(this.catchUserErrors()){
      this.toggleError();
    } else{  
      console.log('Registrando')
    }
  }


  filtrarGenero() {
  }

  editarGenero(event, genero) {
    if(this.catchUserErrors()){
      this.toggleError();
    } else{ 
      let aux = JSON.stringify(genero)
      this.router.navigate(['/generos/2', { genero: aux }]);
    }
  }


  async eliminarGenero(event, genero){
    const actionSheet = await this.actionSheetController.create({
      header: '¿Seguro que desea eliminar este elemento?',
      buttons: [{
        text: 'ELIMINAR',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('ELIMINANDO...');
          console.log(genero);
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
    await actionSheet.present();
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

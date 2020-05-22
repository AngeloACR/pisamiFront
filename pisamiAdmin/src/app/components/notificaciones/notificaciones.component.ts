import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
})
export class NotificacionesComponent implements OnInit {
  id: string;
  title: string;
  registroNotificacion: FormGroup;
  buscarNotificacion: FormGroup;
  notificaciones: any;
  notificacionEscogida: any;

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
      if (params['notificacion']) {
        this.notificacionEscogida = JSON.parse(params['notificacion']);
      }
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == 'notificaciones') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() { 
    this.isEditar = false;
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
    ]
    this.initForm();
    if (this.id == '0') {
      this.isCrear = true;
      this.isListar = false;
      this.title = 'CREAR NOTIFICACIÓN';
    } else if (this.id == '1') {
      this.isCrear = false;
      this.isListar = true;
      this.title = 'LISTA DE NOTIFICACIONES';
    } else if (this.id == '2') {
      this.isCrear = false;
      this.isListar = false;
      this.isEditar = true;
      this.title = 'EDITAR NOTIFICACIÓN';
      this.editForm(this.notificacionEscogida)
    }
  }

  initForm() {
    this.registroNotificacion = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });
    this.buscarNotificacion = new FormGroup({
      nombre: new FormControl(''),
    });

  }

    get fNotificacion() { 
      return this.registroNotificacion.controls;
     }

  editForm(elemento){
    this.registroNotificacion.controls['nombre'].setValue(elemento.nombre);
    this.registroNotificacion.controls['descripcion'].setValue(elemento.descripcion);
  }


  endRegistro() {
    if(this.catchUserErrors()){
      this.toggleError();
    } else{
      console.log('Registro')
    }
  }

  filtrarNotificacion() {
  }

  editarNotificacion(event, notificacion) {
    if(this.catchUserErrors()){
      this.toggleError();
    } else{ 
      let aux = JSON.stringify(notificacion)
      this.router.navigate(['/notificaciones/2', { notificacion: aux }]);
    }
  }

  async eliminarNotificacion(event, notificacion){
    const actionSheet = await this.actionSheetController.create({
      header: '¿Seguro que desea eliminar este elemento?',
      buttons: [{
        text: 'ELIMINAR',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('ELIMINANDO...');
          console.log(notificacion);
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
        let aux1 = this.fNotificacion.nombre.errors ? this.fNotificacion.nombre.errors.required : false;
        let aux2 = this.fNotificacion.descripcion.errors ? this.fNotificacion.descripcion.errors.required : false;
        let error = aux1 || aux2;
        return error
      
  }

}

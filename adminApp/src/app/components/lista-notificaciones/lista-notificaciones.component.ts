import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-lista-notificaciones',
  templateUrl: './lista-notificaciones.component.html',
  styleUrls: ['./lista-notificaciones.component.scss'],
})
export class ListaNotificacionesComponent implements OnInit {

  notificaciones: any;
  fields: any;
  buscarNotificacion: FormGroup;

  constructor() { }

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
    
  }

  eliminarNotificacion(event){
    
  }

}

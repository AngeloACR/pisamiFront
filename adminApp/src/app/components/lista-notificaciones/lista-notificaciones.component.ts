import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-notificaciones',
  templateUrl: './lista-notificaciones.component.html',
  styleUrls: ['./lista-notificaciones.component.scss'],
})
export class ListaNotificacionesComponent implements OnInit {

  notificaciones: any;
  fields: any;

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

  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-notificaciones',
  templateUrl: './registro-notificaciones.component.html',
  styleUrls: ['./registro-notificaciones.component.scss'],
})
export class RegistroNotificacionesComponent implements OnInit {
  selectedTitle: any;
  constructor() { }

  ngOnInit() {
        this.selectedTitle = 'Registro de Notificación'
  }

}

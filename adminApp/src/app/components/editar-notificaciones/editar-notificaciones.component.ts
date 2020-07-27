import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-editar-notificaciones',
  templateUrl: './editar-notificaciones.component.html',
  styleUrls: ['./editar-notificaciones.component.scss'],
})
export class EditarNotificacionesComponent implements OnInit {
  notificacion: any;
  selectedTitle
  constructor(
    private actRoute: ActivatedRoute,
  ) { 
this.actRoute.params.subscribe(params => {
      if (params['notificacion']) {
        this.notificacion = JSON.parse(params['notificacion']);
      }
    });    
  }

  ngOnInit() {
        this.selectedTitle = 'Editar Notificación'
  }

}

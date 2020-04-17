import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';

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

  isCrear: Boolean;
  isListar: Boolean;

  formCompleted: Boolean;
  formSelected: Boolean;
  tipoSelected: String;
  showBlack: {};
  showForm: {};
  hideOption: {};

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
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
    this.initForm();
    if (this.id == '0') {
      this.isCrear = true;
      this.isListar = false;
      this.title = 'CREAR NOTIFICACIÓN';
    } else if (this.id == '1') {
      this.isCrear = false;
      this.isListar = true;
      this.title = 'LISTA DE NOTIFICACIONES';
    }
  }

  initForm() {
    this.registroNotificacion = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
    });
    this.buscarNotificacion = new FormGroup({
      nombre: new FormControl(''),
    });

  }


  endRegistro() {
  }

  filtrarNotificacion() {
  }

}

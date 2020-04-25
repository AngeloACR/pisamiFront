import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  id: string;

  actualizarUser: FormGroup;

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
        if (url == 'perfil') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.actualizarUser = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      tlf: new FormControl(''),
      correo: new FormControl(''),
      password: new FormControl(''),
    });
  }

  endActualizacion() {
    console.log('Finalizando actualizacion');
  }

}

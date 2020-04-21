import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.css'],
})
export class PoliticasComponent implements OnInit {
  id: string;
  title: string;
  registroPolitica: FormGroup;
  buscarPolitica: FormGroup;

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
        if (url == 'politicas') {
          console.log(this.id)
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
      this.title = 'CREAR POLÍTICA';
    } else if (this.id == '1') {
      this.isCrear = false;
      this.isListar = true;
      this.title = 'LISTA DE POLÍTICAS';
    }
  }

  initForm() {
    this.registroPolitica = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
    });
    this.buscarPolitica = new FormGroup({
      nombre: new FormControl(''),
    });

  }


  endRegistro() {
  }

  filtrarPolitica() {
  }

}
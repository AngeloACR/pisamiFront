import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css'],
})
export class GenerosComponent implements OnInit {

  id: string;

  registroGenero: FormGroup;
  buscarGenero: FormGroup;

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
        if (url == 'generos') {
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
    } else if (this.id == '1') {
      this.isCrear = false;
      this.isListar = true;
    }
  }

  initForm() {
    this.registroGenero = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
    });
    this.buscarGenero = new FormGroup({
      nombre: new FormControl(''),
    });
  
  }


  endRegistro() {
  }

  filtrarGenero() {
  }

}

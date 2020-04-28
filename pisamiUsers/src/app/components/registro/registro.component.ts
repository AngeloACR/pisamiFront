import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {

  id: string;
  generos = ['Cumbia', 'Bachata', 'Vallenato', 'Rock'];

  registroUser: FormGroup;
  registroSolista: FormGroup;
  registroDuo: FormGroup;
  registroOrquesta: FormGroup;
  registroInfo: FormGroup;

  formCompleted: Boolean;
  formSelected: Boolean;
  tipoSelected: String;
  isUser: Boolean;
  isMusico: Boolean;
  isSolista: Boolean;
  isDuo: Boolean;
  isInfo: Boolean;
  isOrquesta: Boolean;
  showBlack: {};
  showForm: {};
  hideOption: {};
  selectedImg: String;
  userImg: String;
  musicoImg: String;
  solistaImg: String;
  duoImg: String;
  orquestaImg: String;

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
        if (url == 'registro') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.isMusico = false;
    this.initForm();
    this.musicoImg = 'assets/REGISTRO/MUSICO.png';
    this.userImg = 'assets/REGISTRO/USUARIO.png';
    this.solistaImg = 'assets/TIPO DE PERFIL/CANTANTEMUSICO.png';
    this.duoImg = 'assets/TIPO DE PERFIL/DUO.png';
    this.orquestaImg = 'assets/TIPO DE PERFIL/ORQUESTA.png';
  }

  initForm() {
    this.registroUser = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      tlf: new FormControl(''),
      correo: new FormControl(''),
      password: new FormControl(''),
    });

    this.registroSolista = new FormGroup({
      nombreReal: new FormControl(''),
      nombreArtistico: new FormControl(''),
      salir: new FormControl(''),
      ciudadOrigen: new FormControl(''),
      tieneRepresentante: new FormControl(''),
      nombreRepresentante: new FormControl(''),
      telefono: new FormControl(''),
      correo: new FormControl(''),
      descripcion: new FormControl(''),
      paginaWeb: new FormControl(''),
    });

    this.registroDuo = new FormGroup({
      nombreArtistico: new FormControl(''),
      salir: new FormControl(''),
      ciudadOrigen: new FormControl(''),
      tieneRepresentante: new FormControl(''),
      nombreRepresentante: new FormControl(''),
      telefono: new FormControl(''),
      correo: new FormControl(''),
      descripcion: new FormControl(''),
      paginaWeb: new FormControl(''),
    });

    this.registroOrquesta = new FormGroup({
      numeroIntegrantes: new FormControl(''),
      salir: new FormControl(''),
      ciudadOrigen: new FormControl(''),
      tieneRepresentante: new FormControl(''),
      nombreRepresentante: new FormControl(''),
      telefono: new FormControl(''),
      correo: new FormControl(''),
      descripcion: new FormControl(''),
      paginaWeb: new FormControl(''),
    });

    this.registroInfo = new FormGroup({
      generos: new FormControl(''),
      imagen1: new FormControl(''),
      imagen2: new FormControl(''),
      imagen3: new FormControl(''),
      soundLinks: new FormControl(''),
      youLinks: new FormControl(''),
      soundNombres: new FormControl(''),
      youNombres: new FormControl(''),
    });


  }

  toggleForm(event, tipo) {
    this.formSelected = true;
    let img;
    switch (tipo) {
      case 'user':
        this.isUser = true;
        this.isSolista = false;
        this.isDuo = false;
        this.isOrquesta = false;
        img = this.userImg;
        break;
      case 'solista':
        this.isUser = false;
        this.isSolista = true;
        this.isDuo = false;
        this.isOrquesta = false;
        img = this.solistaImg;
        break;
      case 'duo':
        this.isUser = false;
        this.isSolista = false;
        this.isDuo = true;
        this.isOrquesta = false;
        img = this.duoImg;
        break;
      default:
        this.isUser = false;
        this.isSolista = false;
        this.isDuo = false;
        this.isOrquesta = true;
        img = this.orquestaImg;
        break;
    }

    this.selectedImg = img;
    this.tipoSelected = tipo;
    this.showForm = {
      formAct: true
    }
    this.showBlack = {
      blackAct: true
    }

    this.hideOption = {
      hideOption: true
    }
  }

  firstToggle(event, tipo) {
    switch (tipo) {
      case 'usuario':
        this.toggleForm(event, 'user');
        break;
      default:
        this.isMusico = true;
        break;
    }
  }

  closeForm() {
    this.showForm = {
      formAct: false
    }
    this.showBlack = {
      blackAct: false
    }

    this.hideOption = {
      hideOption: false
    }
  }

  regisGmail() {
    console.log('Going to gmail');
  }

  regisFacebook() {
    console.log('Going to facebook');
  }

  toggleInfo() {

    this.isUser = false;
    this.isSolista = false;
    this.isDuo = false;
    this.isOrquesta = false;
    this.isInfo = true;
  }

  endRegistro(event, tipo) {
    console.log(tipo);
  }

}

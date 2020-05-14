import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { FileValidator } from '../../directives/fileValidator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {

  generos = ['Cumbia', 'Bachata', 'Vallenato', 'Rock'];
  id: string;
  title: string;
  usuarioEscogido: any;
  artistaEscogido: any;

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
  
  isRegistrar: Boolean;
  isEditar: Boolean;

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
      if (params['usuario']) {
        this.usuarioEscogido = JSON.parse(params['usuario']);
      }
      if (params['artista']) {
        this.artistaEscogido = JSON.parse(params['artista']);
      }
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
    this.isRegistrar = false;
    this.isEditar = false;
    this.initForm();
    if (this.id == '0') {
    this.isRegistrar = true;
      this.firstToggle('', 'usuario');
      this.title = 'REGISTRO DE USUARIO';
    } else if (this.id == '1') {
    this.isRegistrar = true;
      this.firstToggle('', 'musico');
      this.title = 'REGISTRO DE ARTISTAS';
    }else if (this.id == '2') {
    this.isEditar = true;
      this.editUsuario(this.usuarioEscogido);
      this.firstToggle('', 'usuario');
      this.title = 'EDITAR USUARIO';
    } else if (this.id == '3') {
    this.isEditar = true;
      this.editArtista(this.artistaEscogido)
      this.firstToggle('', 'musico');
      this.title = 'EDITAR ARTISTA';
    }
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
      imagen1: new FormControl('', [FileValidator.validate]),
      imagen2: new FormControl('', [FileValidator.validate]),
      imagen3: new FormControl('', [FileValidator.validate]),
      soundLinks: new FormControl(''),
      youLinks: new FormControl(''),
      soundNombres: new FormControl(''),
      youNombres: new FormControl(''),
    });

  }

  editUsuario(usuario){
    this.registroUser.controls['nombre'].setValue(usuario.nombre);
    this.registroUser.controls['apellido'].setValue(usuario.apellido);
    this.registroUser.controls['tlf'].setValue(usuario.telefono);
    this.registroUser.controls['correo'].setValue(usuario.correo);
    this.registroUser.controls['correo'].disable();
  }

  editArtista(artista){
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

  endRegistro() {
    console.log("Registrando");
  }

  editarElemento(){
    console.log("Editando");
  }


}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  id: string;
  title: string;
  registroUsuario: FormGroup;
  buscarUsuario: FormGroup;
  usuarios: any;

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
        if (url == 'usuarios') {
          console.log(this.id)
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.usuarios = [{
      id: '539524',
      nombre: 'Juanito',
      apellido: 'Alimaña',
      correo: 'juanitoalimaña@gmail.com',
      telefono: '553-6989597',
    }, {
      id: '539524',
      nombre: 'Juanito',
      apellido: 'Alimaña',
      correo: 'juanitoalimaña@gmail.com',
      telefono: '553-6989597',
    }]


    this.initForm();
    if (this.id == '0') {
      this.isCrear = true;
      this.isListar = false;
      this.title = 'CREAR USUARIO';
    } else if (this.id == '1') {
      this.isCrear = false;
      this.isListar = true;
      this.title = 'LISTA DE USUARIOS';
    }
  }

  initForm() {
    this.registroUsuario = new FormGroup({
    });
    this.buscarUsuario = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      correo: new FormControl(''),
    });

  }


  endRegistro() {
  }

  filtrarUsuario() {
  }

  editarUsuario(event, usuario) {
  }

  habilitarUsuario(event, habilitar) {
    console.log(habilitar)
    if (habilitar == 0) {
      console.log('Deshabilitar')
    } else if (this.id == '1') {
      console.log('Habilitar')
    }
  }

}

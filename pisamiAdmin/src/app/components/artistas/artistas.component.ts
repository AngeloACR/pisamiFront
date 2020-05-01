import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss'],
})
export class ArtistasComponent implements OnInit {
  id: string;
  title: string;
  registroArtista: FormGroup;
  buscarArtista: FormGroup;
  artistas: any;
  generos = ['Cumbia', 'Bachata', 'Vallenato', 'Rock'];

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
        if (url == 'artistas') {
          console.log(this.id)
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.artistas = [{
      id: '2587956',
      nombre: 'Los Bacanos',
      categorias: 'Bachata, cumbia, salsa',
      telefono: '085-98921454',
      correo: 'banda@musica.com',
    }, {
      id: '8587956',
      nombre: 'Los cantautores',
      categorias: 'Reggaeton, rock, metal',
      telefono: '085-98921454',
      correo: 'banda@musica.com',
    }]    
    this.initForm();
    if (this.id == '0') {
      this.isCrear = true;
      this.isListar = false;
      this.title = 'CREAR ARTISTA';
    } else if (this.id == '1') {
      this.isCrear = false;
      this.isListar = true;
      this.title = 'LISTA DE ARTISTAS';
    }
  }

  initForm() {
    this.registroArtista = new FormGroup({
    });
    this.buscarArtista = new FormGroup({
      nombre: new FormControl(''),
      genero: new FormControl(''),
    });

  }


  endRegistro() {
  }

  filtrarArtista() {
  }

  editarArtista(event, usuario) {
  }

  habilitarArtista(event, artista, habilitar) {
    console.log(habilitar)
    if (habilitar == 0) {
      console.log('Deshabilitar')
    } else if (this.id == '1') {
      console.log('Habilitar')
    }
  }

}

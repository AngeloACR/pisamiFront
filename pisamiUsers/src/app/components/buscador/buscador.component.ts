import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {

  id: string;
  generos = ['Cumbia', 'Bachata', 'Vallenato', 'Rock'];

  artistas: any;
  artistaEscogido: any;
  buscarArtista: FormGroup;

  isBuscar: Boolean;
  isVer: Boolean;
  isResultados: Boolean;

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
      if (params['artista']) {
        this.artistaEscogido = JSON.parse(params['artista']);
      }
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == 'buscador') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.artistas = [{
      nombre: 'Los Bacanos',
      categorias: 'Bachata, cumbia, salsa',
      ciudad: 'Ibagué',
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      integrantes: 4,
      salen: 'Si',
      representante: 'Juanito Alimaña',
      telefono: '085-98921454',
      correo: 'banda@musica.com',
      rating: 3,
      soundCanciones: [{
        nombre: 'La papa quemada',
        link: 'https://soundcloud.com/xxxxxxxx'}, {
        nombre: 'Caminos distantes',
        link: 'https://soundcloud.com/xxxxxxxx',
      }],
      youCanciones: [{
        nombre: 'La papa quemada',
        link: 'https://youtube.com/xxxxxxxx'}, {
        nombre: 'Caminos distantes',
        link: 'https://youtube.com/xxxxxxxx',
      }],
    }, {
      nombre: 'Los cantautores',
      categorias: 'Reggaeton, rock, metal',
      ciudad: 'Ibagué',
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      integrantes: 4,
      salen: 'Si',
      representante: 'Juanito Alimaña',
      telefono: '085-98921454',
      correo: 'banda@musica.com',
      rating: 4,
      soundCanciones: [{
        nombre: 'La papa quemada',
        link: 'https://soundcloud.com/xxxxxxxx'}, {
        nombre: 'Caminos distantes',
        link: 'https://soundcloud.com/xxxxxxxx',
      }],
      youCanciones: [{
        nombre: 'La papa quemada',
        link: 'https://youtube.com/xxxxxxxx'}, {
        nombre: 'Caminos distantes',
        link: 'https://youtube.com/xxxxxxxx',
      }],
    }]
    this.initForm();
    if (this.id == '0') {
      this.isBuscar = true;
      this.isResultados = false;
      this.isVer = false;
    } else if (this.id == '1') {
      this.isResultados = true;
      this.isVer = false;
      this.isBuscar = false;
    } else if (this.id == '2') {
      this.isVer = true;
      this.isResultados = false;
      this.isBuscar = false;
    }
  }

   trackByFn(index, item) {
    console.log("tracking")
    console.log(index);
    console.log(item);
  }
  initForm() {
    this.buscarArtista = new FormGroup({
      genero: new FormControl(''),
      nombre: new FormControl(''),
    });

  }

  endBuscador() {
    this.router.navigateByUrl('/buscador/1');
  }

  volverLista() {
    this.router.navigateByUrl('/buscador/1');
  }

  verArtista(event, artista) {
    let aux = JSON.stringify(artista)
    this.router.navigate(['/buscador/2', { artista: aux }]);
  }

  filtrarGenero() {
  }

}

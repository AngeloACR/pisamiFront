import { Component, OnInit } from '@angular/core';
import {GenreService} from "../../services/genres.service";
import {UserService} from "../../services/user.service";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UrlSegment } from '@angular/router';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
  providers: [GenreService,UserService],
})
export class BuscadorComponent implements OnInit {

  artistas: any;
  artistaEscogido: any;
  isVer: boolean;
  isBuscar: boolean;
  selectedTitle: any;
  isResultados: boolean;
  generos;
  buscarArtista: FormGroup;

  constructor(
    private _genreService : GenreService,
    private _userService : UserService
  ) { }

  ngOnInit() {
        this.selectedTitle = 'Búsqueda'
    this.isBuscar = true;
    this.isVer = false;
    this.isResultados = false;
    this._genreService.listGenre().subscribe(response => {
      this.generos = response['generos'];
    });
    this.initForm();
  }
  initForm(){
    this.buscarArtista = new FormGroup({
      genero: new FormControl(''),
      nombre: new FormControl(''),
    });
  }

  abrirResultados(){
    this.selectedTitle = 'Resultados de Búsqueda'
    let dataAux = this.buscarArtista.value;
    if(dataAux.genero){
      this._userService.perfilBy("genero",dataAux.genero).subscribe(response =>{
        this.artistas = response['perfiles'];
      });
    }
    else if(dataAux.nombre){
      this._userService.perfilBy("nombre_artistico",dataAux.nombre).subscribe(response =>{
        this.artistas = response['perfiles'];
        console.log(this.artistas);
      });
    }
    
    //this.artistas = resultados;
    this.isBuscar = false;
    this.isVer = false;
    this.isResultados = true;
  }

  volverResultados(){
    //this.abrirResultados(this.artistas)
  }

  mostrarArtista(artista){
    this.selectedTitle = 'Perfil del Artista'
    this.artistaEscogido = artista;
    this.isBuscar = false;
    this.isVer = true;
    this.isResultados = false;
  }

  verMusica(){
        this.selectedTitle = 'Música del Artista'
  }

  verVideos(){
        this.selectedTitle = 'Videos del Artista'
  }

  verPerfil(){
        this.selectedTitle = 'Perfil del Artista'
  }

}

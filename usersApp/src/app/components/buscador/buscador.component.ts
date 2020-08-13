import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../services/common.service";
import {GenreService} from "../../services/genres.service";
import {UserService} from "../../services/user.service";
import {FotoService} from "../../services/foto.service";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UrlSegment } from '@angular/router';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
  providers: [GenreService,UserService,FotoService],
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
  foto;
  url;
  artista: any;
  fotoPerfil: any;

  constructor(
    private _genreService : GenreService,
    private _userService : UserService,
    private _fotoService : FotoService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.selectedTitle = "Búsqueda";
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
    this.url = "http://localhost:8000/api/";
    let dataAux = this.buscarArtista.value;
    if(dataAux.genero){
      this._userService.perfilBy("genero",dataAux.genero).subscribe(response =>{
        this.artistas = response['perfiles'];
        console.log(response['perfiles'].id);
        this._fotoService.listById(response['perfiles'].id).subscribe(response =>{
          //this.foto = response['fotos'][0].foto;
        });
      });
    }
    else if(dataAux.nombre){
      this._userService.perfilBy("nombre_artistico",dataAux.nombre).subscribe(response =>{
        this.artistas = response['perfiles'];
        console.log(response['perfiles'].id);
        this._fotoService.listById(response['perfiles'].id).subscribe(response =>{
          //this.foto = response['fotos'][0].foto;
        });
        console.log(this.foto) 
        console.log(this.artistas[0].fotos);
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
    this._userService.perfilBy("id",artista).subscribe(response =>{
      let perfiles = response['perfiles'][0];
      if(perfiles.dispuesto_salir == 1){
        perfiles.salen = "si";
      }
      else{
        perfiles.salen = "no";
      }
      this._genreService.genreById(response['perfiles'][0].genero).subscribe(response =>{
        perfiles.genero_musical = response['genero'].nombre;
      });
      this._fotoService.listById(perfiles.id).subscribe(response =>{
        this.fotoPerfil = response['fotos'][0].foto;
      });
      this.artistaEscogido = perfiles;
      console.log(this.artistaEscogido);
    });
    this.isBuscar = false;
    this.isVer = true;
    this.isResultados = false;
  }

  verMusica() {
    this.selectedTitle = "Música del Artista";
  }

  verVideos() {
    this.selectedTitle = "Videos del Artista";
  }

  verPerfil() {
    this.selectedTitle = "Perfil del Artista";
  }
}

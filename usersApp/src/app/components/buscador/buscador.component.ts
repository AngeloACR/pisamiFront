import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../services/common.service";
import { FavoritoService } from "../../services/favorito.service";
import {GenreService} from "../../services/genres.service";
import {UserService} from "../../services/user.service";
import {FotoService} from "../../services/foto.service";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UrlSegment } from '@angular/router';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
  providers: [GenreService,UserService,FotoService,FavoritoService],
})
export class BuscadorComponent implements OnInit {
  artistas: any;
  artistaEscogido: any;
  isVer: boolean;

  isVideos: boolean;
  isCanciones: boolean;
  hideBox: {};
  isBuscar: boolean;
  selectedTitle: any;
  isResultados: boolean;
  generos;
  buscarArtista: FormGroup;
  foto;
  url;
  artista: any;
  fotoPerfil: any;
  fotoid = 0;
  currentImageIndex: number;
  isStartOfList: boolean;
  isEndOfList: boolean;
  currentImage: any;
  videos;
  musica;
  perfil;
  userId;
  isFav: number;

  constructor(
    private _genreService : GenreService,
    private _userService : UserService,
    private _fotoService : FotoService,
    private _favoritoService : FavoritoService,
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
    this.artistaEscogido = null;
    this.url = "http://localhost:8000/api/";
    let dataAux = this.buscarArtista.value;
    if(dataAux.genero){
      this._userService.perfilBy("genero",dataAux.genero).subscribe(response =>{
        this.artistas = response['perfiles'];
        console.log(response['perfiles']);
      });
    }
    else if(dataAux.nombre){
      this._userService.perfilBy("nombre_artistico",dataAux.nombre).subscribe(response =>{
        this.artistas = response['perfiles'];
        console.log(response['perfiles']);
      });
    }
    
    //this.artistas = resultados;
    this.isBuscar = false;
    this.isVer = false;
    this.isResultados = true;
  }
  agregarFavorito(perfilId){
    let userId = JSON.parse(localStorage.getItem('identity'));
    userId = userId.userId;
    this._favoritoService.addFavorito(perfilId,userId).subscribe(response =>{
      console.log(response);
    });
    this.isFav = 1;
    this.common.showAlert("Agregado a favoritos");
  }
  volverResultados(){
    //this.abrirResultados(this.artistas)
  }

  mostrarArtista(artista){
    this.selectedTitle = 'Perfil del Artista'
    this.userId = artista;
    this._userService.perfilBy("id",artista).subscribe(response =>{
      let perfiles = response['perfiles'][0];
      let authId = JSON.parse(localStorage.getItem('identity')).userId;
      this._favoritoService.isfav(authId,this.userId).subscribe(response =>{
        if(response.status == 1){
          this.isFav = 1
        }
        else{
          this.isFav = 0;
        }
      });
      if(perfiles.dispuesto_salir == 1){
        perfiles.salen = "si";
      }
      else{
        perfiles.salen = "no";
      }
      this.artistaEscogido = perfiles;
      this.currentImage = perfiles.fotos[0].foto;
      this.currentImageIndex = 0;
      console.log(this.artistaEscogido);
    });
    this.isBuscar = false;
    this.isVer = true;
    this.isResultados = false;
  }

  verMusica() {
    this.selectedTitle = "Música del Artista";
  }

  /*verVideos() {
    this.selectedTitle = "Videos del Artista";
  }*/

  verPerfil() {
    this.selectedTitle = "Perfil del Artista";
  }
  prev() {
    this.currentImageIndex -= 1;
    if (this.currentImageIndex == 0) {
      this.isStartOfList = true;
    }
    this.isEndOfList = false;
    console.log(this.currentImageIndex);
    this.currentImage = this.artistaEscogido.fotos[this.currentImageIndex].foto;
  }

  next() {
    this.currentImageIndex += 1;
    let finalIndex = this.artistaEscogido.fotos.length - 1;
    if (this.currentImageIndex == finalIndex) {
      this.isEndOfList = true;
    }
    this.isStartOfList = false;
    console.log(this.currentImageIndex);
    this.currentImage = this.artistaEscogido.fotos[this.currentImageIndex].foto;
  }







  mostrarVideos() {
    this.isCanciones = false;
    this.isVideos = true;
    this.hideBox = {
      hideBox: true
    };
    this.videos.emit();
  }
  mostrarCanciones() {
    this.isCanciones = true;
    this.isVideos = false;
    this.hideBox = {
      hideBox: true
    };
    this.musica.emit();
  }
  mostrarPerfil() {
    this.isCanciones = false;
     this.isVideos = false;
     this.hideBox = {
       hideBox: false
     };
     this.mostrarArtista(this.userId);
   }

}

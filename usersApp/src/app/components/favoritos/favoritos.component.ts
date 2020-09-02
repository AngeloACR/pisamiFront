import { CommonService } from "../../services/common.service";
import { UserService } from "../../services/user.service";
import { GenreService } from "../../services/genres.service";
import { FotoService } from "../../services/foto.service";
import { Component, OnInit } from '@angular/core';
import { FavoritoService } from 'src/app/services/favorito.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
  providers: [FavoritoService,UserService,FotoService,GenreService]
})
export class FavoritosComponent implements OnInit {

  artistas: any;
  artistaEscogido: any;
  isLista: boolean;
  isDetalle: boolean;
  selectedTitle: any;
  isResultados: boolean;
  fotoPerfil: any;
  foto;
  url;
  currentImageIndex: number;
  isStartOfList: boolean;
  isEndOfList: boolean;
  currentImage: any;
  isVideos: boolean;
  isCanciones: boolean;
  hideBox: {};

  constructor(
    private common: CommonService,
    private _favoritoService: FavoritoService,
    private _userService: UserService,
    private _genreService: GenreService,
    private _fotoService: FotoService,
  ) { }
  ngOnInit() {
    this.selectedTitle = 'Favoritos'
    this.isLista = true;
    this.isDetalle = false;
    this.url = "http://localhost:8000/api/";
    //AQUI VA EL GET ARTISTAS FAVORITOS
    let userId = JSON.parse(localStorage.getItem('identity'));
    userId = userId.userId;
    this._favoritoService.favoritosById(userId).subscribe(response => {
      response["favoritos"].forEach(response => {
        this._userService.perfilBy("id",response.perfil_id).subscribe(respuesta => {
          this.artistas = respuesta['perfiles'];
          console.log(this.artistas);
      });
      });
    },
    error => {
      this.common.showAlert("Error al registrar usuario");
      console.log(<any>error);
    }
    );

  }

  
  abrirResultados(resultados){
  }

  volverLista(){    
    this.selectedTitle = 'Favoritos'
    this.isDetalle = false;
    this.isLista = true;
  }

  verArtista(artista){
    this.selectedTitle = 'Perfil del Artista'
    this.isLista = false;
    this.isDetalle = true;
    this.isResultados = false;
    this._userService.perfilBy("id",artista).subscribe(response =>{
      let perfiles = response['perfiles'][0];
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
  mostrarCanciones() {
    this.isCanciones = true;
    this.isVideos = false;
    this.hideBox = {
      hideBox: true
    };
  }
  mostrarVideos() {
    this.isCanciones = false;
    this.isVideos = true;
    this.hideBox = {
      hideBox: true
    };
  }


}

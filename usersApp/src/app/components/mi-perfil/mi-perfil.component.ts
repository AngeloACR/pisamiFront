import { CommonService } from "../../services/common.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { FavoritoService } from "../../services/favorito.service";
import {GenreService} from "../../services/genres.service";
import {UserService} from "../../services/user.service";
import {FotoService} from "../../services/foto.service";

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
  providers:[GenreService,UserService,FotoService,FavoritoService]
})
export class MiPerfilComponent implements OnInit {
  artistaEscogido: any;
  @Output()
  volver = new EventEmitter<any>();

  @Output()
  musica = new EventEmitter<any>();

  @Output()
  videos = new EventEmitter<any>();

  @Output()
  perfil = new EventEmitter<any>();
  isVer:boolean;
  isVideos: boolean;
  isCanciones: boolean;
  hideBox: {};
  rating:number;
  isEndOfList: boolean;
  isStartOfList: boolean;
  currentImageIndex: number;
  currentImage: string;
  imageList: [];
  fotoPerfil: any;
  selectedTitle:any;
  url:any;
  fotoid;

  constructor(
    private common: CommonService,
    private sanitizer: DomSanitizer, 
    private _favorito : FavoritoService,
    private _genreService : GenreService,
    private _userService : UserService,
    private _fotoService : FotoService,
    private _favoritoService : FavoritoService,
    ) {}

  ngOnInit() {
   /* this.isVideos = false;
    this.isCanciones = false;
    this.isStartOfList = true;
    this.isEndOfList = false;
    this.currentImageIndex = 0;
    this.currentImage = this.artistaEscogido.imagenes[this.currentImageIndex];
    this.hideBox = {
      hideBox: false
    };*/
    this.mostrarPerfil();
    console.log(this.rating);
 
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

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  mostrarResultados() {
    this.volver.emit();
  }

  volverLista() {
    console.log("Volver a resultados");
    //this.router.navigateByUrl('/buscador/');
  }

  agregarFavorito(perfilId){
    let userId = JSON.parse(localStorage.getItem('identity'));
    userId = userId.userId;
    this._favorito.addFavorito(perfilId,userId).subscribe(response =>{
      console.log(response);
    });
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
    this.perfil.emit()
    this.url = "http://localhost:8000/api/";
    this.selectedTitle = 'Perfil del Artista'
    let userId = JSON.parse(localStorage.getItem('identity'));
    userId = userId.userId;
    this._userService.perfilBy("usuario_id",userId).subscribe(response =>{ 
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
    this.isVer = true;
  }

  mostrarVideos() {
    this.isCanciones = false;
    this.isVideos = true;
    this.hideBox = {
      hideBox: true
    };
    this.videos.emit();
  }

}

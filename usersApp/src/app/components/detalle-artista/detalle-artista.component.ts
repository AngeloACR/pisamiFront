import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-artista',
  templateUrl: './detalle-artista.component.html',
  styleUrls: ['./detalle-artista.component.scss'],
})
export class DetalleArtistaComponent implements OnInit {

  @Input()
  artistaEscogido: any;

  @Output()
  volver = new EventEmitter<any>();

  @Output()
  musica = new EventEmitter<any>();

  @Output()
  videos = new EventEmitter<any>();

  @Output()
  perfil = new EventEmitter<any>();

  isVideos: boolean;
  isCanciones: boolean;
  hideBox: {};


  isEndOfList: boolean;
  isStartOfList: boolean;
  currentImageIndex: number;
  currentImage: string;
  imageList: [];

  constructor(
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.isVideos = false;
    this.isCanciones = false;
    this.isStartOfList = true;
    this.isEndOfList = false;
    this.currentImageIndex = 0;
    this.currentImage = this.artistaEscogido.imagenes[this.currentImageIndex];
    this.hideBox = {
      hideBox: false
    }
  }


  prev(){
    this.currentImageIndex -= 1;
    if(this.currentImageIndex == 0){
      this.isStartOfList = true;
    }
    this.isEndOfList = false;
    console.log(this.currentImageIndex)
    this.currentImage = this.artistaEscogido.imagenes[this.currentImageIndex];
  }

  next(){
    this.currentImageIndex += 1;
    let finalIndex =  this.artistaEscogido.imagenes.length - 1;
    if(this.currentImageIndex == finalIndex){
      this.isEndOfList = true;
    }
    this.isStartOfList = false;
    console.log(this.currentImageIndex)
    this.currentImage = this.artistaEscogido.imagenes[this.currentImageIndex];
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  mostrarResultados() {
    this.volver.emit();
  }


  volverLista() {
    console.log('Volver a resultados');
    //this.router.navigateByUrl('/buscador/');
  }

  mostrarCanciones(){
    this.isCanciones = true;
    this.isVideos = false;
    this.hideBox = {
      hideBox: true
    }
    this.musica.emit()
  }

  mostrarPerfil(){
    this.isCanciones = false;
    this.isVideos = false;
    this.hideBox = {
      hideBox: false
    }
    this.perfil.emit();
  }

  mostrarVideos(){
    this.isCanciones = false;
    this.isVideos = true;
    this.hideBox = {
      hideBox: true
    }
    this.videos.emit()
  }

}

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


  isEndOfList: boolean;
  isStartOfList: boolean;
  currentImageIndex: number;
  currentImage: string;
  imageList: [];

  constructor(
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.isStartOfList = true;
    this.isEndOfList = false;
    this.currentImageIndex = 0;
    this.currentImage = this.artistaEscogido.imagenes[this.currentImageIndex];
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

}

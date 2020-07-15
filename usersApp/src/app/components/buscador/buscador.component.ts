import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {

  artistas: any;
  artistaEscogido: any;
  isVer: boolean;
  isBuscar: boolean;
  selectedTitle: any;
  isResultados: boolean;

  constructor() { }

  ngOnInit() {
        this.selectedTitle = 'Búsqueda'
    this.isBuscar = true;
    this.isVer = false;
    this.isResultados = false;
  }

  abrirResultados(resultados){
        this.selectedTitle = 'Resultados de Búsqueda'
    this.artistas = resultados;
    this.isBuscar = false;
    this.isVer = false;
    this.isResultados = true;
  }

  volverResultados(){
    this.abrirResultados(this.artistas)
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

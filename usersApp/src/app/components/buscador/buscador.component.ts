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
  isResultados: boolean;

  constructor() { }

  ngOnInit() {
    this.isBuscar = true;
    this.isVer = false;
    this.isResultados = false;
  }

  abrirResultados(resultados){
    this.artistas = resultados;
    this.isBuscar = false;
    this.isVer = false;
    this.isResultados = true;
  }

  volverResultados(){
    this.abrirResultados(this.artistas)
  }

  mostrarArtista(artista){
    this.artistaEscogido = artista;
    this.isBuscar = false;
    this.isVer = true;
    this.isResultados = false;
  }

}

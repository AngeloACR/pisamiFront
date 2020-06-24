import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-buscador-canciones',
  templateUrl: './buscador-canciones.component.html',
  styleUrls: ['./buscador-canciones.component.scss'],
})
export class BuscadorCancionesComponent implements OnInit {
  
  canciones: any;
  buscarCanciones: FormGroup;
  isResultados: boolean;

  @Output()
  volver = new EventEmitter<any>();

  @Output()
  verVideos = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.isResultados = false;
    this.initForm();
    this.canciones = [{
        nombre: 'La Flaca',
        link: 'https://soundcloud.com/xxxxxxxx'}, {
        nombre: 'La Flaca',
        link: 'https://soundcloud.com/xxxxxxxx',
      }];
  }

  initForm() {
    this.buscarCanciones = new FormGroup({
      nombre: new FormControl(''),
    });

  }

  mostrarVideos(){
    this.verVideos.emit()
  }
  mostrarPerfil(){
    this.volver.emit()
  }

  buscar(){
    this.isResultados = true;    
  }

}

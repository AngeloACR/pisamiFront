import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.scss'],
})
export class CancionesComponent implements OnInit {

  @Input()
  canciones: any;
  
  @Output()
  volver = new EventEmitter<any>();

  @Output()
  verVideos = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  mostrarVideos(){
    this.verVideos.emit()
  }
  mostrarPerfil(){
    this.volver.emit()
  }

}

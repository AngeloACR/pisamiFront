import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  @Input()
  fields: any;

  @Input()
  values: any;

  @Input()
  isHabilitar: boolean;

  @Output()
  editar = new EventEmitter<any>();

  @Output()
  habilitar = new EventEmitter<any>();

  @Output()
  eliminar = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  editarElemento(event, value){
    this.editar.emit(value);
  }

  habilitarElemento(event, value, habilitar){
    let response = {
      value: value,
      habilitar: habilitar
    }
    this.habilitar.emit(response);    
  }

  eliminarElemento(event, value){
    this.eliminar.emit(value);    
  }

}

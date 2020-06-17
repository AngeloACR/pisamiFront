import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-lista-generos',
  templateUrl: './lista-generos.component.html',
  styleUrls: ['./lista-generos.component.scss'],
})
export class ListaGenerosComponent implements OnInit {

  generos: any;
  fields: any;
  buscarGenero: FormGroup;

  constructor() { }

  ngOnInit() {
    this.generos = [{
      id: '29384',
      nombre: 'Cumbia',
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      },{
      id: '29385',
      nombre: 'Bachata', 
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      }, {
      id: '29386',
      nombre: 'Vallenato', 
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      }, {
      id: '29387',
      nombre: 'Rock',
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      }
    ];
    this.fields = [
      'Id', 'Nombre', 'Descripción'
    ]    
    this.initForm();
  }

  initForm() {
    this.buscarGenero = new FormGroup({
      nombre: new FormControl(''),
    });
  
  }

  filtrarGenero() {
  }

  habilitarGenero(event){
    
  }

  editarGenero(event){
    
  }

  eliminarGenero(event){
    
  }


}

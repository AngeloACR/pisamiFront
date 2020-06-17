import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-lista-politicas',
  templateUrl: './lista-politicas.component.html',
  styleUrls: ['./lista-politicas.component.scss'],
})
export class ListaPoliticasComponent implements OnInit {

  politicas: any;
  fields: any;
  buscarPolitica: FormGroup;
  
  constructor() { }

  ngOnInit() {
    this.politicas = [{
      id: '29384',
      nombre: 'TRATO DE DATOS PERSONALES',
      },{
      id: '29385',
      nombre: 'COMPROMISO CON EL USUARIO', 
      }, {
      id: '29386',
      nombre: 'COMPROMISO CON EL MUSICO', 
      }, {
      id: '29387',
      nombre: 'COMPROMISO CON EL ADMINISTRADOR'
      }
    ];
    this.fields = [
      'Id', 'Nombre'
    ];    
    this.initForm();
  }

  initForm() {
    this.buscarPolitica = new FormGroup({
      nombre: new FormControl(''),
    });
  
  }

  filtrarPolitica() {
  }
  habilitarPolitica(event){
    
  }

  editarPolitica(event){
    
  }

  eliminarPolitica(event){
    
  }

}

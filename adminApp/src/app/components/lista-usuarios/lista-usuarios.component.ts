import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: any;
  fields: any;
  buscarUsuario: FormGroup;

  constructor() { }

  ngOnInit() {
    this.usuarios = [
      {
        id: "539524",
        nombre: "Juanito",
        apellido: "Alimaña",
        correo: "juanitoalimaña@gmail.com",
        telefono: "553-6989597"
      },
      {
        id: "539524",
        nombre: "Juanito",
        apellido: "Alimaña",
        correo: "juanitoalimaña@gmail.com",
        telefono: "553-6989597"
      }
    ];
    this.fields = [
      'Id', 'Nombre', 'Apellido', 'Correo', 'Teléfono'      
    ]    
    this.initForm();
  }

  initForm() {
    this.buscarUsuario = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      correo: new FormControl(''),
    });
  
  }

  filtrarUsuario() {
  }
  habilitarUsuario(event){
    
  }

  editarUsuario(event){
    
  }

  eliminarUsuario(event){
    
  }


}

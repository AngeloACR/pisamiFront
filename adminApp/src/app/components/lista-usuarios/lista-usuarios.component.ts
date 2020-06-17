import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: any;
  fields: any;

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
  }

}

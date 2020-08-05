import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.scss'],
})
export class RegistroUsuariosComponent implements OnInit {
        selectedTitle: any;
        tipoUsuario;
  constructor() { }

  ngOnInit() {
        this.selectedTitle = 'Registro de Usuario'
        this.tipoUsuario = 2;
  }

}

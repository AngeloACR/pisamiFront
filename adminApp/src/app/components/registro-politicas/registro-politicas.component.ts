import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-politicas',
  templateUrl: './registro-politicas.component.html',
  styleUrls: ['./registro-politicas.component.scss'],
})
export class RegistroPoliticasComponent implements OnInit {
  selectedTitle: any;
  constructor() { }

  ngOnInit() {
        this.selectedTitle = 'Registro de Política'
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-generos',
  templateUrl: './registro-generos.component.html',
  styleUrls: ['./registro-generos.component.scss'],
})
export class RegistroGenerosComponent implements OnInit {
  selectedTitle: any
  constructor() { }

  ngOnInit() {
        this.selectedTitle = 'Registro de Género'
  }

}

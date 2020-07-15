import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-politica',
  templateUrl: './politica.component.html',
  styleUrls: ['./politica.component.scss'],
})
export class PoliticaComponent implements OnInit {
  selectedTitle: any;

  constructor() { }

  ngOnInit() {
        this.selectedTitle = 'Políticas'
  }

}

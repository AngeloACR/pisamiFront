import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-editar-politicas',
  templateUrl: './editar-politicas.component.html',
  styleUrls: ['./editar-politicas.component.scss'],
})
export class EditarPoliticasComponent implements OnInit {
  politica: any;

  constructor(
    private actRoute: ActivatedRoute,

  ) {
    this.actRoute.params.subscribe(params => {
      if (params['politica']) {
        this.politica = JSON.parse(params['politica']);
      }
    });
   }

  ngOnInit() {}

}

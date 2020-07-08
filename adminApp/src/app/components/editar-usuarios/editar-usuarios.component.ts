import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.scss'],
})
export class EditarUsuariosComponent implements OnInit {
  user: any;

  constructor(
    private actRoute: ActivatedRoute,

  ) {
    this.actRoute.params.subscribe(params => {
      if (params['user']) {
        this.user = JSON.parse(params['user']);
      }
    });
   }

  ngOnInit() {
    console.log(this.user);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-editar-artistas',
  templateUrl: './editar-artistas.component.html',
  styleUrls: ['./editar-artistas.component.scss'],
})
export class EditarArtistasComponent implements OnInit {
  artista: any;

  constructor(
    private actRoute: ActivatedRoute,

  ) {
    this.actRoute.params.subscribe(params => {
      if (params['artista']) {
        this.artista = JSON.parse(params['artista']);
      }
    });
   }

  ngOnInit() {}

}

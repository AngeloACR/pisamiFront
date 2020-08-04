import { CommonService } from "../../services/common.service";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-resultados-buscador',
  templateUrl: './resultados-buscador.component.html',
  styleUrls: ['./resultados-buscador.component.scss'],
})
export class ResultadosBuscadorComponent implements OnInit {

@Input()
artistas: any;


@Output()
artistaEscogido = new EventEmitter<any>();

  constructor(
    private common: CommonService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {}

  verArtista(event, artista) {
    this.artistaEscogido.emit(artista);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}

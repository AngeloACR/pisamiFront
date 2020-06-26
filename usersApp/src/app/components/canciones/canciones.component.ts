import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.scss'],
})
export class CancionesComponent implements OnInit {

  @Input()
  canciones: any;
  
  @Output()
  volver = new EventEmitter<any>();

  @Output()
  verVideos = new EventEmitter<any>();

  constructor(
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {}

  mostrarVideos(){
    this.verVideos.emit()
  }
  mostrarPerfil(){
    this.volver.emit()
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

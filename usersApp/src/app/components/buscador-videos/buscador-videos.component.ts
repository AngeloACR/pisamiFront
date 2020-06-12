import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-buscador-videos',
  templateUrl: './buscador-videos.component.html',
  styleUrls: ['./buscador-videos.component.scss'],
})
export class BuscadorVideosComponent implements OnInit {

  videos: any;
  buscarVideos: FormGroup;
  isResultados: boolean;

  @Output()
  volver = new EventEmitter<any>();

  @Output()
  verCanciones = new EventEmitter<any>();

  constructor(
    private sanitizer: DomSanitizer
    ) { }


  ngOnInit() {
    this.isResultados = false;
    this.initForm();
    this.videos = [{
        nombre: 'La Flaca',
        link: 'https://soundcloud.com/xxxxxxxx'}, {
        nombre: 'La Flaca',
        link: 'https://soundcloud.com/xxxxxxxx',
      }];
          this.videos.forEach(video => {
      let videoLink = video.link;
      let videoId = videoLink.split('watch?v=')[1];
      let videoEmbed = `https://www.youtube.com/embed/${videoId}`
      video.link = videoEmbed
    });
  }

  initForm() {
    this.buscarVideos = new FormGroup({
      nombre: new FormControl(''),
    });

  }

  mostrarCanciones(){
    this.verCanciones.emit()
  }
  mostrarPerfil(){
    this.volver.emit()
  }
  buscar(){
    this.isResultados = true;
  }


  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

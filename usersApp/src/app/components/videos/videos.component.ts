import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {

  @Input()
  videos: any;
  
  @Output()
  volver = new EventEmitter<any>();

  @Output()
  verCanciones = new EventEmitter<any>();

  constructor(
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.videos.forEach(video => {
      let videoLink = video.link;
      let videoId = videoLink.split('watch?v=')[1];
      let videoEmbed = `https://www.youtube.com/embed/${videoId}`
      video.link = videoEmbed
    });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  mostrarCanciones(){
    this.verCanciones.emit()
  }

  mostrarPerfil(){
    this.volver.emit()
  }


}

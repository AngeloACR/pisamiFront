import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {LinkService} from "../../services/link.service";
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';


@Component({
  selector: 'app-buscador-videos',
  templateUrl: './buscador-videos.component.html',
  styleUrls: ['./buscador-videos.component.scss'],
  providers : [LinkService]
})
export class BuscadorVideosComponent implements OnInit {


  videos: any;
  buscarVideos: FormGroup;
  isResultados: boolean;
  selectedTitle: any;

  url: SafeResourceUrl;

  @Output()
  volver = new EventEmitter<any>();

  @Output()
  verCanciones = new EventEmitter<any>();

  constructor(
    private sanitizer: DomSanitizer,
    private _linkService : LinkService
    ) { }


  ngOnInit() {
        this.selectedTitle = 'Videos'
        this.isResultados = false;
        this.initForm();
    
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
    let dataAux = this.buscarVideos.value;
    console.log(dataAux.nombre);
    this._linkService.listByName(dataAux.nombre).subscribe(response => {
      response['links'].forEach(response => {
       var link = atob(response.link);
        
        response.link = this.sanitizer.bypassSecurityTrustResourceUrl(link);
        this.url = response.link; 
        console.log(this.url);
        
      });
      this.videos = response['links'];
      console.log(this.videos);
    });
    this.isResultados = true;
  }


  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

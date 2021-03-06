import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import {LinkService} from "../../services/link.service";
import * as crypto from 'crypto-js'; 
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';



@Component({
  selector: "app-buscador-canciones",
  templateUrl: "./buscador-canciones.component.html",
  styleUrls: ["./buscador-canciones.component.scss"],
  providers: [LinkService]
})
export class BuscadorCancionesComponent implements OnInit {
  canciones: any;
  buscarCanciones: FormGroup;
  isResultados: boolean;
  selectedTitle: any;

  @Output()
  volver = new EventEmitter<any>();

  @Output()
  verVideos = new EventEmitter<any>();

  url: SafeResourceUrl;
  constructor(
    public _linkService : LinkService,
    public sanitizer:DomSanitizer
    ) {}

  ngOnInit() {
    this.selectedTitle = "Canciones";
    this.isResultados = false;
    this.initForm();
  }

  initForm() {
    this.buscarCanciones = new FormGroup({
      nombre: new FormControl("")
    });
  }

  mostrarVideos() {
    this.verVideos.emit();
  }
  mostrarPerfil() {
    this.volver.emit();
  }

  buscar() {
    //get canciones segun filtro
    let dataAux = this.buscarCanciones.value;
    console.log(dataAux.nombre);
    this._linkService.listByName(dataAux.nombre).subscribe(response => {
      response['links'].forEach(response => {
       var link = atob(response.link);
        
        response.link = this.sanitizer.bypassSecurityTrustResourceUrl(link);
        this.url = response.link; 
        console.log(this.url);
        
      });
      this.canciones = response['links'];
      console.log(this.canciones);
    });
    
  
    this.isResultados = true;
  }

}

import { CommonService } from "../../services/common.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { LinkService } from "../../services/link.service";
import * as crypto from "crypto-js";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-buscador-canciones",
  templateUrl: "./buscador-canciones.component.html",
  styleUrls: ["./buscador-canciones.component.scss"],
  providers: [LinkService]
})
export class BuscadorCancionesComponent implements OnInit {
  canciones: any;
  videos: any;
  artistaEscogido: any;
  selectedTitle: any;

  isBuscador: any = false;
  isCanciones: any = false;
  isPerfil: any = false;
  isVideos: any = false;
  buscarCanciones: FormGroup;
  isResultados: boolean = false;
  artistaSelected: boolean = false;

  @Output()
  volver = new EventEmitter<any>();

  @Output()
  verVideos = new EventEmitter<any>();

  url: SafeResourceUrl;
  constructor(
    private common: CommonService,
    public _linkService: LinkService,
    public sanitizer: DomSanitizer
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
  mostraCanciones() {
    this.isVideos = false;
    this.isPerfil = false;
    this.isCanciones = true;
    this.artistaSelected = true;
  }
  mostrarVideos() {
    this.isVideos = false;
    this.isPerfil = false;
    this.isCanciones = true;
    this.artistaSelected = true;
  }
  mostrarPerfil() {
    this.isVideos = false;
    this.isPerfil = false;
    this.isCanciones = true;
    this.artistaSelected = true;
  }
  mostrarBuscador() {
    this.isVideos = false;
    this.isPerfil = false;
    this.isCanciones = false;
    this.artistaSelected = false;
  }

  async buscar() {
    //get canciones segun filtro
    let dataAux = this.buscarCanciones.value;
    console.log(dataAux.nombre);
    await this.common.showLoader();
    this._linkService.listByName(dataAux.nombre).subscribe(response => {
      this.common.hideLoader();
      response["links"].forEach(response => {
        var link = atob(response.link);

        response.link = this.sanitizer.bypassSecurityTrustResourceUrl(link);
        this.url = response.link;
        console.log(this.url);
      });
      this.canciones = response["links"];
      console.log(this.canciones);
    });

    this.isResultados = true;
  }
}

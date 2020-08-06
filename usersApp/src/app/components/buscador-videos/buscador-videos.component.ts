import { CommonService } from "../../services/common.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { LinkService } from "../../services/link.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-buscador-videos",
  templateUrl: "./buscador-videos.component.html",
  styleUrls: ["./buscador-videos.component.scss"],
  providers: [LinkService]
})
export class BuscadorVideosComponent implements OnInit {
  videos: any;
  canciones: any;
  artistaEscogido: any;
  selectedTitle: any;

  isBuscador: any = false;
  isCanciones: any = false;
  isResultados: boolean;
  isPerfil: any = false;
  isVideos: any = false;
  buscarVideos: FormGroup;
  artistaSelected: boolean = false;

  url: SafeResourceUrl;

  @Output()
  volver = new EventEmitter<any>();

  @Output()
  verCanciones = new EventEmitter<any>();

  constructor(
    private common: CommonService,
    private sanitizer: DomSanitizer,
    private _linkService: LinkService
  ) {}

  ngOnInit() {
    this.selectedTitle = "Videos";
    this.isResultados = false;
    this.initForm();
  }

  initForm() {
    this.buscarVideos = new FormGroup({
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
    let dataAux = this.buscarVideos.value;
    console.log(dataAux.nombre);
    this.common.showLoader();
    this._linkService.listByName(dataAux.nombre).subscribe(response => {
      this.common.hideLoader();
      response["links"].forEach(response => {
        var link = atob(response.link);

        response.link = this.sanitizer.bypassSecurityTrustResourceUrl(link);
        this.url = response.link;
        console.log(this.url);
      });
      this.videos = response["links"];
      console.log(this.videos);
    });
    this.isResultados = true;
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

import { CommonService } from "../../services/common.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { LinkService } from "../../services/link.service";

@Component({
  selector: "app-videos",
  templateUrl: "./videos.component.html",
  styleUrls: ["./videos.component.scss"],
  providers: [LinkService]
})
export class VideosComponent implements OnInit {
  @Input()
  videos: any;

  @Output()
  volver = new EventEmitter<any>();

  @Output()
  verCanciones = new EventEmitter<any>();
  url;
  perfilId;
  constructor(private common: CommonService,private _linkService: LinkService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    
      
    this.videos.forEach(video => {
      if(video.plataforma == "Youtube"){
        video.link = atob(video.link);
      }
    }); 
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  mostrarCanciones() {
    this.verCanciones.emit();
  }

  mostrarPerfil() {
    this.volver.emit();
  }
}

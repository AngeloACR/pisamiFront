import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";
import { AuthService } from "../../services/auth.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { forkJoin } from "rxjs";
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  id: string;

  selectedItem: String;
  isUser: Boolean;
  isMusico: Boolean;
  

  selectedImg: String;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private platform: Platform
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params["id"];
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == "perfil") {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }
      });
    });
  }
  ngOnInit() {

        //AQUI HAY QUE DEFINIR EL TIPO DE USUARIO
        let tipoUsuario = 1;
        if(tipoUsuario){
          this.selectedImg = '';
          this.isMusici = false;

          this.userValues = {
            nombre: Angelo Jose
            apellido: Espinoza Santana
            tlf: '+689256542'
            correo: angelo@angelo;
          }
          this.selectedItem = userValues;
        }else {
          this.selectedImg = '';
          this.isMuscio = true;
          this.isUser = false;
          let userValues ={
      nombreReal: 'Jamaica 15'
      nombreArtistico: 'Jamaica 16'
      salir: 'No'
      ciudadOrigen: 'Ibague'
      tieneRepresentante: 'Si'
      nombreRepresentante: 'Raul Leoni'
      telefono: '+525896595'
      correo:'gonzalo@gonzale.net'
      descripcion: 'La banda mas bohemia de ibague'
      instagram: 'Jamaica_16'
      facebook: 'Jamaicajg'
      paginaWeb: 'jamaica.jg'
      numeroIntegrantes: 3
      generos: ['Cumbia', 'Reggae']
          }
          this.selectedItem = this.userValues;
        }


  }

}

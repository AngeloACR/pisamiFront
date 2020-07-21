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

  selectedItem: any;
  isUser: boolean;
  isMusico: boolean;
  selectedTitle: any;
  

  selectedImg: String;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private platform: Platform,
    private auth: AuthService,
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
  async ngOnInit() {
        this.selectedTitle = 'Mi Cuenta'

        //AQUI HAY QUE DEFINIR EL TIPO DE USUARIO
        let primerInicio = await this.auth.primerInicio();

        //let tipoUsuario = await this.auth.getType();
        let tipoUsuario = 1;
        if(tipoUsuario){
          this.selectedImg = 'assets/usuario/14- mi cuenta/perfil.png';
          this.isMusico = false;
          this.isUser = true;

          let userValues = {
            nombre: 'Angelo',
            apellido: 'Espinoza', 
            tlf: '+689256542',
            correo: 'angelo@angelo',
          }
          this.selectedItem = userValues;
        }else {
          this.selectedImg = '';
          this.isMusico = true;
          this.isUser = false;
          let userValues ={
            nombreReal: 'Jamaica 15',
            nombreArtistico: 'Jamaica 16',
            salir: 'No',
            ciudadOrigen: 'Ibague',
            tieneRepresentante: 'Si',
            nombreRepresentante: 'Raul Leoni',
            telefono: '+525896595',
            correo:'gonzalo@gonzale.net',
            descripcion: 'La banda mas bohemia de ibague',
            instagram: 'Jamaica_16',
            facebook: 'Jamaicajg',
            paginaWeb: 'jamaica.jg',
            numeroIntegrantes: 3,
            generos: ['Cumbia', 'Reggae'],
          }
          this.selectedItem = userValues;
        }


  }

}

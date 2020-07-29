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
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UserService],

})
export class PerfilComponent implements OnInit {
  id: string;

  selectedItem: any;
  isUser: boolean;
  isMusico: boolean;
  public identity;
  selectedTitle: any;
  

  selectedImg: String;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private platform: Platform,
    private _userService: UserService,
    private auth: AuthService,
  ) {
    this.identity = this._userService.getIdentity(); 
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
        let tipoUsuario = this.identity.tipo_usuario;
        if(tipoUsuario == 2){
          this.selectedImg = 'assets/usuario/14- mi cuenta/perfil.png';
          this.isMusico = false;
          this.isUser = true;

          let userValues = {
            nombre: this.identity.nombre,
            apellido: this.identity.apellido, 
            telefono: this.identity.telefono,
            correo: this.identity.correo,
          }
          this.selectedItem = userValues;
        }else {
          
        let primerInicio = await this.auth.primerInicio();
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
            descripcion1: 'La banda mas bohemia de ibague',
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

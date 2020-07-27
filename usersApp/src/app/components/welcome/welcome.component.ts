import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  selectedTitle: string = 'Bienvenido'
  welcomeMsg: string
  isUsuario: boolean;
  isMusico: boolean;
  isPrimerInicio: boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  async ngOnInit() {
    let type = await this.auth.getType();
    this.isUsuario = false;
    this.isMusico = false;
    if(type == 'usuario'){
    this.isUsuario = true;
      this.welcomeMsg = 'Bienvenido a Ibagué Music, explora todas las diferentes opciones que te ofrecemos a través del menú, el cual está ubicado arriba y a la izquierda de la pantalla, ¡y empieza a disfrutar de tu experiencia musical!'
    } else {
      this.isMusico = true;
      this.welcomeMsg = 'Bienvenido a Ibagué Music, explora todas las diferentes opciones que te ofrecemos a través del menú, el cual está ubicado arriba y a la izquierda de la pantalla, ¡y empieza a disfrutar de tu experiencia musical!'
      this.isPrimerInicio = await this.auth.primerInicio();
      if(this.isPrimerInicio){
        this.welcomeMsg = 'Bienvenido a Ibagué Music, antes de explorar todas las cosas que tenemos para ofrecerte, por favor completa tu perfil dando click al siguiente botón:'
      }
    }
  }

  welcomeUser(){
    this.router.navigateByUrl("/perfil/0");
  }

}

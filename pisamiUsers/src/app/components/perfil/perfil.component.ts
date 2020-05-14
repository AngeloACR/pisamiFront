import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  id: string;
  user: any;
  actualizarUser: FormGroup;
  actualizarSolista: FormGroup;
  actualizarDuo: FormGroup;
  actualizarOrquesta: FormGroup;
  actualizarInfo: FormGroup;

  isMusico: Boolean;  
  isUser: Boolean;  
  isSolista: Boolean;  
  isDuo: Boolean; 
  isOrquesta: Boolean;
  isInfo: Boolean;

  formCompleted: Boolean;
  formSelected: Boolean;
  tipoSelected: String;
  showBlack: {};
  showForm: {};
  hideOption: {};

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == 'perfil') {
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

/*   ngOnInit= async function() {
    let user = await this.auth.decode();
    let type = user.tipo;
    this.isMusico = (type == 'Musico');  
    this.isUser = (type == 'Usuario'); 
    if(isMusico){

    this.isSolista = (type == 'Solista');  
    this.isDuo = (type == 'Duo'); 
    this.isOrquesta = (type == 'Orquesta');
    }
    this.initForm();

  }
 */

  ngOnInit = async function() {
    this.isMusico = true;  
    this.isUser = false;  
    this.isSolistas = false;  
    this.isDuo = false; 
    this.isOrquesta = true;
    this.isInfo = false;
    this.tipoSelected = 'orquesta';
    this.user = {};
    this.initForm();

  }

  initForm() {
    this.actualizarUser = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      tlf: new FormControl(''),
      correo: new FormControl(''),
      password: new FormControl(''),
    });
    this.actualizarUser.controls['nombre'].setValue(this.user.nombre)
    this.actualizarUser.controls['apellido'].setValue(this.user.apellido)
    this.actualizarUser.controls['tlf'].setValue(this.user.tlf)
    this.actualizarUser.controls['correo'].setValue(this.user.correo)
    this.actualizarUser.controls['correo'].disable()
    this.actualizarUser.controls['password'].setValue(this.user.password)

    this.actualizarSolista = new FormGroup({
      nombreReal: new FormControl(''),
      nombreArtistico: new FormControl(''),
      salir: new FormControl(''),
      ciudadOrigen: new FormControl(''),
      tieneRepresentante: new FormControl(''),
      nombreRepresentante: new FormControl(''),
      telefono: new FormControl(''),
      correo: new FormControl(''),
      descripcion: new FormControl(''),
      paginaWeb: new FormControl(''),
    });

    this.actualizarSolista.controls['nombreReal'].setValue(this.user.nombreReal);
    this.actualizarSolista.controls['nombreArtistico'].setValue(this.user.nombreArtistico);
    this.actualizarSolista.controls['salir'].setValue(this.user.salir);
    this.actualizarSolista.controls['ciudadOrigen'].setValue(this.user.ciudadOrigen);
    this.actualizarSolista.controls['tieneRepresentante'].setValue(this.user.tieneRepresentante);
    this.actualizarSolista.controls['nombreRepresentante'].setValue(this.user.nombreRepresentante);
    this.actualizarSolista.controls['telefono'].setValue(this.user.telefono);
    this.actualizarSolista.controls['correo'].setValue(this.user.correo);
    this.actualizarSolista.controls['descripcion'].setValue(this.user.descripcion);
    this.actualizarSolista.controls['paginaWeb'].setValue(this.user.paginaWeb);

    this.actualizarDuo = new FormGroup({
      nombreArtistico: new FormControl(''),
      salir: new FormControl(''),
      ciudadOrigen: new FormControl(''),
      tieneRepresentante: new FormControl(''),
      nombreRepresentante: new FormControl(''),
      telefono: new FormControl(''),
      correo: new FormControl(''),
      descripcion: new FormControl(''),
      paginaWeb: new FormControl(''),
    });

    this.actualizarDuo.controls['nombreArtistico'].setValue(this.user.nombreArtistico);
    this.actualizarDuo.controls['salir'].setValue(this.user.salir);
    this.actualizarDuo.controls['ciudadOrigen'].setValue(this.user.ciudadOrigen);
    this.actualizarDuo.controls['tieneRepresentante'].setValue(this.user.tieneRepresentante);
    this.actualizarDuo.controls['nombreRepresentante'].setValue(this.user.nombreRepresentante);
    this.actualizarDuo.controls['telefono'].setValue(this.user.telefono);
    this.actualizarDuo.controls['correo'].setValue(this.user.correo);
    this.actualizarDuo.controls['descripcion'].setValue(this.user.descripcion);
    this.actualizarDuo.controls['paginaWeb'].setValue(this.user.paginaWeb);

    this.actualizarOrquesta = new FormGroup({
      nombreArtistico: new FormControl(''),
      numeroIntegrantes: new FormControl(''),
      salir: new FormControl(''),
      ciudadOrigen: new FormControl(''),
      tieneRepresentante: new FormControl(''),
      nombreRepresentante: new FormControl(''),
      telefono: new FormControl(''),
      correo: new FormControl(''),
      descripcion: new FormControl(''),
      paginaWeb: new FormControl(''),
    });
    this.actualizarOrquesta.controls['nombreArtistico'].setValue(this.user.nombreArtistico);
    this.actualizarOrquesta.controls['numeroIntegrantes'].setValue(this.user.numeroIntegrantes);
    this.actualizarOrquesta.controls['salir'].setValue(this.user.salir);
    this.actualizarOrquesta.controls['ciudadOrigen'].setValue(this.user.ciudadOrigen);
    this.actualizarOrquesta.controls['tieneRepresentante'].setValue(this.user.tieneRepresentante);
    this.actualizarOrquesta.controls['nombreRepresentante'].setValue(this.user.nombreRepresentante);
    this.actualizarOrquesta.controls['telefono'].setValue(this.user.telefono);
    this.actualizarOrquesta.controls['correo'].setValue(this.user.correo);
    this.actualizarOrquesta.controls['descripcion'].setValue(this.user.descripcion);
    this.actualizarOrquesta.controls['paginaWeb'].setValue(this.user.paginaWeb);

    this.actualizarInfo = new FormGroup({
      generos: new FormControl(''),
      soundLinks: new FormControl(''),
      youLinks: new FormControl(''),
      soundNombres: new FormControl(''),
      youNombres: new FormControl(''),
    });

    this.actualizarInfo.controls['generos'].setValue(this.user.generos);
    this.actualizarInfo.controls['soundLinks'].setValue(this.user.soundLinks);
    this.actualizarInfo.controls['youLinks'].setValue(this.user.youLinks);
    this.actualizarInfo.controls['soundNombres'].setValue(this.user.soundNombres);
    this.actualizarInfo.controls['youNombres'].setValue(this.user.youNombres);


  }

  endActualizacion() {
    console.log('Finalizando actualizacion');
  }

  toggleInfo() {
    this.isUser = false;
    this.isSolista = false;
    this.isDuo = false;
    this.isOrquesta = false;
    this.isInfo = true;
  }  

  volverInfoArtista(){
    this.isSolista = (this.tipoSelected == 'solista');  
    this.isDuo = (this.tipoSelected == 'duo'); 
    this.isOrquesta = (this.tipoSelected == 'orquesta');
    this.isInfo = false;
  }

  volverSeleccionMusico(){
    this.isSolista = false;
    this.isDuo = false;
    this.isOrquesta = false;
  }



}

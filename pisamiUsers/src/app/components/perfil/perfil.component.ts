import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  id: string;
  generos = ['Cumbia', 'Bachata', 'Vallenato', 'Rock'];
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

  soundLinks = new FormArray([]);
  youLinks = new FormArray([]);

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
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

  addYoutube() {
    const group = new FormGroup({
      nombre: new FormControl(""),
      link: new FormControl("")
    });

    this.youLinks.push(group);
  }
  addSoundcloud() {
    const group = new FormGroup({
      nombre: new FormControl(""),
      link: new FormControl("")
    });

    this.soundLinks.push(group);
  }

  initForm() {
    this.actualizarUser = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      tlf: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.actualizarUser.controls['nombre'].setValue(this.user.nombre)
    this.actualizarUser.controls['apellido'].setValue(this.user.apellido)
    this.actualizarUser.controls['tlf'].setValue(this.user.tlf)
    this.actualizarUser.controls['correo'].setValue(this.user.correo)
    this.actualizarUser.controls['correo'].disable()
    this.actualizarUser.controls['password'].setValue(this.user.password)

    this.actualizarSolista = new FormGroup({
      nombreReal: new FormControl('', Validators.required),
      nombreArtistico: new FormControl('', Validators.required),
      salir: new FormControl('', Validators.required),
      ciudadOrigen: new FormControl('', Validators.required),
      tieneRepresentante: new FormControl('', Validators.required),
      nombreRepresentante: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      descripcion: new FormControl('', Validators.required),
      paginaWeb: new FormControl('', Validators.required),
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
      nombreArtistico: new FormControl('', Validators.required),
      salir: new FormControl('', Validators.required),
      ciudadOrigen: new FormControl('', Validators.required),
      tieneRepresentante: new FormControl('', Validators.required),
      nombreRepresentante: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      descripcion: new FormControl('', Validators.required),
      paginaWeb: new FormControl('', Validators.required),
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
      nombreArtistico: new FormControl('', Validators.required),
      numeroIntegrantes: new FormControl('', Validators.required),
      salir: new FormControl('', Validators.required),
      ciudadOrigen: new FormControl('', Validators.required),
      tieneRepresentante: new FormControl('', Validators.required),
      nombreRepresentante: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      descripcion: new FormControl('', Validators.required),
      paginaWeb: new FormControl('', Validators.required),
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


    get fUser() { 
      return this.actualizarUser.controls;
     }

    get fSolista() { 
      return this.actualizarSolista.controls;
     }

    get fDuo() { 
      return this.actualizarDuo.controls;
     }

    get fOrquesta() { 
      return this.actualizarOrquesta.controls;
     }

    get fInfo() { 
      return this.actualizarInfo.controls;
     }


  endActualizacion() {    
    if(this.catchUserErrors()){
      this.toggleError();
    } else{
    console.log('Finalizando actualizacion');
    }
  }

  toggleInfo() {
    if(this.catchUserErrors()){
      this.toggleError();
    } else{
      this.isUser = false;
      this.isSolista = false;
      this.isDuo = false;
      this.isOrquesta = false;
      this.isInfo = true;
    }  
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


 async toggleError() {
    let actionSheet = await this.actionSheetController.create({
      header: 'Hay errores en el formulario. Por favor, revíselo e intente de nuevo',
      buttons: [{
        text: 'VOLVER',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('CANCELANDO...');
        }
      }]
    });
    await actionSheet.present();
  }


    catchUserErrors(){
      if(this.isUser){
        let aux1 = this.fUser.nombre.errors ? this.fUser.nombre.errors.required : false;
        let aux2 = this.fUser.correo.errors ? this.fUser.correo.errors.required : false;
        let aux3 = this.fUser.apellido.errors ? this.fUser.apellido.errors.required : false;
        let aux4 = this.fUser.tlf.errors ? this.fUser.tlf.errors.required : false;
        let aux5 = this.fUser.password.errors ? this.fUser.password.errors.required : false;
        let aux6 = this.fUser.password.errors ? this.fUser.password.errors.minlength : false;
        let error = aux1 || aux2 || aux3 || aux4 || aux5 || aux6;
        return error
      }else if(this.isSolista){
        let aux1 = this.fSolista.nombreReal.errors ? this.fSolista.nombreReal.errors.required : false;
        let aux2 = this.fSolista.nombreArtistico.errors ? this.fSolista.nombreArtistico.errors.required : false;
        let aux3 = this.fSolista.ciudadOrigen.errors ? this.fSolista.ciudadOrigen.errors.required : false;
        let aux4 = this.fSolista.nombreRepresentante.errors ? this.fSolista.nombreRepresentante.errors.required : false;
        let aux5 = this.fSolista.telefono.errors ? this.fSolista.telefono.errors.required : false;
        let aux6 = this.fSolista.correo.errors ? this.fSolista.correo.errors.required : false;
        let aux7 = this.fSolista.correo.errors ? this.fSolista.correo.errors.email : false;
        let aux8 = this.fSolista.descripcion.errors ? this.fSolista.descripcion.errors.required : false;
        let aux9 = this.fSolista.paginaWeb.errors ? this.fSolista.paginaWeb.errors.required : false;

        let error = aux1 || aux2 || aux3 || aux4 || aux5 || aux6 || aux7 || aux8 || aux9;
        return error
      } else if(this.isDuo){
        let aux2 = this.fDuo.nombreArtistico.errors ? this.fDuo.nombreArtistico.errors.required : false;
        let aux3 = this.fDuo.ciudadOrigen.errors ? this.fDuo.ciudadOrigen.errors.required : false;
        let aux4 = this.fDuo.nombreRepresentante.errors ? this.fDuo.nombreRepresentante.errors.required : false;
        let aux5 = this.fDuo.telefono.errors ? this.fDuo.telefono.errors.required : false;
        let aux6 = this.fDuo.correo.errors ? this.fDuo.correo.errors.required : false;
        let aux7 = this.fDuo.correo.errors ? this.fDuo.correo.errors.email : false;
        let aux8 = this.fDuo.descripcion.errors ? this.fDuo.descripcion.errors.required : false;
        let aux9 = this.fDuo.paginaWeb.errors ? this.fDuo.paginaWeb.errors.required : false;

        let error = aux2 || aux3 || aux4 || aux5 || aux6 || aux7 || aux8 || aux9;
        return error
      }else if(this.isOrquesta){
        let aux2 = this.fOrquesta.nombreArtistico.errors ? this.fOrquesta.nombreArtistico.errors.required : false;
        let aux3 = this.fOrquesta.ciudadOrigen.errors ? this.fOrquesta.ciudadOrigen.errors.required : false;
        let aux4 = this.fOrquesta.nombreRepresentante.errors ? this.fOrquesta.nombreRepresentante.errors.required : false;
        let aux5 = this.fOrquesta.telefono.errors ? this.fOrquesta.telefono.errors.required : false;
        let aux6 = this.fOrquesta.correo.errors ? this.fOrquesta.correo.errors.required : false;
        let aux7 = this.fOrquesta.correo.errors ? this.fOrquesta.correo.errors.email : false;
        let aux8 = this.fOrquesta.descripcion.errors ? this.fOrquesta.descripcion.errors.required : false;
        let aux9 = this.fOrquesta.paginaWeb.errors ? this.fOrquesta.paginaWeb.errors.required : false;

        let error = aux2 || aux3 || aux4 || aux5 || aux6 || aux7 || aux8 || aux9;
        return error
      }
  }


}

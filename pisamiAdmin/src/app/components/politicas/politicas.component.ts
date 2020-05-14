import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.css'],
})
export class PoliticasComponent implements OnInit {
  id: string;
  title: string;
  registroPolitica: FormGroup;
  buscarPolitica: FormGroup;
  politicas: any;
  politicaEscogida: any;

  isCrear: Boolean;
  isListar: Boolean;
  isEditar: Boolean;

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
    public actionSheetController: ActionSheetController    
  ) {
    this.actRoute.params.subscribe(params => {
      this.id = params['id'];
      if (params['politica']) {
        this.politicaEscogida = JSON.parse(params['politica']);
      }
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == 'politicas') {
          console.log(this.id)
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.isEditar = false;
    this.politicas = [{
      id: '29384',
      nombre: 'TRATO DE DATOS PERSONALES',
      },{
      id: '29385',
      nombre: 'COMPROMISO CON EL USUARIO', 
      }, {
      id: '29386',
      nombre: 'COMPROMISO CON EL MUSICO', 
      }, {
      id: '29387',
      nombre: 'COMPROMISO CON EL ADMINISTRADOR'
      }
    ]
    this.initForm();
    if (this.id == '0') {
      this.isCrear = true;
      this.isListar = false;
      this.title = 'CREAR POLÍTICA';
    } else if (this.id == '1') {
      this.isCrear = false;
      this.isListar = true;
      this.title = 'LISTA DE POLÍTICAS';
    } else if (this.id == '2') {
      this.isCrear = false;
      this.isListar = false;
      this.isEditar = true;
      this.title = 'EDITAR POLÍTICA';
      this.editForm(this.politicaEscogida)
    }
  }

  async eliminarPolitica(event, politica){
    const actionSheet = await this.actionSheetController.create({
      header: '¿Seguro que desea eliminar este elemento?',
      buttons: [{
        text: 'ELIMINAR',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('ELIMINANDO...');
          console.log(politica);
        }
      }, {
        text: 'CANCELAR',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('CANCELANDO...');
        }
      }]
    });
    await actionSheet.present();
  }

  initForm() {
    this.registroPolitica = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
    });
    this.buscarPolitica = new FormGroup({
      nombre: new FormControl(''),
    });

  }

  editForm(elemento){
    this.registroPolitica.controls['id'].setValue(elemento.id);
    this.registroPolitica.controls['nombre'].setValue(elemento.nombre);
    this.registroPolitica.controls['descripcion'].setValue(elemento.descripcion);
  }


  endRegistro() {
  }

  filtrarPolitica() {
  }

  editarPolitica(event, politica) {
    let aux = JSON.stringify(politica)
    this.router.navigate(['/politicas/2', { politica: aux }]);
  }

}

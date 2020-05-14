import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss'],
})
export class ArtistasComponent implements OnInit {
  id: string;
  title: string;
  registroArtista: FormGroup;
  buscarArtista: FormGroup;
  artistas: any;
  generos = ['Cumbia', 'Bachata', 'Vallenato', 'Rock'];

  isCrear: Boolean;
  isListar: Boolean;

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
    });
    this.router.events.subscribe(event => {
      this.actRoute.url.subscribe(value => {
        let url = value[0].path;
        if (url == 'artistas') {
          console.log(this.id)
          if (event instanceof NavigationEnd) {
            this.ngOnInit();
          }
        }

      });
    });
  }

  ngOnInit() {
    this.artistas = [{
      id: '2587956',
      nombre: 'Los Bacanos',
      categorias: 'Bachata, cumbia, salsa',
      telefono: '085-98921454',
      correo: 'banda@musica.com',
    }, {
      id: '8587956',
      nombre: 'Los cantautores',
      categorias: 'Reggaeton, rock, metal',
      telefono: '085-98921454',
      correo: 'banda@musica.com',
    }]    
    this.initForm();
    if (this.id == '0') {
      this.isCrear = true;
      this.isListar = false;
      this.title = 'CREAR ARTISTA';
    } else if (this.id == '1') {
      this.isCrear = false;
      this.isListar = true;
      this.title = 'LISTA DE ARTISTAS';
    }
  }

  initForm() {
    this.registroArtista = new FormGroup({
    });
    this.buscarArtista = new FormGroup({
      nombre: new FormControl(''),
      genero: new FormControl(''),
    });

  }


  endRegistro() {
  }

  filtrarArtista() {
  }

  editarArtista(event, artista) {
    let aux = JSON.stringify(artista)
    this.router.navigate(['/registro/3', { artista: aux }]);
  }

  async habilitarArtista(event, artista, habilitar) {
    let actionSheet;
    if (habilitar == 0) {
    actionSheet = await this.actionSheetController.create({
      header: '¿Seguro que desea deshabilitar este elemento?',
      buttons: [{
        text: 'DESHABILITAR',
        icon: 'close-circle',
        handler: () => {
          console.log('DESHANILITANDO');
          console.log(artista);
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
    } else if (habilitar == '1') {
    actionSheet = await this.actionSheetController.create({
      header: '¿Seguro que desea habilitar este elemento?',
      buttons: [{
        text: 'HABILITAR',
        icon: 'checkmark-circle',
        handler: () => {
          console.log('HABILITANDO');
          console.log(artista);
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
    }
    await actionSheet.present();
  }

}

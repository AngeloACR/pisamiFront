import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { ActionSheetController } from "@ionic/angular";
import { DbHandlerService } from "../../services/db-handler.service";

@Component({
  selector: 'app-lista-artistas',
  templateUrl: './lista-artistas.component.html',
  styleUrls: ['./lista-artistas.component.scss'],
})
export class ListaArtistasComponent implements OnInit {

  artistas: any;
  fields: any;
  buscarArtista: FormGroup;

  constructor(
    private dbHandler: DbHandlerService,
    private actionSheetController: ActionSheetController,
  ) { }

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
    }];
    this.fields = [
      'Id', 'Nombre', 'Teléfono', 'Correo'
    ];

    let endpoint = `/artistas`
    this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.artistas = data;
        }
      });
    this.initForm();
  }

  initForm() {
    this.buscarArtista = new FormGroup({
      nombre: new FormControl(''),
      genero: new FormControl(''),
    });
  
  }

  filtrarArtista() {
    let dataAux = this.buscarArtista.value;
    
    let endpoint = `/perfiles/nombre/${dataAux.nombre}`

    this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.artistas = data;
        }
      });
  }

  habilitarArtista(event){
    
  }

  editarArtista(event){
    
  }

  eliminarArtista(event){
    let id = event.id;
    let endpoint = `/perfiles/delete/${id}`;
        this.dbHandler.deleteSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.ngOnInit();
        }
      });
  }

  async toggleError(msg) {
    let actionSheet = await this.actionSheetController.create({
      header:
        msg,
      buttons: [
        {
          text: "VOLVER",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("CANCELANDO...");
          }
        }
      ]
    });
    await actionSheet.present();
  }

}

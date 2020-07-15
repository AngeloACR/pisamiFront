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
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-lista-generos',
  templateUrl: './lista-generos.component.html',
  styleUrls: ['./lista-generos.component.scss'],
})
export class ListaGenerosComponent implements OnInit {

  generos: any;
  fields: any;
  buscarGenero: FormGroup;
  listData: any;
  selectedTitle: any;

  constructor(
    private router: Router,
    private dbHandler: DbHandlerService,
    private actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
    this.selectedTitle = 'Lista de Géneros'
    this.generos = [{
      id: '29384',
      nombre: 'Cumbia',
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      },{
      id: '29385',
      nombre: 'Bachata', 
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      }, {
      id: '29386',
      nombre: 'Vallenato', 
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      }, {
      id: '29387',
      nombre: 'Rock',
      descripcion: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      }
    ];

    /* let endpoint = `/generos`    
        this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.generos = data;
        }
      }); */
    this.fields = [
      'Id', 'Nombre', 'Descripción'
    ]    
        this.listData = []
    this.generos.forEach(genero => {
      let aux = {
        id: genero.id,
        nombre: genero.nombre,
        descripcion: genero.descripcion,
      }
      this.listData.push(aux)
    });
    this.initForm();
  }

  initForm() {
    this.buscarGenero = new FormGroup({
      nombre: new FormControl(''),
    });
  
  }

  filtrarGenero() {
    let dataAux = this.buscarGenero.value;
    
    let endpoint = `/generos/nombre/${dataAux.nombre}`

    this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.generos = data;
        }
      });
  }

  habilitarGenero(event){
    
  }

  editarGenero(event){
    console.log(event);
    console.log(this.generos)
    let genero = this.generos[event];
    console.log(genero)
    genero = JSON.stringify(genero)
    this.router.navigate(['/editargenero', { genero: genero }]);
    
  }

  eliminarGenero(event){
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

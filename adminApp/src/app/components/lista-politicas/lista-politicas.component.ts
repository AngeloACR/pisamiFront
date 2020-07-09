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
  selector: 'app-lista-politicas',
  templateUrl: './lista-politicas.component.html',
  styleUrls: ['./lista-politicas.component.scss'],
})
export class ListaPoliticasComponent implements OnInit {

  politicas: any;
  fields: any;
  buscarPolitica: FormGroup;
  listData: any;
  
  constructor(
    private router: Router,
    private dbHandler: DbHandlerService,
    private actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
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
    ];
    let endpoint = `/politicas`    

    /* this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.politicas = data;
        }
      }); */
    this.fields = [
      'Id', 'Nombre'
    ];    
        this.listData = []
    this.politicas.forEach(politica => {
      let aux = {
        id: politica.id,
        nombre: politica.nombre,
      }
      this.listData.push(aux)
    });
    this.initForm();
  }

  initForm() {
    this.buscarPolitica = new FormGroup({
      nombre: new FormControl(''),
    });
  
  }

  filtrarPolitica() {
    let dataAux = this.buscarPolitica.value;
    
    let endpoint = `/politicas/nombre/${dataAux.nombre}`

    this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.politicas = data;
        }
      });
  }
  habilitarPolitica(event){
    
  }

  editarPolitica(event){
    let politica = this.politicas[event];
    politica = JSON.stringify(politica)
    this.router.navigate(['/editarpolitica', { politica: politica }]);
    
  }

  eliminarPolitica(event){
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

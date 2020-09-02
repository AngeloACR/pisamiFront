import { CommonService } from "../../services/common.service";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { ActionSheetController } from "@ionic/angular";
import { DbHandlerService } from "../../services/db-handler.service";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";
import { PoliticaService } from "../../services/politica.service";
import { UserService } from "../../services/user.service";
import { FormPoliticasComponent } from "../form-politicas/form-politicas.component";

@Component({
  selector: "app-lista-politicas",
  templateUrl: "./lista-politicas.component.html",
  styleUrls: ["./lista-politicas.component.scss"],
  providers: [PoliticaService, FormPoliticasComponent, UserService]
})
export class ListaPoliticasComponent implements OnInit {
  politicas: any;
  fields: any;
  buscarPolitica: FormGroup;
  listData: any;
  selectedTitle: any;
  url;
  constructor(
    private router: Router,
    private common: CommonService,
    private dbHandler: DbHandlerService,
    private actionSheetController: ActionSheetController,
    private _politicaService: PoliticaService,
    private _politicaComponent: FormPoliticasComponent
  ) {
    this.initForm();

  }

  async ngOnInit() {
    this.selectedTitle = "Lista de Políticas";
    await this.common.showLoader();
    this.url = "http://localhost:8000/";
    this._politicaService.listPoliticas().subscribe(response => {
      this.common.hideLoader();
      this.politicas = response["politicas"];
    });
    /*this.politicas = [{
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
    let endpoint = `/politicas`;

     this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.politicas = data;
        }
      }); 
    this.fields = [
      'Id', 'Nombre'
    ];    
        this.listData = []
    this.politicas.forEach(politica => {
      let aux = {
        id: politica.id,
        nombre: politica.nombre
      };
      this.listData.push(aux);
    });
    */
  }

  initForm() {
    this.buscarPolitica = new FormGroup({
      nombre: new FormControl("")
    });
  }
  editarElemento(id) {
    let idPolitica = id;
    this.router.navigate(["editarpolitica"]);
    return this._politicaComponent.initForm(1, idPolitica);
  }

  async filtrarPolitica() {
    this.selectedTitle = "Lista de Políticas";

    this._politicaService.politicaByName(this.buscarPolitica.controls["nombre"].value).subscribe(response => {
      this.politicas = response["politicas"];
    });
  }
  habilitarPolitica(event) {}

  editarPolitica(event) {
    let politica = this.politicas[event];
    politica = JSON.stringify(politica);
    this.router.navigate(["/editarpolitica", { politica: politica }]);
  }

  async eliminarPolitica(id) {
    let endpoint = `/perfiles/delete/${id}`;
    await this.common.showLoader();
    this._politicaService.deletePolitica(id).subscribe(response=> {
      this.common.hideLoader();
      if (response.status != "error") {
        this.common.showToast("Género eliminado exitosamente");
        this.ngOnInit();
      } else {
        this.common.showAlert("Error eliminando el género");
      }
    },
    error => {
      this.common.hideLoader();
      this.common.showAlert("Error eliminando el género");
      console.log(<any>error);
    }
    );
  }

  async toggleError(msg) {
    let actionSheet = await this.actionSheetController.create({
      header: msg,
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

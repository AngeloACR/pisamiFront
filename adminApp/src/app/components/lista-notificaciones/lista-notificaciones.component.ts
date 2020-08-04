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
import { NotificacionService } from "../../services/notificacion.service";
import { FormNotificacionesComponent } from "../form-notificaciones/form-notificaciones.component";

@Component({
  selector: "app-lista-notificaciones",
  templateUrl: "./lista-notificaciones.component.html",
  styleUrls: ["./lista-notificaciones.component.scss"],
  providers: [NotificacionService, FormNotificacionesComponent]
})
export class ListaNotificacionesComponent implements OnInit {
  notificaciones: any;
  fields: any;
  buscarNotificacion: FormGroup;
  listData: any;
  selectedTitle: any;
  status;

  constructor(
    private router: Router,
    private dbHandler: DbHandlerService,
    private actionSheetController: ActionSheetController,
    private common: CommonService,
    public _notificacionService: NotificacionService,
    public _notificacionComponent: FormNotificacionesComponent
  ) {}

  ngOnInit() {
    this.selectedTitle = "Lista de Notificaciones";

    let endpoint = `/notificaciones`;

    /* this.dbHandler.getSomething(endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.notificaciones = data;
        }
      }); */

    this._notificacionService.listNotificacion().subscribe(
      response => {
        if (response.status != "error") {
          this.notificaciones = response.notificaciones;
          this.fields = ["Id", "Nombre", "Mensaje"];
          this.listData = [];
          this.notificaciones.forEach(notificacion => {
            let aux = {
              id: notificacion.id,
              nombre: notificacion.nombre,
              descripcion: notificacion.descripcion
            };
            this.listData.push(aux);
          });
        }
      },
      error => {
        console.log(<any>error);
      }
    );
    this.initForm();
  }

  editarElemento(id) {
    let idnotificacion = id;
    this.router.navigate(["editarnotificacion"]);
    return this._notificacionComponent.initForm(1, idnotificacion);
  }

  initForm() {
    this.buscarNotificacion = new FormGroup({
      nombre: new FormControl("")
    });
  }

  filtrarNotificacion() {}

  habilitarNotificacion(event) {}

  editarNotificacion(event) {
    let notificacion = this.notificaciones[event];
    notificacion = JSON.stringify(notificacion);
    this.router.navigate([
      "/editarnotificacion",
      { notificacion: notificacion }
    ]);
  }

  eliminarNotificacion(id) {
    if (confirm("Are you sure to delete ")) {
      this._notificacionService.deleteNotificacion(id).subscribe(
        response => {
          if (response.status != "error") {
            this.status = "success";
            this.router.navigate(["listanotificaciones"]);
          } else {
            this.status = "error";
          }
        },
        error => {
          this.status = "error";
          console.log(<any>error);
        }
      );
    }
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

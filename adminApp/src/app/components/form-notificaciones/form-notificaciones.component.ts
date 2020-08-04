import { CommonService } from "../../services/common.service";
import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { forkJoin } from "rxjs";
import { ActionSheetController } from "@ionic/angular";
import { DbHandlerService } from "../../services/db-handler.service";
import { NotificacionService } from "../../services/notificacion.service";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";

@Component({
  selector: "app-form-notificaciones",
  templateUrl: "./form-notificaciones.component.html",
  styleUrls: ["./form-notificaciones.component.scss"],
  providers: [NotificacionService]
})
export class FormNotificacionesComponent implements OnInit {
  @Input()
  editMode: number;

  @Input()
  notificacion: any;

  notificacionId;
  status;
  registroNotificacion: FormGroup;

  constructor(
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    private common: CommonService,
    public dbHandler: DbHandlerService,
    public _notificacionService: NotificacionService,
    public router: Router
  ) {}

  ngOnInit() {
    this.initForm(this.editMode);
    if (this.editMode == 1) {
      if (JSON.parse(localStorage.getItem("notificacionEdit"))) {
        this.notificacionId = JSON.parse(
          localStorage.getItem("notificacionEdit")
        );
        localStorage.removeItem("notificacionEdit");
        this._notificacionService
          .notificacionById(this.notificacionId)
          .subscribe(data => {
            console.log(data);
            let notificacion = data["notificacion"];
            this.registroNotificacion.controls["nombre"].setValue(
              notificacion.nombre
            );
            this.registroNotificacion.controls["mensaje"].setValue(
              notificacion.mensaje
            );
          });
      }
    }
  }

  initForm(editMode, idNotificacion?) {
    this.registroNotificacion = new FormGroup({
      nombre: new FormControl("", Validators.required),
      mensaje: new FormControl("", Validators.required)
    });

    if (idNotificacion) {
      localStorage.setItem("notificacionEdit", idNotificacion);
    }
  }

  get fNotificacion() {
    return this.registroNotificacion.controls;
  }

  endRegistro() {
    if (this.catchUserErrors()) {
      let msg =
        "Hay errores en el formulario. Por favor, revíselo e intente de nuevo";
      this.toggleError(msg);
    } else {
      console.log("Registro");
      let endpoint = "/notificaciones";
      let dataAux = this.registroNotificacion.value;
      let dataValues = {
        nombre: dataAux.nombre,
        mensaje: dataAux.mensaje
      };
      this._notificacionService.addNotificacion(dataValues).subscribe(
        response => {
          if (response.status == "success") {
            this.status = response.status;
          } else {
            this.status = "error";
          }
        },
        error => {
          this.status = "error";
          console.log(<any>error);
        }
      );
      this.dbHandler.postSomething(dataValues, endpoint).then((data: any) => {
        // data is already a JSON object
        if (!data.status) {
          let errorMsg = data.msg;
          this.toggleError(errorMsg);
        } else {
          this.ngOnInit();
        }
      });
    }
  }

  endUpdate() {
    if (this.catchUserErrors()) {
      let msg =
        "Hay errores en el formulario. Por favor, revíselo e intente de nuevo";
      this.toggleError(msg);
    } else {
      console.log("Registrando");
      let endpoint = "/notificaciones";
      let dataAux = this.registroNotificacion.value;
      let dataValues = {
        nombre: dataAux.nombre,
        mensaje: dataAux.mensaje
      };
      this._notificacionService
        .updateNotificacion(this.notificacionId, dataValues)
        .subscribe(
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
      this.dbHandler.putSomething(dataValues, endpoint).then((data: any) => {
        // data is already a JSON object
        if (!data.status) {
          let errorMsg = data.msg;
          this.toggleError(errorMsg);
        } else {
          this.ngOnInit();
        }
      });
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

  catchUserErrors() {
    let aux1 = this.fNotificacion.nombre.errors
      ? this.fNotificacion.nombre.errors.required
      : false;
    let aux2 = this.fNotificacion.mensaje.errors
      ? this.fNotificacion.mensaje.errors.required
      : false;
    let error = aux1 || aux2;
    return error;
  }
}

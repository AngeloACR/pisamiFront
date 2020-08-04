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

@Component({
  selector: "app-form-politicas",
  templateUrl: "./form-politicas.component.html",
  styleUrls: ["./form-politicas.component.scss"]
})
export class FormPoliticasComponent implements OnInit {
  @Input()
  editMode: number;

  @Input()
  politica: any;

  registroPolitica: FormGroup;

  constructor(
    private fb: FormBuilder,
    private common: CommonService,
    public actionSheetController: ActionSheetController,
    public dbHandler: DbHandlerService
  ) {}

  ngOnInit() {
    this.initForm(this.editMode);
  }

  initForm(editMode) {
    this.registroPolitica = new FormGroup({
      id: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required)
    });

    if (editMode) {
      this.registroPolitica.controls["nombre"].setValue(this.politica.nombre);
      this.registroPolitica.controls["id"].setValue(this.politica.id);
    }
  }

  get fPolitica() {
    return this.registroPolitica.controls;
  }

  endRegistro() {
    if (this.catchUserErrors()) {
      let msg =
        "Hay errores en el formulario. Por favor, revíselo e intente de nuevo";
      this.toggleError(msg);
    } else {
      console.log("Registro");
      let endpoint = "/politicas";
      let dataAux = this.registroPolitica.value;
      let dataValues = {};
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
      let endpoint = "/politicas";
      let dataAux = this.registroPolitica.value;
      let dataValues = {};
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
    let aux1 = this.fPolitica.nombre.errors
      ? this.fPolitica.nombre.errors.required
      : false;
    let aux2 = this.fPolitica.id.errors
      ? this.fPolitica.id.errors.required
      : false;
    let error = aux1 || aux2;
    return error;
  }
}

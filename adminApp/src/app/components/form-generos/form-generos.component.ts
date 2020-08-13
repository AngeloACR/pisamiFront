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
import { GenreService } from "src/app/services/genres.service";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";

@Component({
  selector: "app-form-generos",
  templateUrl: "./form-generos.component.html",
  styleUrls: ["./form-generos.component.scss"],
  providers: [GenreService]
})
export class FormGenerosComponent implements OnInit {
  @Input()
  editMode: number;

  @Input()
  genero: any;

  id: string;
  title: string;
  generos: any;
  status;
  generoId;

  registroGenero: FormGroup;

  constructor(
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    private dbHandler: DbHandlerService,
    private common: CommonService,
    private _genreService: GenreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm(this.editMode);
  }

  ngOnInit() {
    if (this.editMode == 1) {
      if (JSON.parse(localStorage.getItem("generoEdit"))) {
        this.generoId = JSON.parse(localStorage.getItem("generoEdit"));
        localStorage.removeItem("generoEdit");
        this._genreService.genreById(this.generoId).subscribe(data => {
          console.log(data);
          let genero = data["genero"];
          this.registroGenero.controls["nombre"].setValue(genero.nombre);
          this.registroGenero.controls["descripcion"].setValue(
            genero.descripcion
          );
        });
      }
    }
  }

  initForm(editMode, generoId?) {
    this.registroGenero = new FormGroup({
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required)
    });

    if (generoId) {
      localStorage.setItem("generoEdit", generoId);
    }
  }

  get fGenero() {
    return this.registroGenero.controls;
  }

  async endRegistro() {
    if (this.catchUserErrors()) {
      let msg =
        "Hay errores en el formulario. Por favor, revíselo e intente de nuevo";
      this.toggleError(msg);
    } else {
      console.log("Registrando");
      let endpoint = "/generos";
      let dataAux = this.registroGenero.value;
      let dataValues = {
        nombre: dataAux.nombre,
        descripcion: dataAux.descripcion
      };

      await this.common.showLoader();
      this._genreService.addGenre(dataValues).subscribe(
        response => {
          this.common.hideLoader();
          if (response.status != "error") {
            this.common.showToast("Género registrado correctamente");
            console.log(response);
            this.status = "success";
          } else {
            this.common.showAlert("Error registrando el género");
            this.status = "error";
          }
        },
        error => {
          this.common.hideLoader();
          this.status = "error";
          this.common.showAlert("Error registrando el género");
          console.log(<any>error);
        }
      );
    }
  }

  async endUpdate() {
    if (this.catchUserErrors()) {
      let msg =
        "Hay errores en el formulario. Por favor, revíselo e intente de nuevo";
      this.toggleError(msg);
    } else {
      console.log("Registrando");
      let endpoint = "/generos";
      let dataAux = this.registroGenero.value;
      let dataValues = {
        nombre: dataAux.nombre,
        descripcion: dataAux.descripcion
      };
      await this.common.showLoader();
      this._genreService.updateGenre(this.generoId, dataValues).subscribe(
        response => {
          this.common.hideLoader();
          if (response.status != "error") {
            this.common.showAlert("Género actualizado correctamente");
            this.router.navigate(["/lista-generos"]);
            this.status = "success";
          } else {
            this.common.showAlert("Error actualizando el género");
            this.status = "error";
          }
        },
        error => {
          this.common.showAlert("Error actualizando el género");
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
  catchUserErrors() {
    let aux1 = this.fGenero.nombre.errors
      ? this.fGenero.nombre.errors.required
      : false;
    let aux2 = this.fGenero.descripcion.errors
      ? this.fGenero.descripcion.errors.required
      : false;
    let error = aux1 || aux2;
    return error;
  }
}

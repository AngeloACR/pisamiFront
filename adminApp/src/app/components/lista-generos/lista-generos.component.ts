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
import { GenreService } from "src/app/services/genres.service";

import { FormGenerosComponent } from "../form-generos/form-generos.component";
@Component({
  selector: "app-lista-generos",
  templateUrl: "./lista-generos.component.html",
  styleUrls: ["./lista-generos.component.scss"],
  providers: [GenreService, FormGenerosComponent]
})
export class ListaGenerosComponent implements OnInit {
  generos: any;
  fields: any;
  buscarGenero: FormGroup;
  listData: any;
  status;
  selectedTitle: any;

  constructor(
    private router: Router,
    private dbHandler: DbHandlerService,
    private common: CommonService,
    private actionSheetController: ActionSheetController,
    private _genreService: GenreService,
    private _genreComponent: FormGenerosComponent
  ) {
    this.initForm();
  }

  async ngOnInit() {
    this.selectedTitle = "Lista de Géneros";
    await this.common.showLoader();
    this._genreService.listGenre().subscribe(
      response => {
        this.common.hideLoader();
        if (response.status != "error") {
          this.generos = response.generos;
        } else {
          this.status = "error";
        }
      },
      error => {
        this.common.hideLoader();
        this.status = "error";
        console.log(<any>error);
      }
    );
  }
  editarElemento(id) {
    let idGenero = id;
    this.router.navigate(["editargenero"]);
    return this._genreComponent.initForm(1, idGenero);
  }

  initForm() {
    this.buscarGenero = new FormGroup({
      nombre: new FormControl("")
    });
  }

  filtrarGenero() {
    console.log(name);
    this.selectedTitle = "Lista de Géneros";
    this._genreService.genreByName(this.buscarGenero.controls['nombre'].value).subscribe(
      response => {
        console.log(response);
        if (response.status != "error") {
          this.generos = response.genero;
          this.status = "success";
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

  habilitarGenero(event) {}

  editarGenero(event) {
    console.log(event);
    console.log(this.generos);
    let genero = this.generos[event];
    console.log(genero);
    genero = JSON.stringify(genero);
    this.router.navigate(["/editargenero", { genero: genero }]);
  }

  async eliminarGenero(id) {
    await this.common.showLoader();
    this._genreService.deleteGenre(id).subscribe(
      response => {
        this.common.hideLoader();
        if (response.status != "error") {
          this.common.showToast("Género eliminado exitosamente");
          this.status = "success";
          this.ngOnInit();
        } else {
          this.common.showAlert("Error eliminando el género");
          this.status = "error";
        }
      },
      error => {
        this.common.hideLoader();
        this.common.showAlert("Error eliminando el género");
        this.status = "error";
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

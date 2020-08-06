import { CommonService } from "../../services/common.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
//import { DbHandlerService } from '../../services/db-handler.service';
import { MenuController } from "@ionic/angular";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  status;
  token;
  identity;
  constructor(
    private auth: AuthService,
    private _userService: UserService,
    //    private dbHandler: DbHandlerService,
    private common: CommonService,
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    private menuCtrl: MenuController,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.login = new FormGroup({
      correo: new FormControl("", Validators.required),
      contrasena: new FormControl("", Validators.required)
    });
  }

  async logUser() {
    if (this.catchUserErrors()) {
      this.toggleError();
    } else {
      var data = this.login.value;
      await this.common.showLoader();
      this._userService.signup(data).subscribe(
        response => {
          //token
          this.common.hideLoader();
          if (response.status != "error" && response.tipo_usuario == 0) {
            console.log(response);
            this.status = "success";
            this.token = response.token;
            this.identity = response;
            localStorage.setItem("token", this.token);
            localStorage.setItem("identity", JSON.stringify(this.identity));
            this.common.showToast("Sesión iniciada con éxito");
            this.router.navigate(["welcome"]);
          } else {
            this.common.showAlert("Error al iniciar sesión");
            this.status = "error";
          }
        },
        error => {
          this.common.hideLoader();
          this.common.showAlert("Error al iniciar sesión");
          this.status = "error";
          console.log(<any>error);
        }
      );
    }
  }

  restore() {
    this.router.navigateByUrl("/restore");
  }

  flush() {
    this.login.setValue({
      correo: "",
      contrasena: ""
    });
  }
  registro() {
    this.router.navigateByUrl("/registro");
  }

  get fLogin() {
    return this.login.controls;
  }

  async toggleError() {
    let actionSheet = await this.actionSheetController.create({
      header:
        "Hay errores en el formulario. Por favor, revíselo e intente de nuevo",
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
    let aux1 = this.fLogin.correo.errors
      ? this.fLogin.correo.errors.required
      : false;
    let aux2 = this.fLogin.contrasena.errors
      ? this.fLogin.contrasena.errors.required
      : false;
    let error = aux1 || aux2;
    return error;
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";

//import { DbHandlerService } from '../../services/db-handler.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { ActionSheetController } from "@ionic/angular";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-restore-pass",
  templateUrl: "./restore-pass.component.html",
  styleUrls: ["./restore-pass.component.scss"],
  providers: [UserService]
})
export class RestorePassComponent implements OnInit {
  restorePassword: FormGroup;
  selectedTitle: any;
  correo = 1;
  codigo;
  contrasena;

  showConfirm = {};
  showCode = {};
  message: any;
  mail;
  coderestore;
  constructor(
    private auth: AuthService,
    private common: CommonService,
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private _userService: UserService,
  ) {}

  ngOnInit() {
    this.restorePassword = new FormGroup({
      mail: new FormControl("", [Validators.required, Validators.email]),
      code: new FormControl("", [Validators.required]),
      contrasena: new FormControl("", [Validators.required])
    });
    this.showConfirm = {
      showConfirm: false
    };
  }

  close() {
    this.router.navigateByUrl("/");
  }

  restorePass() {
    
    if (this.catchUserErrors()) {
      this.toggleError();
    } else {
      this.showConfirm = {
        showConfirm: true
      };
      var data = this.restorePassword.value;
      this.mail = data.mail;
      this._userService.resetPass(data.mail).subscribe((data: any) => {
       if(data.status == "success"){
          console.log(data);
          this.coderestore = data.codigo;
          this.showConfirm = {
            showConfirm: true
          };
          this.correo = null;
          this.codigo = 1;
          this.message = data.message;
        }
        else{
          this.message = data.message;
          console.log(data);
        }
      });
    }
  }
  checkCode(){
    
    var data = this.restorePassword.value;
    if(this.coderestore == data.code){
      this.codigo = null;
      this.contrasena = 1;
      this.showConfirm = {
        showConfirm: false
      };
    }
    else{
      this.message = "Este codigo es incorrecto";
    }
  }
  changePass(){
    var data = this.restorePassword.value;
    let dataValues = {
      contrasena: data.contrasena,
      correo: this.mail,
    };
    this._userService.actualizarContrasena(dataValues).subscribe(response =>{
      console.log(response);
    });
  }
  flush() {
    this.restorePassword.reset();
  }
  registro() {
    this.router.navigateByUrl("/registro");
  }

  get fRestore() {
    return this.restorePassword.controls;
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
    let aux1 = this.fRestore.mail.errors
      ? this.fRestore.mail.errors.required
      : false;
    let error = aux1;
    return error;
  }
}

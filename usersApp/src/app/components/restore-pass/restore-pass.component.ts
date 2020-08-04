import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
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
  styleUrls: ["./restore-pass.component.scss"]
})
export class RestorePassComponent implements OnInit {
  restorePassword: FormGroup;
  selectedTitle: any;

  showConfirm = {};
  constructor(
    private auth: AuthService,
    private common: CommonService,
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit() {
    this.restorePassword = new FormGroup({
      mail: new FormControl("", [Validators.required, Validators.email])
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
      this.auth.restorePass(data).subscribe((data: any) => {
        this.showConfirm = {
          showConfirm: true
        };
      });
    }
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

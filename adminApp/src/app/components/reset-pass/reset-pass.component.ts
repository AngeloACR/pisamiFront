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
import { ConfirmPasswordValidator } from '../../directives/must-match.validator';


@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
})
export class ResetPassComponent implements OnInit {
  resetPassword: FormGroup;

  showConfirm = {};

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit() {
    this.resetPassword = new FormGroup({
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      cpassword: new FormControl("", Validators.required),
    },
      ConfirmPasswordValidator.MatchPassword
    );
    this.showConfirm = {
      showConfirm: false,
    }
  }

  close(){
    this.router.navigateByUrl("/");
  }

  resetPass() {
    if (this.catchUserErrors()) {
      this.toggleError();
    } else {
      var data = this.resetPassword.value;
      this.showConfirm = {
          showConfirm: true,
      }
      this.auth.reset(data).subscribe((data: any) => {
        console.log('Reset succesful')
        this.showConfirm = {
          showConfirm: true,
        }
      });
    }
  }

  flush() {
    this.resetPassword.reset();
  }

  get fPassword() {
    return this.resetPassword.controls;
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
    let aux1 = this.fPassword.cpassword.errors
      ? this.fPassword.cpassword.errors.required
      : false;
    let aux2 = this.fPassword.password.errors
      ? this.fPassword.password.errors.required
      : false;
    let aux3 = this.fPassword.password.errors
      ? this.fPassword.password.errors.minLength
      : false;
    let aux4 = this.fPassword.cpassword.errors
      ? this.fPassword.cpassword.errors.ConfirmPassword
      : false;
    let error = aux1 || aux2 || aux3 || aux4;
    return error;
  }
}

import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { forkJoin } from "rxjs";
import { DbHandler } from "../../services/db-handler.service";
import { FileHandler } from "../../services/file.service";
import { FileValidator } from "../../directives/fileValidator";
import { ConfirmPasswordValidator } from "../../directives/must-match.validator";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss'],
})
export class FormUsuariosComponent implements OnInit {
  
  @Input()
  editMode: number;

  @Input()
  user: any;

  id: string;

  registroUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dbHandler: DbHandler,
    private fileHandler: FileHandler,
    public actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
    this.initForm(this.editMode);
  }

  verMas() {
      this.fileHandler.downloadPoliticas();
  }

  initForm(editMode) {
    this.registroUser = new FormGroup(
      {
        nombre: new FormControl("", Validators.required),
        apellido: new FormControl("", Validators.required),
        tlf: new FormControl("", Validators.required),
        correo: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(6)
        ]),
        cpassword: new FormControl("", Validators.required),
        aceptarTerminos: new FormControl("")
      },
      ConfirmPasswordValidator.MatchPassword
    );
    if(editMode){
    this.actualizarUser.controls['nombre'].setValue(this.user.nombre)
    this.actualizarUser.controls['apellido'].setValue(this.user.apellido)
    this.actualizarUser.controls['tlf'].setValue(this.user.tlf)
    this.actualizarUser.controls['correo'].setValue(this.user.correo)
    this.actualizarUser.controls['correo'].disable()
    this.actualizarUser.controls['password'].setValue(this.user.password)

    }
  }

  get fUser() {
    return this.registroUser.controls;
  }

  endRegistro() {
    if (this.catchUserErrors()) {
      this.toggleError();
    } else {
      console.log("Registrando");
    }
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
      let aux1 = this.fUser.nombre.errors
        ? this.fUser.nombre.errors.required
        : false;
      let aux2 = this.fUser.correo.errors
        ? this.fUser.correo.errors.required
        : false;
      let aux3 = this.fUser.apellido.errors
        ? this.fUser.apellido.errors.required
        : false;
      let aux4 = this.fUser.tlf.errors ? this.fUser.tlf.errors.required : false;
      let aux5 = this.fUser.password.errors
        ? this.fUser.password.errors.required
        : false;
      let aux6 = this.fUser.password.errors
        ? this.fUser.password.errors.minlength
        : false;
      let error = aux1 || aux2 || aux3 || aux4 || aux5 || aux6;
      return error;
  }
}

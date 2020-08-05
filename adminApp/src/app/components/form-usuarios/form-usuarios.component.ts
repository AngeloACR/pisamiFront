import { CommonService } from "../../services/common.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Location } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { forkJoin } from "rxjs";
import { DbHandlerService } from "../../services/db-handler.service";
import { FileHandlerService } from "../../services/file-handler.service";
import { FileValidator } from "../../directives/fileValidator";
import { ConfirmPasswordValidator } from "../../directives/must-match.validator";
import { ActionSheetController } from "@ionic/angular";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";

@Component({
  selector: "app-form-usuarios",
  templateUrl: "./form-usuarios.component.html",
  styleUrls: ["./form-usuarios.component.scss"],
  providers: [UserService]
})
export class FormUsuariosComponent implements OnInit {
  @Input()
  editMode: number;

  @Input()
  user: any;

  @Input()
  tipo: any;

  @Output()
  registerCompleted = new EventEmitter<any>();

  id: string;
  status;
  userId;

  registroUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dbHandler: DbHandlerService,
    private common: CommonService,
    private fileHandler: FileHandlerService,
    public actionSheetController: ActionSheetController,
    private _userService: UserService,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.initForm(this.editMode);
    if (this.editMode == 1) {
      if (JSON.parse(localStorage.getItem("userEdit"))) {
        this.userId = JSON.parse(localStorage.getItem("userEdit"));
        localStorage.removeItem("userEdit");
        this._userService.userById(this.userId).subscribe(data => {
          let user = data["user"];
          console.log(user.nombre);
          this.registroUser.controls["nombre"].setValue(user.nombre);
          this.registroUser.controls["apellido"].setValue(user.apellido);
          this.registroUser.controls["telefono"].setValue(user.telefono);
          this.registroUser.controls["correo"].setValue(user.correo);
          this.registroUser.controls["contrasena"].setValue(user.contrasena);
        });
      }
    }
  }

  initForm(editMode, userId?) {
    this.registroUser = new FormGroup(
      {
        nombre: new FormControl("", Validators.required),
        apellido: new FormControl("", Validators.required),
        telefono: new FormControl("", Validators.required),
        correo: new FormControl("", [Validators.required, Validators.email]),
        contrasena: new FormControl("", [
          Validators.required,
          Validators.minLength(6)
        ]),
        cpassword: new FormControl("", Validators.required),
        aceptarTerminos: new FormControl("")
      },
      ConfirmPasswordValidator.MatchPassword
    );
    if (userId) {
      localStorage.setItem("userEdit", userId);
    }
  }

  get fUser() {
    return this.registroUser.controls;
  }

  endRegistro() {
    if (this.catchUserErrors()) {
      let msg =
        "Hay errores en el formulario. Por favor, revíselo e intente de nuevo";
      this.toggleError(msg);
    } else {
      console.log("Registrando");
      let endpoint = "/usuario";
      let dataAux = this.registroUser.value;
      if(this.tipo == "user"){
        this.tipo = 2;
      }
      else{
        this.tipo = 1;
      }
      let dataValues = {
        nombre: dataAux.nombre,
        apellido: dataAux.apellido,
        telefono: dataAux.telefono,
        correo: dataAux.correo,
        contrasena: dataAux.contrasena,
        tipo_usuario: this.tipo,
      };
      this._userService.register(dataValues).subscribe(
        response => {
          if (response.status == "success") {
            this.status = response.status;
            console.log("ok");
          } else {
            this.status = "error";
            console.log("bad");
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
      let endpoint = "/usuario";
      let dataAux = this.registroUser.value;
      let dataValues = {
        nombre: dataAux.nombre,
        apellido: dataAux.apellido,
        telefono: dataAux.telefono,
        correo: dataAux.correo
      };
      console.log(this.userId);
      this._userService
        .actualizarUsuario(this.userId, dataValues)
        .subscribe(data => {
          this._location.back();
        });
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
    let aux1 = this.fUser.nombre.errors
      ? this.fUser.nombre.errors.required
      : false;
    let aux2 = this.fUser.correo.errors
      ? this.fUser.correo.errors.required
      : false;
    let aux3 = this.fUser.apellido.errors
      ? this.fUser.apellido.errors.required
      : false;
    let aux4 = this.fUser.telefono.errors
      ? this.fUser.telefono.errors.required
      : false;
    let aux6 = this.fUser.contrasena.errors
      ? this.fUser.contrasena.errors.minlength
      : false;
    let error = aux1 || aux2 || aux3 || aux4 || aux6;
    return error;
  }
}

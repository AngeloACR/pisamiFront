import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";
import { AuthService } from "../../services/auth.service";
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

@Input()
tipo: any;

  @Output()
  registerCompleted = new EventEmitter<any>();

  id: string;

  registroUser: FormGroup;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dbHandler: DbHandlerService,
    private fileHandler: FileHandlerService,
    public actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
    this.initForm(this.editMode);
  }

  verMas(url) {
      console.log('Traer archivo')
      //this.fileHandler.downloadPoliticas();
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
    this.registroUser.controls['nombre'].setValue(this.user.nombre)
    this.registroUser.controls['apellido'].setValue(this.user.apellido)
    this.registroUser.controls['tlf'].setValue(this.user.tlf)
    this.registroUser.controls['correo'].setValue(this.user.correo)
    this.registroUser.controls['correo'].disable()
    this.registroUser.controls['password'].setValue(this.user.password)

    }
  }

  get fUser() {
    return this.registroUser.controls;
  }

  endRegistro() {
    if (this.catchUserErrors()) {
      let msg ="Hay errores en el formulario. Por favor, revíselo e intente de nuevo"
      this.toggleError(msg);
    } else {
      console.log("Registrando");
      let endpoint = '/usuario'
      let dataAux = this.registroUser.value;
      let dataValues = {
        nombredeusuario: dataAux.nombre,
        apellidodeusuario: dataAux.apellido,
        tlf: dataAux.tlf,
        correo: dataAux.correo,
        password: dataAux.password,
        tipoUsuario: this.tipo,
      };
      this.dbHandler.postSomething(dataValues, endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.ngOnInit()
          this.registerCompleted.emit();
        }
      });
    }
  }

  endUpdate() {
    if (this.catchUserErrors()) {
      let msg ="Hay errores en el formulario. Por favor, revíselo e intente de nuevo"
      this.toggleError(msg);
    } else {
      console.log("Registrando");
      let endpoint = '/usuario'
      let dataAux = this.registroUser.value;
      let dataValues = {
        nombredeusuario: dataAux.nombre,
        apellidodeusuario: dataAux.apellido,
        tlf: dataAux.tlf,
        correo: dataAux.correo,
        password: dataAux.password,
      };
      this.dbHandler.putSomething(dataValues, endpoint).then((data: any) => {
        // data is already a JSON object
        if(!data.status){
          let errorMsg = data.msg;
          this.toggleError(errorMsg)
        } else{
          this.ngOnInit()
        }
      });
    }
  }

  async toggleError(msg) {
    let actionSheet = await this.actionSheetController.create({
      header:
        msg,
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

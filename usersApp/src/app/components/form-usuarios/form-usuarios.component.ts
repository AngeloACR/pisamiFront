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
import {UserService} from "../../services/user.service";
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
  status: any;
  identity;

  registroUser: FormGroup;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dbHandler: DbHandlerService,
    private fileHandler: FileHandlerService,
    public actionSheetController: ActionSheetController,
    private _userService: UserService,
  ) {
    this.identity = this._userService.getIdentity(); 

   }

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
        telefono: new FormControl("", Validators.required),
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
      console.log(this.user);
      this._userService.userId(this.identity.userId).subscribe(response =>{
        this.registroUser.controls['nombre'].setValue(response['user'].nombre)
        this.registroUser.controls['apellido'].setValue(response['user'].apellido)
        this.registroUser.controls['telefono'].setValue(response['user'].telefono)
        this.registroUser.controls['correo'].setValue(response['user'].correo)
        this.registroUser.controls['password'].setValue(response['user'].password)
      }); 

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
        contrasena: dataAux.password,
        tipo_usuario: this.tipo,
      };
      this._userService.register(dataValues).subscribe(
         response => {
           if(response.status == "success"){
            this.status = response.status;
           }
           else{
            this.status = 'error';
           }
         },
         error => {
          this.status = 'error';
          console.log(<any>error);
         }
      );
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
        contrasena: dataAux.password,
        tipo_usuario: this.tipo,
      };
      let userdata = JSON.parse(localStorage.getItem('identity'));
      this._userService.actualizarUsuario(userdata.userId,dataValues).subscribe(response =>{
        console.log("ok");
      });
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
      let aux4 = this.fUser.telefono.errors ? this.fUser.telefono.errors.required : false;
      /*let aux5 = this.fUser.password.errors
        ? this.fUser.password.errors.required
        : false;*/
      let aux6 = this.fUser.password.errors
        ? this.fUser.password.errors.minlength
        : false;
      let error = aux1 || aux2 || aux3 || aux4 || aux6;
      return error;
  }
}

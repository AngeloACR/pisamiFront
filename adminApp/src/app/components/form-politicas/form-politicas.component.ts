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
import { UserService } from '../../services/user.service';
import { PoliticaService } from '../../services/politica.service';



@Component({
  selector: 'app-form-politicas',
  templateUrl: './form-politicas.component.html',
  styleUrls: ['./form-politicas.component.scss'],
  providers: [UserService,PoliticaService],
})
export class FormPoliticasComponent implements OnInit {
  @Input()
  editMode: number;

  @Input()
  politica: any;

  politicaFile;

  politicaId;

  registroPolitica: FormGroup;
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: "1",
    uploadAPI:  {
      url:"http://localhost:8000/api/politicas/upload",
      method:"POST",
      headers: {
     "Authorization" : this._userService.getIdentity().token
      },
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu pdf',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
};

  constructor(
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,   
    public dbHandler: DbHandlerService,
    public _userService: UserService,
    public _PoliticaService: PoliticaService,
    private common: CommonService,
  ) {
   }

  ngOnInit() {
    this.initForm(this.editMode);
    if(this.editMode == 1){
      if(JSON.parse(localStorage.getItem('politicaEdit'))){
        this.politicaId = JSON.parse(localStorage.getItem('politicaEdit'));
        localStorage.removeItem("politicaEdit");
        this._PoliticaService.politicaById(this.politicaId).subscribe(data =>{
          console.log(data);
          let politica = data['politica'];
          this.registroPolitica.controls['nombre'].setValue(politica.nombre);
      this.registroPolitica.controls['id'].setValue(politica.id);       
        });
      }
    }
  }


  initForm(editMode,idPolitica?) {
    this.registroPolitica = new FormGroup({
      id: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required)
    });

    if(idPolitica){
      localStorage.setItem('politicaEdit',idPolitica);
    }
  }

  get fPolitica() {
    return this.registroPolitica.controls;
  }

  endRegistro() {
    if (this.catchUserErrors()) {
      let msg =
        "Hay errores en el formulario. Por favor, revíselo e intente de nuevo";
      this.toggleError(msg);
    } else {
      console.log("Registro");
      let endpoint = "/politicas";
      let dataAux = this.registroPolitica.value;
      let dataValues = {
        nombre : dataAux.nombre,
        archivo : this.politicaFile
      };

      this._PoliticaService.addPolitica(dataValues).subscribe(response =>{
        console.log(response);
      });
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
      let endpoint = "/politicas";
      let dataAux = this.registroPolitica.value;
      if(this.politicaFile){
        let dataValues = {
          nombre : dataAux.nombre,
          archivo: this.politicaFile
        };
        this._PoliticaService.updatePolitica(this.politicaId,dataValues).subscribe(respose => {
          this.ngOnInit();

        });
      }
      else{
        let dataValues = {
          nombre : dataAux.nombre
        };
        this._PoliticaService.updatePolitica(this.politicaId,dataValues).subscribe(respose => {
          this.ngOnInit();
        });
      }
      
      
      /*this.dbHandler.putSomething(dataValues, endpoint).then((data: any) => {
        // data is already a JSON object
        if (!data.status) {
          let errorMsg = data.msg;
          this.toggleError(errorMsg);
        } else {
          this.ngOnInit();
        }
      });*/
    }
  }

  subirPdf(data){
    //let datos = JSON.parse(data.response);
    this.politicaFile = data['body'].file; 
    console.log(data['body'].file);
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
    let aux1 = this.fPolitica.nombre.errors
      ? this.fPolitica.nombre.errors.required
      : false;
    let aux2 = this.fPolitica.id.errors
      ? this.fPolitica.id.errors.required
      : false;
    let error = aux1 || aux2;
    return error;
  }
}

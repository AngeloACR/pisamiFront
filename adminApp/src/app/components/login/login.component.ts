import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
//import { DbHandlerService } from '../../services/db-handler.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(
    private auth: AuthService,
    //    private dbHandler: DbHandlerService,
    private fb: FormBuilder,
    public actionSheetController: ActionSheetController,
    private router: Router
  ) { }

  ngOnInit() {
    this.login = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  }

  logUser() {
        if(this.catchUserErrors()){
      this.toggleError();
    } else{    
    var data = this.login.value;
    this.auth.login(data).subscribe((logData: any) => {
      if (logData.auth) {
        this.auth.storeData(logData);
        //        this.actualizar();
      }
    });
    }
  }

  restore() {
    this.router.navigateByUrl("/restore");
  }

  flush() {
    this.login.setValue({
      username: '',
      password: ''
    });
  }
  registro() {
    this.router.navigateByUrl('/registro');
  }

     get fLogin() { 
      return this.login.controls;
     }

 async toggleError() {
    let actionSheet = await this.actionSheetController.create({
      header: 'Hay errores en el formulario. Por favor, revíselo e intente de nuevo',
      buttons: [{
        text: 'VOLVER',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('CANCELANDO...');
        }
      }]
    });
    await actionSheet.present();
  }
    catchUserErrors(){
        let aux1 = this.fLogin.username.errors ? this.fLogin.username.errors.required : false;
        let aux2 = this.fLogin.password.errors ? this.fLogin.password.errors.required : false;
        let error = aux1 || aux2;
        return error
      
  }
 
}

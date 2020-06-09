import { AbstractControl } from '@angular/forms';
export class ConfirmPasswordValidator {
  static MatchPassword(control: AbstractControl) {
    let password = control.get('password').value;
    let confirmPassword = control.get('cpassword').value;
    if (password != confirmPassword) {
      control.get('cpassword').setErrors({ ConfirmPassword: true });
    }
    else {
      return null;
    }
  }
}
import {AbstractControl} from '@angular/forms';

export class RegisterValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if(password != confirmPassword) {
            // console.log('false');
            AC.get('confirmPassword').setErrors( {MatchPassword: true} )
            return false;
        } else {
            // console.log('true');
            AC.get('confirmPassword').setErrors(null);
            return true;
        }
    }
}
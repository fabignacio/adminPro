import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidatorsService {

    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    constructor() { }

    validarPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get("password");
        const confirmarPassword = control.get("password2");
        return password?.value === confirmarPassword?.value ? null : { noSonIguales: true }
    }
};

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* SERVICIOS */
import { ValidatorsService } from '../../shared/validators/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})

export class RegisterComponent {

  public formSubmitted: boolean = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required],
  }, {
    validators: this.vs.validarPassword
  }
  );

  constructor(private fb: FormBuilder, private vs: ValidatorsService) { };

  crearUsuario = () => {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      console.log('Posteando formulario...');
    } else {
      console.error('Formulario no es correcto');
    };
  };

  campoNoValido = (campo: string): boolean => {

    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    };

  };

  aceptaTerminos = () => {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  };

  contrasenaInvalida = () => {

    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    };
  };
};

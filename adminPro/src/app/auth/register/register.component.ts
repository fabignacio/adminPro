import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* SERVICIOS */
import { ValidatorsService } from '../../services/validators/validators.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

/* INTERFACE */
import { RegisterForm } from '../../interfaces/usuario/register-form.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})

export class RegisterComponent {

  public formSubmitted: boolean = false;

  public registerForm = this.fb.group({
    nombre: ['Fabian', [Validators.required, Validators.minLength(3)]],
    email: ['test1@test.cl', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.required],
  }, {
    validators: this.vs.validarPassword
  }
  );

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorsService,
    private usuario: UsuarioService
  ) { };

  crearUsuario = () => {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      console.error('Formulario no es correcto');
    };

    this.usuario.crearUsuario((this.registerForm.value as RegisterForm))
      .subscribe({
        next: (resp) => { console.log('Usuario Creado'); console.log(resp); },
        error: (err) => console.error(err.error.msg)
      })
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

import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

/* SERVICIOS */
import { ValidatorsService } from './../../services/validators/validators.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

/*INTERFACE */
import { LoginForm } from '../../interfaces/usuario/login-form.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted: boolean = false;

  public loginForm = this.fb.group({
    email: ['test1@test.cl', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    password: ['123456', Validators.required],
    remember: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private vs: ValidatorsService,
    private usuario: UsuarioService
  ) { }

  login = () => {

    this.usuario.login((this.loginForm.value as LoginForm))
      .subscribe({
        next: (resp) => { console.log(resp) },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      });
  };
};

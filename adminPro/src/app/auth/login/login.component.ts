import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

/* GOOGLE */
declare const google: any;

/* SERVICIOS */
import { ValidatorsService } from './../../services/validators/validators.service';
import { LoginService } from '../../services/auth/login/login.service';

/*INTERFACE */
import { LoginForm } from '../../interfaces/usuario/login-form.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted: boolean = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private vs: ValidatorsService,
    private loginS: LoginService,
    private ngZone: NgZone
  ) { };

  ngAfterViewInit(): void {
    this.googleInit();
  };

  googleInit = () => {

    google.accounts.id.initialize({
      client_id: '796164393396-b51ocqg5qpqdfrg9ndcccctidnqrfdjr.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  };

  handleCredentialResponse = (response: any) => {
    this.loginS.loginGoogle(response.credential)
      .subscribe(
        {
          next: (resp) => {

            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            });

          },
          error: (err) => { Swal.fire('Error', err.error.msg, 'error') }
        }
      )
  };

  login = () => {

    this.loginS.login((this.loginForm.value as LoginForm))
      .subscribe({
        next: (resp) => {

          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value!);
          } else {
            localStorage.removeItem('email');
          };
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      });
  };
};

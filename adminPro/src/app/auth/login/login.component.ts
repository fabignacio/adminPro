import {
  Component,
  ViewChild,
  AfterViewInit,
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
import { UsuarioService } from '../../services/auth/usuario/usuario.service';

/*INTERFACE */
import { LoginForm } from '../../interfaces/usuario/login-form.interface';

/* VARIABLES DE ENTORNO */
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted: boolean = false;
  public auth2: any;
  private readonly _client_id: string = environment.CLIENT_ID;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private vs: ValidatorsService,
    private loginS: UsuarioService,
    private ngZone: NgZone
  ) { };

  ngAfterViewInit(): void {
    this.renderButton();
  };

  renderButton() {

    google.accounts.id.initialize({
      client_id: this._client_id,
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );

    this.loginS.googleInit(google);
  };

  handleCredentialResponse = (response: any) => {
    this.loginS.loginGoogle(response.credential)
      .subscribe(
        {
          next: (resp) => {

            this.ngZone.run(() => {
              this.router.navigateByUrl(`/dashboard`);
            });

          },
          error: (err) => { Swal.fire('Error', err.error.msg, 'error') }
        }
      )
  };

  login() {

    this.loginS.login((this.loginForm.value as LoginForm))
      .subscribe({
        next: (resp) => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value || '');
          } else {
            localStorage.removeItem('email');
          }

          // Navegar al Dashboard
          this.router.navigateByUrl(`/dashboard`);
        },
        error: (err: any) => { Swal.fire('Error', err.error.msg, 'error'); }
      });
  };

};

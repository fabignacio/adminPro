import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

/* SERVICIOS */
import { ValidatorsService } from './../../services/validators/validators.service';
import { UsuarioService } from './../../services/auth/usuario/usuario.service';

/* MODELOS */
import { Usuario } from '../../models/usuarios/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public profileForm!: FormGroup;
  public usuario: Usuario;

  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    private vs: ValidatorsService
  ) {
    this.usuario = userService.usuario;
  };

  ngOnInit() {

    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.pattern(this.vs.emailPattern)]]
    });

  };

  actualizarPerfil = () => {
    this.userService.actualizarPerfil(this.profileForm.value)
      .subscribe({
        next: (resp: any) => {

          const { nombre, email } = resp.usuarioActualizado

          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Exito', 'Usuario actualizado', 'success')
        },
        error: (err: any) => {
          Swal.fire('Error', err.error.msg, 'error')
        }
      });
  };

};

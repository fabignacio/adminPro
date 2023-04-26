import { Component, OnInit } from '@angular/core';

/* SERVICIOS */
import { UsuarioService } from '../../../../services/auth/usuario/usuario.service';

/* MODELO */
import { Usuario } from '../../../../models/usuarios/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public desde: number = 0;

  constructor(private usuarioS: UsuarioService) { };


  ngOnInit(): void {
    this.cargarUsuario();
  };

  cargarUsuario = () => {

    this.usuarioS.cargarUsuario(this.desde)
      .subscribe({
        next: ({ total, usuarios }) => {
          this.totalUsuarios = total;

          if (usuarios.length !== 0) { this.usuarios = usuarios; };
        }
      });
  };

  cambiarPagina = (valor: number) => {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    };

    this.cargarUsuario();

  };
};

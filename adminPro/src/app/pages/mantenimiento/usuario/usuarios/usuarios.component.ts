import { Component, OnInit } from '@angular/core';

/* SERVICIOS */
import { BusquedaService } from '../../../../services/busquedas/busqueda.service';
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
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(
    private busquedaService: BusquedaService,
    private usuarioS: UsuarioService
  ) { };


  ngOnInit(): void {
    this.cargarUsuario();
  };

  cargarUsuario = () => {

    this.cargando = true;

    this.usuarioS.cargarUsuario(this.desde)
      .subscribe({
        next: ({ total, usuarios }) => {
          this.totalUsuarios = total;

          if (usuarios.length !== 0) {
            this.usuariosTemp = usuarios;
            this.usuarios = usuarios;
          };

          this.cargando = false;
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

  buscar = (termino: string) => {

    if (termino.trim.length === 0) {
      return this.usuarios = [...this.usuariosTemp];
    }

    this.busquedaService.buscar('usuarios', termino)
      .subscribe({
        next: (resultados: any) => this.usuarios = resultados
      });
    return true;
  };

};

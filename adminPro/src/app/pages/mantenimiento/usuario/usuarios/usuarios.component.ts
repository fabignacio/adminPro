import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

/* SERVICIOS */
import { BusquedaService } from '../../../../services/busquedas/busqueda.service';
import { ModalImagenService } from '../../../../services/modalImagen/modal-imagen.service';
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
    private modalService: ModalImagenService,
    private usuarioS: UsuarioService
  ) { };


  ngOnInit(): void {
    this.cargarUsuario();

    this.modalService.nuevaImagen.subscribe(img => this.cargarUsuario());
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

  /* METODOS QUE INVOLUCRAN AL SERVICIO */

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

  eliminarUsuario = (usuario: Usuario) => {

    if (usuario.uid === this.usuarioS.uid) { return Swal.fire('Error', 'No puede borrase a si mismo') };

    Swal.fire({
      title: `¿Está seguro de borrar a ${usuario.nombre}? `,
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioS.eliminarUsuario(usuario.uid || '')
          .subscribe({
            next: (resp: any) => {
              Swal.fire(
                'Eliminado!',
                `${usuario.nombre} fue eliminado correctamente`,
                'success'
              );
              this.cargarUsuario();
            }
          });
      };
    });
    return true;
  };

  cambiarRole = (usuario: Usuario) => {
    this.usuarioS.actualizarRole(usuario)
      .subscribe({
        next: (resp: any) => console.log(resp)
      })
  };

  /* METODO PARA MOSTRAR EL MODAL */
  abrirModal = (usuario: Usuario) => {
    const uid: string = usuario.uid || '';
    const img: string = usuario.img || '';

    this.modalService.abrirModal('usuarios', uid, img);
  };

};

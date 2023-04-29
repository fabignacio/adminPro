import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

/* SERVICIOS */
import { BusquedaService } from './../../../services/busquedas/busqueda.service';
import { MedicosService } from '../../../services/medicos/medicos.service';
import { ModalImagenService } from './../../../services/modalImagen/modal-imagen.service';

/* MODELO */
import { Medico } from './../../../models/medico/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true
  public desde: number = 0;
  public totalMedicos: number = 0;

  constructor(
    private busquedaService: BusquedaService,
    private medicoS: MedicosService,
    private modalService: ModalImagenService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.modalService.nuevaImagen.subscribe(img => this.cargarMedicos());
  };

  cambiarPagina = (valor: number) => {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalMedicos) {
      this.desde -= valor;
    };

    this.cargarMedicos();
  };

  cargarMedicos = () => {
    this.medicoS.cargarMedicos(this.desde)
      .subscribe(
        {
          next: ({ total, medicos }) => {
            this.totalMedicos = total;

            if (medicos.length !== 0) {
              this.medicosTemp = medicos;
              this.medicos = medicos;
            };
            this.cargando = false;
          }
        }
      )
  };

  eliminarMedico = (medico: Medico) => {
    Swal.fire({
      title: `¿Está seguro de borrar a ${medico.nombre}? `,
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.medicoS.eliminarMedico(medico.uid)
          .subscribe({
            next: (resp: any) => {
              Swal.fire('Eliminado',
                `${medico.nombre} fue eliminado correctamente`,
                'success'
              );
              this.cargarMedicos();
            }
          });
      };
    });
    return true;
  };

  buscar = (termino: string) => {

    if (termino.trim().length === 0) {
      return this.medicos = [...this.medicosTemp];
    }

    this.busquedaService.buscar('medicos', termino)
      .subscribe({ next: (resultados: any) => this.medicos = resultados });
    return true;
  };


  abrirModal = (medico: Medico) => {
    const uid: string = medico.uid || '';
    const img: string = medico.img || '';

    this.modalService.abrirModal('medicos', uid, img);
  };

};

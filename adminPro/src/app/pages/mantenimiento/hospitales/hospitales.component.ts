import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

/* SERVICIO */
import { HospitalesService } from '../../../services/hospitales/hospitales.service';

/* MODELO */
import { Hospital } from '../../../models/hospital/hospital.model';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true
  public desde: number = 0;
  public totalHospitales: number = 0;

  constructor(
    private hospitalS: HospitalesService
  ) {

  };

  ngOnInit(): void {
    this.cargarHospitales();

  };

  cambiarPagina = (valor: number) => {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalHospitales) {
      this.desde -= valor;
    };

    this.cargarHospitales();
  };

  cargarHospitales = () => {
    this.cargando = true;

    this.hospitalS.cargarHospitales(this.desde)
      .subscribe({
        next: ({ total, hospitales }) => {
          this.totalHospitales = total;

          if (hospitales.length !== 0) {
            this.hospitalesTemp = hospitales;
            this.hospitales = hospitales;
          };
          this.cargando = false;
        }
      });
  };

  guardarCambios = (hospital: Hospital) => {

    this.hospitalS.actualizarHospital(hospital.uid, hospital.nombre)
      .subscribe({
        next: (resp: any) => Swal.fire('Actualizado', hospital.nombre, 'success')
      });
  };

  eliminarHospital = (hospital: Hospital) => {

    Swal.fire({
      title: `¿Está seguro de borrar a ${hospital.nombre}? `,
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.hospitalS.eliminarHospital(hospital.uid)
          .subscribe({
            next: (resp: any) => {
              Swal.fire('Eliminado',
                `${hospital.nombre} fue eliminado correctamente`,
                'success'
              );
              this.cargarHospitales();
            }
          });
      };
    });
    return true;

  };

  async abrirSweetAlert() {

    const { value } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Ingrese nombre del nuevo hospital',
      inputPlaceholder: '',
      showCancelButton: true
    });

    if (value.trim().length > 0) {

      this.hospitalS.crearHospital(value)
        .subscribe({
          next: (resp: any) => {
            let nombre: string = resp.hospitalDB.nombre;
            Swal.fire('Creado correctamente', `El hospital ${nombre} fue guardado`, 'success');
            this.cargarHospitales();
          }
        });

    };
  };

};

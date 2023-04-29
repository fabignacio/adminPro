import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

/* SERVICIOS */
import { HospitalesService } from './../../../../services/hospitales/hospitales.service';
import { MedicosService } from '../../../../services/medicos/medicos.service';
import { ModalImagenService } from '../../../../services/modalImagen/modal-imagen.service';

/* MODELOS */
import { Hospital } from '../../../../models/hospital/hospital.model';
import { Medico } from '../../../../models/medico/medico.model';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styles: [
  ]
})
export class ActualizarComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hospitalS: HospitalesService,
    private modalService: ModalImagenService,
    private medicoS: MedicosService
  ) { };

  ngOnInit(): void {

    this.modalService.nuevaImagen.subscribe(img => this.router.navigateByUrl(`/dashboard/medicos`));

    this.activatedRoute.params.subscribe(({ id }) => { this.cargarMedico(id); });

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
      .subscribe({
        next: hospitalId => {
          this.hospitalSeleccionado = this.hospitales.find(h => h.uid === hospitalId);
        }
      });
  };

  cargarMedico = (id: string) => {

    if (id === 'nuevo') {
      return;
    };

    this.medicoS.obtenerMedicoPorId(id)
      .subscribe(
        {
          next: (medico: any) => {

            if (!medico) { return this.router.navigateByUrl(`/dashboard/medicos`) };

            const { nombre, hospital: { _id } } = medico;
            this.medicoSeleccionado = medico;
            this.medicoForm.setValue({ nombre, hospital: _id });
            return true;
          },
          error: () => {
            return this.router.navigateByUrl(`/dashboard/medicos`);
          }
        }
      );
  };

  guardarMedico = () => {

    if (this.medicoSeleccionado) {

      const data = {
        ...this.medicoForm.value,
        uid: this.medicoSeleccionado.uid
      };

      this.medicoS.actualizarMedico(data)
        .subscribe({
          next: (resp: any) => {
            Swal.fire('Actualizado', `${resp.medicoActualizado.nombre} fue actualizado exitosamente`, 'success');
          },
          error: (err: any) => { Swal.fire('Error', err.error.msg, 'error') }
        });

    } else {
      this.medicoS.crearMedico(this.medicoForm.value)
        .subscribe({
          next: (resp: any) => {
            Swal.fire('Guardado', `${resp.medicoDB.nombre} fue creado exitosamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${resp.medicoDB.uid}`);
          },
          error: (err: any) => { Swal.fire('Error', err.error.msg, 'error') }
        });
    }
  };

  cargarHospitales = () => {
    this.hospitalS.cargasHospitalesResumido()
      .subscribe({ next: (resultados) => { this.hospitales = resultados.hospitales; } });
  };

  abrirModal = (medico: Medico) => {
    const uid: string = medico.uid || '';
    const img: string = medico.img || '';

    this.modalService.abrirModal('medicos', uid, img);
  };

};

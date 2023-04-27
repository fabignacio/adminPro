import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../../services/hospitales/hospitales.service';
import { Hospital } from '../../../models/hospital/hospital.model';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true


  constructor(
    private hospitalS: HospitalesService
  ) {

  };

  ngOnInit(): void {
    this.cargarHospitales();

  };

  cargarHospitales = () => {
    this.cargando = true;

    this.hospitalS.cargarHospitales()
      .subscribe({
        next: hospitales => {
          this.cargando = false;
          this.hospitales = hospitales;
        }
      })
  }


};

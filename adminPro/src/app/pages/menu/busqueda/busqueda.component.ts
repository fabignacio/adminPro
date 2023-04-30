import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* SERVICIO */
import { BusquedaService } from '../../../services/busquedas/busqueda.service';

/* MODELOS */
import { Hospital } from './../../../models/hospital/hospital.model';
import { Medico } from './../../../models/medico/medico.model';
import { Usuario } from '../../../models/usuarios/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedaService: BusquedaService
  ) { };

  ngOnInit(): void {


    this.activatedRoute.params
      .subscribe({
        next: ({ termino }) => this.busquedaGlobal(termino)
      });
  };

  busquedaGlobal = (termino: string) => {
    this.busquedaService.busquedaGlobal(termino)
      .subscribe({
        next: (resp: any) => {
          this.usuarios = resp.usuarios;
          this.medicos = resp.medicos;
          this.hospitales = resp.hospitales;
        }
      });
  };
};

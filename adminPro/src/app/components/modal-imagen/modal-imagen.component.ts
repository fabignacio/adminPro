import { Component, OnInit } from '@angular/core';

/* SERVICIOS */
import { ModalImagenService } from '../../services/modalImagen/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.css']
})
export class ModalImagenComponent implements OnInit {

  public ocultarModal: boolean = false;

  constructor(public modalS: ModalImagenService) { };

  ngOnInit() {

  };

  cerrarModal = () => {
    this.modalS.cerrarModal();
  };

};

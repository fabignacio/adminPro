import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.css']
})
export class ModalImagenComponent implements OnInit {

  public ocultarModal: boolean = false;

  constructor() { };

  ngOnInit() {

  };

  cerrarModal = () => {
    this.ocultarModal = true;
  };

};

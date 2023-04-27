import { Component } from '@angular/core';
import Swal from 'sweetalert2';

/* SERVICIOS */
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { ModalImagenService } from '../../services/modalImagen/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.css']
})
export class ModalImagenComponent {

  public ocultarModal: boolean = false;
  public imagenSubir!: File;
  public imgTemporal: any = '';

  constructor(
    private fileUpload: FileUploadService,
    public modalService: ModalImagenService
  ) { };

  cerrarModal = () => {
    this.modalService.cerrarModal();
    this.imgTemporal = null;
  };

  cambiarImagen = (event: any) => {

    this.imagenSubir = event.target.files[0];

    if (!this.imagenSubir) { return this.imgTemporal = null; };

    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir);

    reader.onloadend = () => {
      this.imgTemporal = reader.result;
    };

    return true;
  };

  subirImagen = () => {

    const id = this.modalService.id;
    const tipo = this.modalService.tipo;

    this.fileUpload
      .actualizaImagen(this.imagenSubir, tipo, id || '')
      .then(img => {

        Swal.fire('Exito', 'Imagen actualizada', 'success');
        this.modalService.nuevaImagen.emit(img);
        this.cerrarModal();

      });

  };


};

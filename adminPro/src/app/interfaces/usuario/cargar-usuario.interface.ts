import { Usuario } from '../../models/usuarios/usuario.model';

export interface CargarUsuario {
    totalRegistros: number;
    usuarios: Usuario[]
};
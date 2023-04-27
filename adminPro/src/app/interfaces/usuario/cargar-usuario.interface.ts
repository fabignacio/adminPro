import { Usuario } from '../../models/usuarios/usuario.model';

export interface CargarUsuario {
    totalActivos: number;
    usuarios: Usuario[]
};
import { Medico } from './../../models/medico/medico.model';

export interface CargarMedicos {
    totalActivos: number;
    medicos: Medico[]
};
import { Hospital } from './../../models/hospital/hospital.model';


export interface CargarHospitales {
    totalActivos: number;
    hospitales: Hospital[]
};
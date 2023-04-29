import { Hospital } from "../hospital/hospital.model";

interface _MedicoUser {
    _id: string;
    nombre: string;
    img: string;
}
export class Medico {

    constructor(
        public nombre: string,
        public estado: boolean,
        public uid?: string,
        public usuario?: _MedicoUser,
        public hospital?: Hospital,
        public img?: string,
    ) { }

};
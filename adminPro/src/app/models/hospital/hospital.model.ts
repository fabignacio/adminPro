interface _HospitalUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Hospital {

    constructor(
        public nombre: string,
        public estado: boolean,
        public uid?: string,
        public usuario?: _HospitalUser,
        public img?: string,
    ) { }

};
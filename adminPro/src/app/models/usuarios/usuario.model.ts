import { environment } from '../../../environments/environment';

export class Usuario {

    private readonly _baseUrl: string = environment.URL_BACKEND_IMG;

    constructor(
        public nombre: string,
        public email: string,
        public estado: boolean,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ) { };

    get imagenUrl() {
        if (this.img?.includes('https')) {
            return this.img;
        };

        if (this.img) {
            return `${this._baseUrl}/usuarios/${this.img}`;
        } else {
            return `${this._baseUrl}/usuarios/no-image`;
        };
    };
};
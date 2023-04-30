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
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string,
    ) { };

    get imagenUrl() {

        let urlImagen: string = ''

        if (!this.img) {
            urlImagen = `${this._baseUrl}/usuarios/no-image`;
        } else if (this.img) {

            if (this.img?.includes('https')) { return urlImagen; };

            urlImagen = `${this._baseUrl}/usuarios/${this.img}`;
        };

        return urlImagen;
    };
};
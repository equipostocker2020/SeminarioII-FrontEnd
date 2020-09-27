export class Usuario {

    constructor(
        public NOMBRE?: string,
        public APELLIDO?: string,
        public DIRECCION?: string,
        public EMAIL?: string,
        public DNI?: string,
        public CONTRASEÑA?: string,
        public CUIT_CUIL?: string,
        public ROL?: string,
        public FECHA_NAC?: Date,
        public EDAD?: string,
        public ID_USUARIO?: string,
    ) { }

}
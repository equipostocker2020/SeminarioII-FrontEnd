export class Inscripcion {

    constructor(
        public 	estado?: string,
        public 	nombre ?: string,
        public 	apellido ?: string,
        public 	nombre_aula?: string,
        public 	nombre_materia?: string,
        public 	dia?: string,
        public 	horario?: string,
        public 	anho?: string,
        public id_inscripcion?: string
    ) { }

    /*constructor(
        public 	id_alumno ?: string,
        public 	id_aula_materia?: string,
        public 	estado?: string,
        public id_inscripcion?: string
        // public ID_USUARIO?: string,
    ) { }*/
}
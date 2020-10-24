import { Usuario } from './usuario.models';
export class Inscripcion {
  constructor(
    public id_inscripcion?: string,
    public id_alumno?: Usuario,
    public id_aula_materia?: string,
    // public estado?: string
  ) {}
}

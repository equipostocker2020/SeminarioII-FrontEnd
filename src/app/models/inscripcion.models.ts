import { Aula_materia } from './aula_materia.models';
import { Usuario } from './usuario.models';

export class Inscripcion {
  constructor(
    public id_inscripcion?: string,
    public id_alumno?: Usuario,
    public id_aula_materia?: Aula_materia,
    // public estado?: string
  ) {}
}

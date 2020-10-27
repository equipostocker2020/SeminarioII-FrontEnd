import { Aula_materia } from './aula_materia.models';
import { Usuario } from './usuario.models';

export class Inscripcion {
  constructor(
    public id_inscripcion?: string,
    public id_alumno?: string,
    public id_aula_materia?: string,
    public id_rel?: string,
    public nombre?: string,
    public estado?: string,
    // public estado?: string
  ) {}
}

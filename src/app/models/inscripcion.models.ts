import { Aula_materia } from './aula_materia.models';
import { Usuario } from './usuario.models';

export class Inscripcion {
  constructor(
    public id_inscripcion?: string,
    public id_alumno?: string,
    public id_aula_materia?: string,
    public estado?: string,
    public id_rel?: string,
    public nombre?: string,
    public nombre_materia?: string,
    public nombre_aula?: string,
    public dia?: string,
    public horario?: string,
    public id_nota?: string,
    public nombre_instancia?: string,
    public nota?:string,
  ) {}
}

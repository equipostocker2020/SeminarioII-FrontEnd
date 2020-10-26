import { Instancia } from './instancia.models';
import { Materia } from './materia.models';

export class Evaluacion {
  constructor(
    public id_materia?: Materia,
    public id_instancia?: Instancia,
    public fecha?: string,
    public estado?: string,
    public id_evaluacion?: string,
    public nombre_instancia?: string,
    public nombre_materia?:string
  ) {}
}

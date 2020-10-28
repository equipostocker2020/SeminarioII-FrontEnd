export class Aula_materia {
  constructor(
    public id_aula?: string,
    public id_materia?: string,
    public anho?: string,
    public id_docente?: string,
    public id_rel?: string,
    public estado?: string,
    public id_usuario?: string,
    public nombre_materia?:string,
    public nombre_aula?:string,
    public apellido?:string,
    public dia?:string,
    public horario?:string
  ) {}
}

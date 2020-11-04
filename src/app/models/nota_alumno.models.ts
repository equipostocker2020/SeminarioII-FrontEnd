export class Nota_alumno {
    constructor(
      public id_nota?: string,
      public id_inscripcion?: string,
      public id_instancia?: string,
      public nota?: string,
      public estado?: string,
      // public observaciones?: string
    ) {}
  }
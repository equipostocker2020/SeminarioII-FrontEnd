export class Usuario {
  constructor(
    public nombre?: string,
    public apellido?: string,
    public direccion?: string,
    public email?: string,
    public dni?: string,
    public contraseña?: string,
    public cuit_cuil?: string,
    public rol?: string,
    public fecha_nac?: string,
    public edad?: string,
    public id_usuario?: string,
    public estado?: string
  ) {}
}

import { Component, OnInit } from '@angular/core';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styles: [],
})
export class AlumnosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario;
  usuarioLog: Usuario;
  token: string;

  constructor(
    public tipoUsuario: TipoUsuarioService,
    public usuarioService: UsuarioService
  ) {
    this.usuarioService.usuario;
    this.usuarioLog = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.getAlumno();
  }

  getAlumno() {
    this.tipoUsuario.getAlumno().subscribe((resp: any) => {
      this.usuarios = resp.usuario;
    });
  }

  updateUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe((resp: any) => {
      this.eliminarStorage();
    });
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('idActualizar', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuarioActualizar', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  cambiarEstado(usuario: Usuario) {
    usuario.fecha_nac = this.transformarFecha(usuario.fecha_nac);
    this.usuarioService.actualizarUsuario(usuario).subscribe((resp: any) => {});
  }

  transformarFecha(params: string) {
    if (params.indexOf('T') !== -1) {
      const fecha = params.split('T');
      const fechaTransformada = fecha[0];
      return fechaTransformada;
    } else {
      return;
    }
  }
}

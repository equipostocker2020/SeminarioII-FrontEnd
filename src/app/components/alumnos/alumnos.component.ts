import { Component, OnInit } from '@angular/core';
import {TipoUsuarioService} from '../../services/tipo-usuario.service'
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styles: [
  ]
})
export class AlumnosComponent implements OnInit {

  usuarios: Usuario [] = [];
  usuario: Usuario;
  token: string;

  constructor(
    public tipoUsuario: TipoUsuarioService,
    public usuarioService: UsuarioService
  ) {
    this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.getAlumno();
  }

  getAlumno(){
    this.tipoUsuario.getAlumno()
    .subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp.usuario;
    });
  }

  updateUsuario(usuario: Usuario){
    this.usuarioService.actualizarUsuario(usuario)
    .subscribe((resp: any) => {
     console.log(resp);
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
}

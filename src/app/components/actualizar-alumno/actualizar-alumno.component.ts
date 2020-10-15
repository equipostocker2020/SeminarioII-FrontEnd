import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-actualizar-alumno',
  templateUrl: './actualizar-alumno.component.html',
  styleUrls: [],
})
export class ActualizarAlumnoComponent implements OnInit {
  token: string;
  usuario: Usuario;

  constructor(public usuarioService: UsuarioService, public router: Router) {
    this.usuario = this.usuarioService.usuario;
    console.log('->', this.usuario);
    this.cargarStorage();
    this.guardarStorage(
      this.usuarioService.usuario.id_usuario,
      this.usuarioService.token,
      this.usuario
    );
  }

  ngOnInit(): void {}

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuarioActualizar'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem(
      'idActualizar',
      this.usuarioService.usuario.id_usuario
    );
    localStorage.setItem('token', this.usuarioService.token);
    localStorage.setItem('usuarioActualizar', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  resetStorage() {
    localStorage.setItem('id', this.usuarioService.usuario.id_usuario);
    localStorage.setItem('token', this.usuarioService.token);
    localStorage.setItem(
      'usuario',
      JSON.stringify(this.usuarioService.usuario)
    );
    this.usuario = this.usuarioService.usuario;
    this.token = this.token;
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.apellido = usuario.apellido;
    this.usuario.direccion = usuario.direccion;
    this.usuario.email = usuario.email;
    this.usuario.dni = usuario.dni;
    this.usuario.cuit_cuil = usuario.cuit_cuil;
    this.usuario.fecha_nac = usuario.fecha_nac;
    this.usuario.edad = usuario.edad;
    this.usuarioService.token = this.token;
    this.usuarioService
      .actualizarUsuario(this.usuario)
      .subscribe((resp: any) => {
        this.router.navigate(['/alumnos']);
        this.resetStorage();
      });
  }
}

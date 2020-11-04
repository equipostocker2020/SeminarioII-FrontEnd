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
  usuarioLogueado: Usuario;
  usuarioLog: Usuario;

  constructor(public usuarioService: UsuarioService, public router: Router) {
    this.usuario = this.usuarioService.usuario;
    this.usuarioLog = this.usuarioService.usuario;
    this.cargarStorage();
    this.guardarStorage(
      this.usuario.id_usuario,
      this.usuarioService.token,
      this.usuario
    );
  }

  ngOnInit(): void {}

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuarioActualizar'));
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
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
    this.guardarStorage(
      this.usuario.id_usuario,
      this.usuarioService.token,
      this.usuario
    );
    this.usuarioService
      .actualizarUsuario(this.usuario)
      .subscribe((resp: any) => {
        if (this.usuarioLogueado.rol === 'ESTUDIANTE'){
          this.router.navigate(['/dashboard']);
        }else{
        this.router.navigate(['/dashboard']);
        }
        this.removerItemsStorage();
      });
  }

  removerItemsStorage(){
    localStorage.removeItem('idActualizar');
    localStorage.removeItem('usuarioActualizar');
    localStorage.removeItem('id');
  }

  eliminarStorage() {
    localStorage.clear();
  }
}

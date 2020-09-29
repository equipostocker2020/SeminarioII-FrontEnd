import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id_usuario', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('Usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          console.log('respuesta servicio :' + resp);
          console.log(resp.token)
          console.log(resp.usuario);
          this.guardarStorage(resp.usuario.id_usuario, resp.token, resp.usuario);
          return true;
        }),
        catchError((err: any) => {
          console.log(err);
          Swal.fire('Error al ingresar', err.error.message, 'error');
          return err.throw(err);
        }));
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire('Usuario creado', usuario.email, 'success');
          return resp.usuario;
        }),
        catchError((err: any) => {
          console.log(err);
          Swal.fire('Error al registrarse', 'saasa', 'error');
          return err.throw(err);
        }));
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario.id_usuario;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire('Usuario actualizado', usuario.email, 'success');
          return resp.usuario;
        }),
        catchError((err: any) => {
          console.log(err);
          // console.log(err.error.errors.message);
          // const errores = err.error.errors.message;
          // Swal.fire('Error al actualizar', errores.substring(27), 'error');
          return err.throw(err);
        }));
  }
  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .map(resp => {
        Swal.fire('Usuario Borrado', 'El usuario fue eliminado correctamente', 'success');
        return true;
      });
  }
}



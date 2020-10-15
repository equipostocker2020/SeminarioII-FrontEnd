import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.models';
import { Aula_materia } from '../models/aula_materia.models';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  token: string;
  usuario: Usuario;
  aula_materia: Aula_materia;

  constructor(
    public router: Router,
    public http: HttpClient
  ) {
    this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('ID_USUARIO', id);
    localStorage.setItem('token', token);
    localStorage.setItem('Usuario', JSON.stringify(usuario));
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

  getTodo() {
    let url = URL_SERVICIOS + '/aulas_materias';
    url += '?token=' + this.token;
    console.log(url);
    return this.http.get(url);
  }

  postTodo(aula_materia: Aula_materia) {
    let url = URL_SERVICIOS + '/aulas_materias';
    url += '?token=' + this.token;
    return this.http.post(url, aula_materia)
      .pipe(
        map((resp: any) => {
          Swal.fire('Se registro una nueva Asignacion', 'success');
          return resp.usuario;
        }),
        catchError((err: any) => {
          console.log(err);
          Swal.fire('Error al registrarse', err.error.error.sqlMessage, 'error');
          return err.throw(err.error.error.sqlMessage);
        }));
  }
}

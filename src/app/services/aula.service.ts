import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { Aula } from '../models/aula.models';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AulaService {
  token: string;
  aula: Aula;
  idUsuario: string;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
    this.getIdUsuarioLocalStorage();
  }

  guardarStorage(id: string, token: string, aula: Aula) {
    localStorage.setItem('id_aula', id);
    localStorage.setItem('token', token);
    localStorage.setItem('aula', JSON.stringify(aula));
    this.aula = aula;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.aula = JSON.parse(localStorage.getItem('aula'));
    } else {
      this.token = '';
      this.aula = null;
    }
  }

  getIdUsuarioLocalStorage() {
    if (localStorage.getItem('id_usuario')) {
      this.idUsuario = localStorage.getItem('id_usuario');
      return this.idUsuario;
    }
  }

  getAula() {
    let url = URL_SERVICIOS + '/aula';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  postAula(aula: Aula) {
    let url = URL_SERVICIOS + '/aula';
    url += '?token=' + this.token + '&idUsuario=' + this.getIdUsuarioLocalStorage();
    return this.http.post(url, aula).pipe(
      map((resp: any) => {
        Swal.fire('Aula creada', aula.nombre_aula, 'success');
        return resp.aula;
      }),
      catchError((err: any) => {
        console.log(err);
        Swal.fire(
          'Error al registrar aula',
          err.error.error.sqlMessage,
          'error'
        );
        return err.throw(err.error.error.sqlMessage);
      })
    );
  }

  actualizarAula(aula: Aula) {
    let url = URL_SERVICIOS + '/aula/' + aula.id_aula;
    url += '?token=' + this.token + '&idUsuario=' + this.getIdUsuarioLocalStorage();
    return this.http.put(url, aula).pipe(
      map((resp: any) => {
        Swal.fire('Aula actualizada', aula.nombre_aula, 'success');
        return resp.aula;
      }),
      catchError((err: any) => {
        console.log(err);
        Swal.fire(
          'Error al actualizar usuario',
          err.error.error.sqlMessage,
          'error'
        );
        return err.throw(err.error.error.sqlMessage);
      })
    );
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token + '&idUsuario=' + this.getIdUsuarioLocalStorage();
    return this.http.delete(url).map((resp) => {
      Swal.fire(
        'Usuario Borrado',
        'El usuario fue eliminado correctamente',
        'success'
      );
      return true;
    });
  }
}

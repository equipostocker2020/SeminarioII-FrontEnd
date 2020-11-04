import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import Swal from 'sweetalert2';
import { Nota_alumno } from '../models/nota_alumno.models';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotaAlumnoService {
  token: string;
  notaAlumno: Nota_alumno;
  idUsuario: string;

  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    this.cargarStorage();
   }

  guardarStorage(id: string, token: string, NotaAlumno: Nota_alumno) {
    localStorage.setItem('id_evaluacion', id);
    localStorage.setItem('token', token);
    localStorage.setItem('Nota_alumno', JSON.stringify(NotaAlumno));
    this.notaAlumno = NotaAlumno;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.notaAlumno = JSON.parse(localStorage.getItem('Nota_alumno'));
    } else {
      this.token = '';
      this.notaAlumno = null;
    }
  }

  getIdUsuarioLocalStorage() {
    if (localStorage.getItem('id_usuario')) {
      this.idUsuario = localStorage.getItem('id_usuario');
      return this.idUsuario;
    }
  }

  getNotaAlumno() {
    let url = URL_SERVICIOS + '/nota_alumno';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getInstancias() {
    let url = URL_SERVICIOS + '/instancia_evaluacion';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  postNotaAlumno(notaAlumno: Nota_alumno){
    let url = URL_SERVICIOS + '/nota_alumno';
    url += '?token=' + this.token + '&idUsuario=' + this.getIdUsuarioLocalStorage();
    return this.http.post(url, notaAlumno).pipe(
      map((resp: any) =>{
        Swal.fire('Se registro una nota', '', 'success');
        return resp.nota_alumno;
      }),
      catchError((err: any) => {
        console.log(err);
        Swal.fire(
          'Error al registrar la nota',
          err.error.error.sqlMessage,
          'error'
        );
        return err.throw(err.error.error.sqlMessage);
      })
    );
  }
}


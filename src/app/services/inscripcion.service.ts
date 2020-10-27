import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { Inscripcion } from '../models/inscripcion.models';
import Swal from 'sweetalert2';
import 'rxjs/add/operator/map';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  token: string;
  inscripcion: Inscripcion;
  idUsuario: string;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
    this.getIdUsuarioLocalStorage();
  }

  guardarStorage(id: string, token: string, inscripcion: Inscripcion) {
    localStorage.setItem('id_inscripcion', id);
    localStorage.setItem('token', token);
    localStorage.setItem('inscripcion', JSON.stringify(inscripcion));
    this.inscripcion = inscripcion;
    this.token = token;
  }

  getIdUsuarioLocalStorage(){
    if (localStorage.getItem('id_usuario')){
      this.idUsuario = localStorage.getItem('id_usuario');
      return this.idUsuario;
    }
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.inscripcion = JSON.parse(localStorage.getItem('inscripcion'));
    } else {
      this.token = '';
      this.inscripcion = null;
    }
  }

  getInscripcion() {
    let url = URL_SERVICIOS + '/inscripcion';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  postInscripcion(inscripcion: Inscripcion){
    let url = URL_SERVICIOS + '/inscripcion';
    url += '?token=' + this.token + '&idUsuario=' + this.getIdUsuarioLocalStorage();
    return this.http.post(url, inscripcion)
    .pipe(
      map((resp: any) =>{
        Swal.fire('Se registro una inscripcion', 'success');
        return resp.inscripcion;
      }),
      catchError((err: any) =>{
        Swal.fire('Error al registrar la inscripcion', err.error.error.sqlMessage, 'error');
        return err.throw(err.error.error.sqlMessage);
      }));
  }

  actualizarInscripcion(inscripcion: Inscripcion) {
    let url = URL_SERVICIOS + '/inscripcion/' + inscripcion.id_inscripcion;
    url += '?token=' + this.token + '&idUsuario=' + this.getIdUsuarioLocalStorage();
    return this.http.put(url, inscripcion)
    .pipe(
      map((resp: any) => {
        Swal.fire('La inscripcion ha sido actualizada', 'success');
        return resp.inscripcion;
      }),
     catchError((err: any) =>{
       Swal.fire('Error al actualizar inscripcion', err.error.error.sqlMessage, 'error' );
       return err.throw(err.error.error.sqlMessage);
     }));
  }

  borrarInscripcion(id: string){
    let url = URL_SERVICIOS + '/evaluacion/' + id;
    url += '?token=' + this.token + '&idUsuario=' + this.getIdUsuarioLocalStorage();
    return this.http.delete(url)
    .map(resp => {
      Swal.fire('Inscripcion Eliminada', 'la inscripcion ha sido eliminada', 'success');
      return true;
    });
  }
}

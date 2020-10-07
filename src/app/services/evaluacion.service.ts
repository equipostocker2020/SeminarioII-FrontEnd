import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { Evaluacion } from '../models/evaluacion.models';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  token: string;
  evaluacion: Evaluacion;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
   }

   guardarStorage(id: string, token: string, Evaluacion: Evaluacion) {
    localStorage.setItem('id_evaluacion', id);
    localStorage.setItem('token', token);
    localStorage.setItem('Evaluacion', JSON.stringify(Evaluacion));
    this.evaluacion = Evaluacion;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.evaluacion = JSON.parse(localStorage.getItem('Evaluacion'));
    } else {
      this.token = '';
      this.evaluacion = null;
    }
  }

  getEvaluacion() {
    let url = URL_SERVICIOS + '/evaluacion';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getInstanciaEvaluacion(){
    let url = URL_SERVICIOS + '/instancia_evaluacion';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  postEvaluacion(evaluacion: Evaluacion){
    let url = URL_SERVICIOS + '/evaluacion';
    url += '?token=' + this.token;
    return this.http.post(url, evaluacion)
    .pipe(
      map((resp: any) => {
        Swal.fire('Aula creada', 'success');
        return resp.evaluacion;
      }),
      catchError((err: any) => {
        console.log(err);
        Swal.fire('Error al registrar evaluacion', err.error.error.sqlMessage, 'error');
        return err.throw(err.error.error.sqlMessage);
      }));

  }

  actualizarEvaluacion(evaluacion: Evaluacion) {
    let url = URL_SERVICIOS + '/evaluacion/' + evaluacion.id_evaluacion;
    url += '?token=' + this.token;
    return this.http.put(url, evaluacion)
      .pipe(
        map((resp: any) => {
          Swal.fire('Evaluacion actualizada', 'success');
          return resp.evaluacion;
        }),
        catchError((err: any) => {
          console.log(err);
          Swal.fire('Error al actualizar evaluacion', err.error.error.sqlMessage, 'error' );
          return err.throw(err.error.error.sqlMessage);
        }));
  }

  borrarEvaluacion(id: string) {
    let url = URL_SERVICIOS + '/evaluacion/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .map(resp => {
        Swal.fire('Evaluacion Borrada', 'La evaluacion fue eliminada correctamente', 'success');
        return true;
      });
  }

}
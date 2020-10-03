import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { Materia } from '../models/materia.models';
import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  token: string;
  materia: Materia;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
   }

   guardarStorage(id: string, token: string, Materia: Materia) {
    localStorage.setItem('id_materia', id);
    localStorage.setItem('token', token);
    localStorage.setItem('materia', JSON.stringify(Materia));
    this.materia = Materia;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.materia = JSON.parse(localStorage.getItem('materia'));
    } else {
      this.token = '';
      this.materia = null;
    }
  }

  getMateria() {
    let url = URL_SERVICIOS + '/materia';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  postMateria(materia: Materia){
    let url = URL_SERVICIOS + '/materia';
    url +=  '?token=' + this.token;
    return this.http.post(url, materia)
    .pipe(
      map((resp: any)=>{
        Swal.fire('Materia creada', materia.nombre_materia, 'success')
        return resp.materia;
      }),
      catchError((err: any) =>{
        console.log(err);
        Swal.fire('Error al registrar materia', err, 'warning');
        return err.throw(err);
      }));
  }

  actualizarMateria(materia: Materia) {
    let url = URL_SERVICIOS + '/materia/' + materia.id_materia;
    url += '?token=' + this.token;
    return this.http.put(url, materia)
      .pipe(
        map((resp: any) => {
          Swal.fire('Materia actualizada', materia.nombre_materia, 'success');
          return resp.materia;
        }),
        catchError((err: any) => {
          console.log(err);
          return err.throw(err);
        }));
  }
  borrarMateria(id: string) {
    let url = URL_SERVICIOS + '/materia/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .map(resp => {
        Swal.fire('Materia Borrada', 'LA materia fue eliminado correctamente', 'success');
        return true;
      });
  }
}

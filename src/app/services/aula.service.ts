import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { Aula } from '../models/aula.models';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  token: string;
  Aula: Aula;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
   }

   guardarStorage(id: string, token: string, Aula: Aula) {
    localStorage.setItem('id_aula', id);
    localStorage.setItem('token', token);
    localStorage.setItem('Aula', JSON.stringify(Aula));
    this.Aula = Aula;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.Aula = JSON.parse(localStorage.getItem('Aula'));
    } else {
      this.token = '';
      this.Aula = null;
    }
  }

  getAula() {
    let url = URL_SERVICIOS + '/aula';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  postAula(aula: Aula){
    let url = URL_SERVICIOS + '/aula';
    url += '?token=' + this.token;
    return this.http.post(url, aula)
    .pipe(
      map((resp: any) => {
        Swal.fire('Aula creada', aula.nombre_aula, 'success');
        return resp.aula;
      }),
      catchError((err: any) => {
        console.log(err);
        Swal.fire('Error al registrar aula', err, 'error');
        return err.throw(err);
      }));

  }
}
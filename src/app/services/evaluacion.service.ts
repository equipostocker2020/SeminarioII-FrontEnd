import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { Evaluacion } from '../models/evaluacion.models';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  token: string;
  Evaluacion: Evaluacion;

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
    this.Evaluacion = Evaluacion;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.Evaluacion = JSON.parse(localStorage.getItem('Evaluacion'));
    } else {
      this.token = '';
      this.Evaluacion = null;
    }
  }

  getEvaluacion() {
    let url = URL_SERVICIOS + '/evaluacion';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { Inscripcion } from '../models/inscripcion.models';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  token: string;
  inscripcion: Inscripcion;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  guardarStorage(id: string, token: string, Inscripcion: Inscripcion) {
    localStorage.setItem('id_inscripcion', id);
    localStorage.setItem('token', token);
    localStorage.setItem('inscripcion', JSON.stringify(Inscripcion));
    this.inscripcion = Inscripcion;
    this.token = token;
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
}

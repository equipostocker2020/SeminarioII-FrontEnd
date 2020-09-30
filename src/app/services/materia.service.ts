import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { Materia } from '../models/materia.models';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  token: string;
  Materia: Materia;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
   }

   guardarStorage(id: string, token: string, Materia: Materia) {
    localStorage.setItem('id_materia', id);
    localStorage.setItem('token', token);
    localStorage.setItem('Materia', JSON.stringify(Materia));
    this.Materia = Materia;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.Materia = JSON.parse(localStorage.getItem('Materia'));
    } else {
      this.token = '';
      this.Materia = null;
    }
  }

  getMateria() {
    let url = URL_SERVICIOS + '/materia';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

}

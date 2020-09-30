import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { Aula } from '../models/aula.models';

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
}
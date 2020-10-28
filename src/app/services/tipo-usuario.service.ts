import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root',
})
export class TipoUsuarioService {
  token: string;
  usuario: Usuario;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('ID_USUARIO', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  getAlumno() {
    let url = URL_SERVICIOS + '/tipo/alumno';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getDocente() {
    let url = URL_SERVICIOS + '/tipo/docente';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getInscripcionesAlumno(id: string){
    let url = URL_SERVICIOS + '/tipo/alumno/inscripciones/' + id;
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getAsignacionesDocente(id: string){
    let url = URL_SERVICIOS + '/tipo/docente/aulas_materias/' + id;
    url += '?token=' + this.token;
    return this.http.get(url);
  }
}

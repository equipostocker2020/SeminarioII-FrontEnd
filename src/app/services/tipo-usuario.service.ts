import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { filter, map, catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {
  token: string;
  usuario: Usuario;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
   }

  guardarStorage(ID_USUARIO: string, token: string, usuario: Usuario) {
    localStorage.setItem('ID_USUARIO', ID_USUARIO);
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
}

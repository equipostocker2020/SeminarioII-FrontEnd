import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { Usuario } from '../models/usuario.models';
import { AulaMateriaService } from './aulaMateria.service';
import { map,catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class TipoUsuarioService {
  token: string;
  usuario: Usuario;
  id_docente: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public aulaMateriaService: AulaMateriaService
    ) {
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

  getAlumnoPorId(id:string){
    let url = URL_SERVICIOS + '/tipo/alumno/' + id;
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getDocente() {
    let url = URL_SERVICIOS + '/tipo/docente';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getDocentePorId(id:string){
    let url = URL_SERVICIOS + '/tipo/docente/' + id;
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getInscripcionesAlumno(id: string) {
    let url = URL_SERVICIOS + '/tipo/alumno/inscripciones/' + id;
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getAsignacionesDocente(id: string) {
    let url = URL_SERVICIOS + '/tipo/docente/aulas_materias/' + id;
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getnotasPorAlumnoPorId(id: string){
    let url = URL_SERVICIOS + '/tipo/notasxalumno/' + id;
    url += '?token=' + this.token;
    return this.http.get(url);
    // .pipe(
    //   map((resp: any) => {
    //   return resp.id;
    //   }),
    //   catchError((err: any) => {
    //     console.log(err);
    //     Swal.fire(
    //       'No hay Alumnos',
    //       err.error,
    //       'error'
    //     );
    //     return err.throw(err.error.error);
    //   })
    // );
  }

  getIdUsuarioLocalStorage() {
    if (localStorage.getItem('id_usuario')) {
      this.id_docente = localStorage.getItem('id_usuario');
      return this.id_docente;
    }
  }

  getNotasPorAlumnoDesdeDocente(id: string){
    let url = URL_SERVICIOS + '/tipo/alumno/misnotas/' + id;
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  getNotasPorAlumnoDocenteReload(id: string){
    let url = URL_SERVICIOS + '/tipo/docente/notasxalumno/' + id;
    url += '?token=' + this.token + '&idUsuario=' + this.getIdUsuarioLocalStorage();
    return this.http.get(url);
  }
 
}

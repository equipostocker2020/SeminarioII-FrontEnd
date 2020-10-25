import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inscripcion } from 'src/app/models/inscripcion.models';
import { Usuario } from 'src/app/models/usuario.models';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { Aula_materia } from 'src/app/models/aula_materia.models';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { AsignacionService } from 'src/app/services/asignacion.service';

@Component({
  selector: 'app-actualizar-inscripcion',
  templateUrl: './actualizar-aulaMateria.component.html',
  styleUrls: []
})
export class ActualizarAulaMateriaComponent implements OnInit {

  token: string;
  inscripcion: Inscripcion;
  alumnos: Usuario[] = [];
  aulas_materias: Aula_materia[] = [];

  constructor(
    public tipoUsuarioService: TipoUsuarioService,
    public inscripcionService: InscripcionService,
    public asignacionServices: AsignacionService,
    public router: Router
  ) {
    this.cargarStorage();
  }

  ngOnInit(): void {
    this.tipoUsuarioService.getAlumno().subscribe((resp: any) => {
      this.alumnos = resp.usuario;
      console.log(this.alumnos);
    });

    this.asignacionServices.getTodo().subscribe((resp: any) => {
      this.aulas_materias = resp.aulas_materias;
      console.log(this.aulas_materias);
    });
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.inscripcion = JSON.parse(
        localStorage.getItem('inscripcionActualizar')
      );
    } else {
      this.token = '';
      this.inscripcion = null;
    }
  }

  guardarStorage(id: string, token: string, inscripcion: Inscripcion) {
    localStorage.setItem(
      'id_inscripcion',
      this.inscripcionService.inscripcion.id_inscripcion
    );
    localStorage.setItem('token', this.token);
    localStorage.setItem('inscripcionActualizar', JSON.stringify(inscripcion));

    this.inscripcion = inscripcion;
    this.token = token;
  }

  resetStorage() {
    localStorage.setItem('token', this.inscripcionService.token);
    localStorage.setItem(
      'inscripcion',
      JSON.stringify(this.inscripcionService.inscripcion)
    );
    this.inscripcion = this.inscripcionService.inscripcion;
    this.token = this.token;
  }

  guardar(inscripcion: Inscripcion) {
    this.inscripcion.id_alumno = inscripcion.id_alumno;
    this.inscripcion.id_aula_materia = inscripcion.id_aula_materia;
    this.inscripcionService.token = this.token;
    this.inscripcionService
      .actualizarInscripcion(this.inscripcion)
      .subscribe((resp: any) => {
        this.router.navigate(['/inscripciones']);
        this.resetStorage();
      });
  }
}

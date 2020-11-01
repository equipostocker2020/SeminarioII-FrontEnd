import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { Aula } from '../../models/aula.models';
import { AulaService } from '../../services/aula.service';
import { Materia } from '../../models/materia.models';
import { MateriaService } from '../../services/materia.service';
import { Inscripcion } from '../../models/inscripcion.models';
import { InscripcionService } from '../../services/inscripcion.service';
import { Aula_materia } from '../../models/aula_materia.models';
import { AulaMateriaService } from '../../services/aulaMateria.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  usuario: Usuario;
  usuarios: Usuario[] = [];
  docentes: Usuario[] = [];
  docente: Usuario;
  alumno: Usuario;
  alumnos: Usuario[] = [];
  aula: Aula;
  aulas: Aula[] = [];
  materia: Materia;
  materias: Materia[] = [];
  inscripcion: Inscripcion;
  inscripciones: Inscripcion[] = [];
  asignacion: Aula_materia;
  asignaciones: Aula_materia[] = [];
  //user role alumno
  inscripcionAlumno: Inscripcion;
  inscripcionesAlumno: Inscripcion[] = [];
  // user rol docente
  asignacionDocente: Aula_materia;
  asignacionesDocente: Aula_materia[] = [];
  aulaMateria: Aula_materia;
  aula_materia: Aula_materia;

  constructor(
    public usuarioService: UsuarioService,
    public tipoUsuarioService: TipoUsuarioService,
    public aulaService: AulaService,
    public materiaService: MateriaService,
    public inscripcionService: InscripcionService,
    public aulaMateriaService: AulaMateriaService
  ) {
    this.usuario = usuarioService.usuario;
    this.tipoUsuarioService.getDocente().subscribe((resp: any) => {
      this.docentes = resp.usuario;
    });
    this.tipoUsuarioService.getAlumno().subscribe((resp: any) => {
      this.alumnos = resp.usuario;
    });
    this.aulaService.getAula().subscribe((resp: any) => {
      this.aulas = resp.aula;
    });
    this.materiaService.getMateria().subscribe((resp: any) => {
      this.materias = resp.materia;
    });
    this.inscripcionService.getInscripcion().subscribe((resp: any) => {
      this.inscripciones = resp.inscripciones;
    });
    this.aulaMateriaService.getAulaMateria().subscribe((resp: any) => {
      this.asignaciones = resp.aulas_materias;
      console.log(this.asignaciones);
    });
    this.verInscripcionesAlumno();
    this.verAsignacionesDocente();
  }

  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true,
  // };
  // public barChartLabels = [
  //   '2006',
  //   '2007',
  //   '2008',
  //   '2009',
  //   '2010',
  //   '2011',
  //   '2012',
  // ];
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  // ];

  ngOnInit(): void {}

  verInscripcionesAlumno() {
    if (this.usuario.rol === 'ESTUDIANTE') {
      this.tipoUsuarioService
        .getInscripcionesAlumno(this.usuario.id_usuario)
        .subscribe((resp: any) => {
          this.inscripcionesAlumno = resp.inscripciones;
        });
    }
  }
  verAsignacionesDocente() {
    if (this.usuario.rol === 'DOCENTE') {
      this.tipoUsuarioService
        .getAsignacionesDocente(this.usuario.id_usuario)
        .subscribe((resp: any) => {
          this.asignacionesDocente = resp.aulas_materias;
        });
    }
  }

  guardarStorage(id_rel: string) {
    localStorage.setItem('id_rel', id_rel);
  }

  eliminarStorage() {
    localStorage.clear();
  }
}

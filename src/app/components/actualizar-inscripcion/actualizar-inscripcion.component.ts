import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inscripcion } from 'src/app/models/inscripcion.models';
import { Usuario } from 'src/app/models/usuario.models';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { Aula_materia } from 'src/app/models/aula_materia.models';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { AulaMateriaService } from '../../services/aulaMateria.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-actualizar-inscripcion',
  templateUrl: './actualizar-inscripcion.component.html',
  styleUrls: [],
})
export class ActualizarInscripcionComponent implements OnInit {
  token: string;
  inscripcion: Inscripcion;
  alumnos: Usuario[] = [];
  aulas_materias: Aula_materia[] = [];
  usuarios: Usuario[] = [];
  auxUsuarios: Usuario [] = [];
  aula_materia: Aula_materia;
  usuario: Usuario;
  auxAulasMaterias: Aula_materia [] = [];
  auxAulasMaterias2: Aula_materia [] = [];

  constructor(
    public tipoUsuarioService: TipoUsuarioService,
    public inscripcionService: InscripcionService,
    public aulaMateriaService: AulaMateriaService,
    public usuarioService: UsuarioService,
    public router: Router
  ) {
    this.usuario = this.usuarioService.usuario;
    this.cargarStorage();
    this.guardarStorage(
      this.tipoUsuarioService.usuario.id_usuario,
      this.tipoUsuarioService.token,
      this.inscripcion
    );
  }

  ngOnInit(): void {
    this.tipoUsuarioService.getAlumno().subscribe((resp: any) => {
      for (var i = 0; i < resp.usuario.length; i++) {
        if (resp.usuario[i].estado === 'ACTIVO') {
          this.auxUsuarios[i] = resp.usuario[i];
          this.usuarios.push(this.auxUsuarios[i]);
        }
      }
    });

    this.aulaMateriaService.getAulaMateria().subscribe((resp: any) => {
      this.auxAulasMaterias = resp.aulas_materias;
      for (var i = 0; i < this.auxAulasMaterias.length; i++) {
        if (this.auxAulasMaterias[i].estado === 'ACTIVO') {
          this.aulas_materias[i] = this.auxAulasMaterias[i];
          this.auxAulasMaterias2.push(this.aulas_materias[i]);
        }
      }
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
    localStorage.setItem('id_inscripcion', inscripcion.id_inscripcion);
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
    this.inscripcion.id_alumno = this.inscripcion.id_alumno;
    this.inscripcion.id_aula_materia = inscripcion.id_rel;
    this.inscripcion.estado = this.inscripcion.estado;
    this.inscripcionService.token = this.token;
    this.inscripcionService
      .actualizarInscripcion(this.inscripcion)
      .subscribe((resp: any) => {
        this.router.navigate(['/inscripciones']);
        this.resetStorage();
      });
  }

  eliminarStorage() {
    localStorage.clear();
  }
}

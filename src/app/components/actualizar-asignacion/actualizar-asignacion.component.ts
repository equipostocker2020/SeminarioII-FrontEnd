import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aula } from 'src/app/models/aula.models';
import { Aula_materia } from 'src/app/models/aula_materia.models';
import { Materia } from 'src/app/models/materia.models';
import { Usuario } from 'src/app/models/usuario.models';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { AulaService } from 'src/app/services/aula.service';
import { MateriaService } from 'src/app/services/materia.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';

@Component({
  selector: 'app-actualizar-asignacion',
  templateUrl: './actualizar-asignacion.component.html',
  styleUrls: []
})
export class ActualizarAsignacionComponent implements OnInit {

  token: string;
  aula_materia: Aula_materia;
  aulas: Aula [] = [];
  materias: Materia [] = [];
  docentes: Usuario [] = [];

  constructor(
    public aulaService: AulaService,
    public materiaService: MateriaService,
    public tipoUsuarioService: TipoUsuarioService,
    public asignacionService: AsignacionService,
    public router: Router
  ) {
    this.cargarStorage();
  }

  ngOnInit(): void {
    this.materiaService.getMateria().subscribe((resp: any) => {
      this.materias = resp.materia;
      console.log(this.materias);
    });

    this.aulaService.getAula().subscribe((resp: any) => {
      this.aulas = resp.aula;
      console.log( this.aulas);
    });

    this.tipoUsuarioService.getDocente().subscribe((resp: any) => {
      this.docentes = resp.usuario;
      console.log( this.docentes);
    });
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.aula_materia = JSON.parse(
        localStorage.getItem('aula_materiaActualizar')
      );
    } else {
      this.token = '';
      this.aula_materia = null;
    }
  }

  guardarStorage(id: string, token: string, aula_materia: Aula_materia) {
    localStorage.setItem(
      'aula_materia',
      this.asignacionService.aula_materia.id_rel
    );
    localStorage.setItem('token', this.token);
    localStorage.setItem('aula_materiaActualizar', JSON.stringify(aula_materia));

    this.aula_materia = aula_materia;
    this.token = token;
  }

  resetStorage() {
    localStorage.setItem('token', this.asignacionService.token);
    localStorage.setItem(
      'aula_materia',
      JSON.stringify(this.asignacionService.aula_materia)
    );
    this.aula_materia= this.asignacionService.aula_materia;
    this.token = this.token;
  }

  guardar(aula_materia: Aula_materia) {
    console.log(aula_materia.id_aula)
    console.log(aula_materia.id_materia)
    console.log(aula_materia.id_docente)
    console.log(aula_materia.anho)
    this.aula_materia.id_aula = aula_materia.id_aula;
    this.aula_materia.id_materia = aula_materia.id_materia;
    this.aula_materia.id_docente =aula_materia.id_docente;
    this.aula_materia.anho = aula_materia.anho;
    this.asignacionService.token = this.token;
    this.asignacionService
      .actualizarAulaMateria(this.aula_materia)
      .subscribe((resp: any) => {
        this.router.navigate(['/asignaciones']);
        this.resetStorage();
      });
  }

}

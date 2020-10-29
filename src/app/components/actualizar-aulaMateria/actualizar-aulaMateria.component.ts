import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aula } from 'src/app/models/aula.models';
import { Aula_materia } from 'src/app/models/aula_materia.models';
import { Materia } from 'src/app/models/materia.models';
import { Usuario } from 'src/app/models/usuario.models';
import { AulaMateriaService } from 'src/app/services/aulaMateria.service';
import { AulaService } from 'src/app/services/aula.service';
import { MateriaService } from 'src/app/services/materia.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-actualizar-aulaMateria',
  templateUrl: './actualizar-aulaMateria.component.html',
  styleUrls: [],
})
export class ActualizarAulaMateriaComponent implements OnInit {
  token: string;
  aula_materia: Aula_materia;
  aulas: Aula[] = [];
  materias: Materia[] = [];
  docentes: Usuario[] = [];
  json_aulas_materia: {
    id_aula: string;
    id_materia: string;
    anho: string;
    id_usuario: string;
    id_rel: string;
  };
  usuario: Usuario;

  constructor(
    public aulaService: AulaService,
    public materiaService: MateriaService,
    public tipoUsuarioService: TipoUsuarioService,
    public aulaMateriaService: AulaMateriaService,
    public router: Router,
    public usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
    this.cargarStorage();
  }

  ngOnInit(): void {
    this.materiaService.getMateria().subscribe((resp: any) => {
      this.materias = resp.materia;
    });

    this.aulaService.getAula().subscribe((resp: any) => {
      this.aulas = resp.aula;
    });

    this.tipoUsuarioService.getDocente().subscribe((resp: any) => {
      this.docentes = resp.usuario;
    });
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');

      this.json_aulas_materia = JSON.parse(
        localStorage.getItem('aulas_materiaActualizar')
      );
      this.aula_materia = JSON.parse(
        localStorage.getItem('aulas_materiaActualizar')
      );
      this.aula_materia.id_docente = this.json_aulas_materia.id_usuario;
    } else {
      this.token = '';
      this.aula_materia = null;
    }
  }

  guardarStorage(id: string, token: string, aula_materia: Aula_materia) {
    localStorage.setItem('id_rel', this.aulaService.aula.id_aula);
    localStorage.setItem('token', this.token);
    localStorage.setItem(
      'aula_materiaActualizar',
      JSON.stringify(aula_materia)
    );
    this.aula_materia = aula_materia;
    this.token = token;
  }

  resetStorage() {
    localStorage.setItem('token', this.aulaMateriaService.token);
    localStorage.setItem(
      'aula_materia',
      JSON.stringify(this.aulaMateriaService.aula_materia)
    );
    this.aula_materia = this.aulaMateriaService.aula_materia;
    this.token = this.token;
  }

  guardar(aula_materia: Aula_materia) {
    this.aula_materia.id_aula = aula_materia.id_aula;
    this.aula_materia.id_materia = aula_materia.id_materia;
    this.aula_materia.anho = aula_materia.anho;
    this.aula_materia.id_docente = aula_materia.id_docente;
    this.aulaMateriaService.token = this.token;
    this.aulaMateriaService
      .actualizarAulaMateria(this.aula_materia)
      .subscribe((resp: any) => {
        this.router.navigate(['/aulasMaterias']);
        this.resetStorage();
      });
  }

  eliminarStorage() {
    localStorage.clear();
  }
}

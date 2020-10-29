import { Component, OnInit } from '@angular/core';
import { AulaMateriaService } from 'src/app/services/aulaMateria.service';
import { Aula_materia } from '../../models/aula_materia.models';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './aulaMateria.component.html',
  styleUrls: [],
})
export class AulaMateriaComponent implements OnInit {
  aulas_materia: Aula_materia;
  get_aulas_materia: {
    anho: string;
    apellido: string;
    dia: string;
    horario: string;
    nombre: string;
    nombre_aula: string;
    nombre_materia: string;
    estado: string;
  };
  aulas_materias: Aula_materia[] = [];
  token: string;
  usuario: Usuario;

  constructor(
    public aulaMateriaService: AulaMateriaService,
    public usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.getAulaMateria();
  }

  guardarStorage(id: string, aulas_materia: Aula_materia) {
    localStorage.setItem('id_rel', id);
    localStorage.setItem(
      'aulas_materiaActualizar',
      JSON.stringify(aulas_materia)
    );
    this.aulas_materia = aulas_materia;
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('aulas_materia');
  }

  getAulaMateria() {
    this.aulaMateriaService.getAulaMateria().subscribe((resp: any) => {
      this.get_aulas_materia = resp.aulas_materias;
    });
  }

  cambiarEstado(aula_materia: Aula_materia) {
    aula_materia.id_docente = aula_materia.id_usuario;
    this.aulaMateriaService
      .actualizarAulaMateria(aula_materia)
      .subscribe((resp: any) => {});
  }

  eliminarStorageLogOut() {
    localStorage.clear();
  }
}

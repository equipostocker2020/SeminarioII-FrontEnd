import { Component, OnInit } from '@angular/core';
import { AulaMateriaService } from 'src/app/services/aulaMateria.service';
import { Aula_materia } from '../../models/aula_materia.models';

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
  };
  aulas_materias: Aula_materia[] = [];
  token: string;

  constructor(public aulaMateriaService: AulaMateriaService) {}

  ngOnInit(): void {
    this.getAulaMateria();
  }

  guardarStorage(id: string, aulas_materia: Aula_materia) {
    localStorage.setItem('id_rel', id);
    localStorage.setItem('aulas_materiaActualizar', JSON.stringify(aulas_materia));
    this.aulas_materia = aulas_materia;
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('aulas_materia');
  }

  getAulaMateria() {
    this.aulaMateriaService.getAulaMateria().subscribe((resp: any) => {
      console.log(resp);
      this.get_aulas_materia = resp.aulas_materias;
      console.log(this.get_aulas_materia);
    });
  }
}

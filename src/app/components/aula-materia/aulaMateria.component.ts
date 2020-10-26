import { Component, OnInit } from '@angular/core';
import { Aula_materia } from '../../models/aula_materia.models';
import { AulaMateriaService } from '../../services/aulaMateria.service';

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
    this.getAulasMaterias();
  }

  getAulasMaterias() {
    this.aulaMateriaService.getAulaMateria().subscribe((resp: any) => {
      console.log(resp);
      this.aulas_materias = resp.aulas_materias;
      console.log(this.get_aulas_materia);
    });
  }
}

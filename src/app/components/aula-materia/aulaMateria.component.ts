import { Component, OnInit } from '@angular/core';
import { AsignacionService } from '../../services/aulaMateria.service';
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

  constructor(public asignacionService: AsignacionService) {}

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo() {
    this.asignacionService.getAulaMateria().subscribe((resp: any) => {
      console.log(resp);
      this.get_aulas_materia = resp.aulas_materias;
      console.log(this.get_aulas_materia);
    });
  }
}

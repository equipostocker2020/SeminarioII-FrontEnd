import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'src/app/services/materia.service';
import { Materia } from '../../models/materia.models';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styles: [],
})
export class MateriasComponent implements OnInit {
  materias: Materia[] = [];
  materia: Materia;
  token: string;

  constructor(public materiaService: MateriaService) {}

  ngOnInit(): void {
    this.getMateria();
  }

  getMateria() {
    this.materiaService.getMateria().subscribe((resp: any) => {
      this.materias = resp.materia;
    });
  }

  updateMateria(materia: Materia) {
    this.materiaService.actualizarMateria(materia).subscribe((resp: any) => {
      this.eliminarStorage();
    });
  }

  guardarStorage(id: string, materia: Materia) {
    localStorage.setItem('id_materia', id);
    localStorage.setItem('materiaActualizar', JSON.stringify(materia));
    this.materia = materia;
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('materia');
  }
}

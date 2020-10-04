import { Component, OnInit } from '@angular/core';
import { Materia } from '../../models/materia.models';
import { Router } from '@angular/router';
import { MateriaService } from '../../services/materia.service';

@Component({
  selector: 'app-actualizar-materia',
  templateUrl: './actualizar-materia.component.html',
  styleUrls: []
})
export class ActualizarMateriaComponent implements OnInit {

  token: string;
  materia: Materia;

  constructor(
    public materiaService: MateriaService,
    public router: Router,
  ) {
    //this.materia = this.materiaService.materia;
    this.cargarStorage();
    console.log(this.materia);
    /*this.guardarStorage(
      this.materiaService.materia.id_materia,
      this.materiaService.token,
      this.materia
    ); */
  }

  ngOnInit(): void {}
  
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.materia = JSON.parse(localStorage.getItem('materiaActualizar'));
    } else {
      this.token = '';
      this.materia = null;
    }
  }

  guardarStorage(id: string, token: string, materia: Materia) {
    localStorage.setItem('id_materia', this.materiaService.materia.id_materia);
    localStorage.setItem('token', this.materiaService.token);
    localStorage.setItem('materiaActualizar', JSON.stringify(materia));

    this.materia = materia
    this.token = token;
  }

  resetStorage() {
    //localStorage.setItem('id', this.materiaService.materia.id_materia);
    localStorage.setItem('token', this.materiaService.token);
    localStorage.setItem('materia', JSON.stringify(this.materiaService.materia));
    this.materia = this.materiaService.materia;
    this.token = this.token;
  }

  guardar(materia: Materia) {
    this.materia.nombre_materia = materia.nombre_materia;
    this.materia.dia = materia.dia;
    this.materia.horario = materia.horario;
    this.materiaService.token = this.token;
    console.log(this.token)
    this.materiaService
      .actualizarMateria(this.materia)
      .subscribe((resp: any) => {
        this.router.navigate(['/materias']);
        this.resetStorage();
      });
  }

}

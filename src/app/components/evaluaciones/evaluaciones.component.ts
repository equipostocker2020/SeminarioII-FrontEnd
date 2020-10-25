import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { Evaluacion } from '../../models/evaluacion.models';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styles: [],
})
export class EvaluacionesComponent implements OnInit {
  evaluaciones: Evaluacion[] = [];
  evaluacion: Evaluacion;
  token: string;

  constructor(public evaluacionService: EvaluacionService) {
    this.evaluacionService.evaluacion;
  }

  ngOnInit(): void {
    this.getEvaluacion();
  }

  getEvaluacion() {
    this.evaluacionService.getEvaluacion().subscribe((resp: any) => {
      this.evaluaciones = resp.evaluaciones;
      console.log(resp);
    });
  }

  updateAula(evaluacion: Evaluacion) {
    this.evaluacionService
      .actualizarEvaluacion(evaluacion)
      .subscribe((resp: any) => {
        console.log(resp);
        this.eliminarStorage();
      });
  }

  guardarStorage(id: string, evaluacion: Evaluacion) {
    localStorage.setItem('id_evaluacion', id);
    localStorage.setItem('evaluacionActualizar', JSON.stringify(evaluacion));
    this.evaluacion = evaluacion;
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('evaluacion');
  }

  cambiarEstado(evaluacion: Evaluacion){
    this.evaluacionService.actualizarEvaluacion(evaluacion)
    .subscribe ((resp: any) => {
    });
  }
}

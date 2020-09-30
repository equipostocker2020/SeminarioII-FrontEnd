import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { Evaluacion } from '../../models/evaluacion.models';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styles: [
  ]
})
export class EvaluacionesComponent implements OnInit {

  evaluaciones: Evaluacion [] = [];
  evaluacion: Evaluacion;

  constructor(
    public _evaluacionService: EvaluacionService
  ) { }

  ngOnInit(): void {
    this.getEvaluacion();
  }

  getEvaluacion(){
    this._evaluacionService.getEvaluacion()
    .subscribe((resp:any)=>{
      this.evaluaciones = resp.evaluaciones;
    });
  }
}
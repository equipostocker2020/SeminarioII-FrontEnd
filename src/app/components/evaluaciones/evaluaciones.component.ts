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
  token: string;

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

  updateAula(evaluacion: Evaluacion){
    this._evaluacionService.actualizarEvaluacion(evaluacion)
    .subscribe((resp: any) => {
     console.log(resp);
     this.eliminarStorage();
    });
  }

  guardarStorage(id: string, token: string, evaluacion: Evaluacion) {
    localStorage.setItem('id_evaluacion', id);
    localStorage.setItem('token', token);
    localStorage.setItem('evaluacionActualizar', JSON.stringify(evaluacion));
    this.evaluacion = evaluacion;
    this.token = token;
  }


  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('evaluacion');
  }
}
import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { Evaluacion } from '../../models/evaluacion.models';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styles: [],
})
export class EvaluacionesComponent implements OnInit {
  evaluaciones: Evaluacion[] = [];
  evaluacion: Evaluacion;
  token: string;
  usuario: Usuario;

  constructor(
    public evaluacionService: EvaluacionService,
    public usuarioService: UsuarioService
    ) {
    this.usuario = this.usuarioService.usuario;
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
    evaluacion.fecha = this.transformarFecha(evaluacion.fecha);
    this.evaluacionService.actualizarEvaluacion(evaluacion)
    .subscribe ((resp: any) => {
    });
  }

  transformarFecha(params: string){
    if (params.indexOf('T') !== -1){
      const fecha = params.split('T');
      const fechaTransformada = fecha[0];
      return fechaTransformada;
    } else {
      return;
    }
  }

  eliminarStorageLogOut() {
    localStorage.clear();
}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evaluacion } from 'src/app/models/evaluacion.models';
import { Instancia } from 'src/app/models/instancia.models';
import { Materia } from 'src/app/models/materia.models';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { MateriaService } from 'src/app/services/materia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-actualizar-evaluacion',
  templateUrl: './actualizar-evaluacion.component.html',
  styleUrls: [],
})
export class ActualizarEvaluacionComponent implements OnInit {
  token: string;
  evaluacion: Evaluacion;
  materias: Materia[] = [];
  instancias: Instancia[] = [];

  constructor(
    public evaluacionService: EvaluacionService,
    public materiaService: MateriaService,
    public usuarioService: UsuarioService,
    public router: Router
  ) {
    this.cargarStorage();
  }

  ngOnInit(): void {
    this.materiaService.getMateria().subscribe((resp: any) => {
      this.materias = resp.materia;
      console.log(this.materias);
    });

    this.evaluacionService.getInstanciaEvaluacion().subscribe((resp: any) => {
      this.instancias = resp.instancia_evaluacion;
      console.log(this.instancias);
    });
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.evaluacion = JSON.parse(
        localStorage.getItem('evaluacionActualizar')
      );
    } else {
      this.token = '';
      this.evaluacion = null;
    }
  }

  guardarStorage(id: string, token: string, evaluacion: Evaluacion) {
    localStorage.setItem(
      'id_evaluacion',
      this.evaluacionService.evaluacion.id_evaluacion
    );
    localStorage.setItem('token', this.token);
    localStorage.setItem('evaluacionActualizar', JSON.stringify(evaluacion));

    this.evaluacion = evaluacion;
    this.token = token;
  }

  resetStorage() {
    localStorage.setItem('token', this.evaluacionService.token);
    localStorage.setItem(
      'evaluacionActualizar',
      JSON.stringify(this.evaluacionService.evaluacion)
    );
    this.evaluacion = this.evaluacionService.evaluacion;
    this.token = this.token;
  }

  guardar(evaluacion: Evaluacion) {
    this.evaluacion.id_materia = evaluacion.id_materia;
    this.evaluacion.id_instancia = evaluacion.id_instancia;
    this.evaluacion.fecha = evaluacion.fecha;
    this.evaluacionService.token = this.token;
    this.evaluacionService
      .actualizarEvaluacion(this.evaluacion)
      .subscribe((resp: any) => {
        this.router.navigate(['/evaluaciones']);
        this.resetStorage();
      });
  }
}

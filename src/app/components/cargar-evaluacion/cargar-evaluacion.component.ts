import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evaluacion } from 'src/app/models/evaluacion.models';
import { MateriaService } from 'src/app/services/materia.service';
import { Materia } from 'src/app/models/materia.models';
import { Instancia } from 'src/app/models/instancia.models';
import { AulaMateriaService } from '../../services/aulaMateria.service';

@Component({
  selector: 'app-cargar-evaluacion',
  templateUrl: './cargar-evaluacion.component.html',
  styleUrls: [],
})
export class CargarEvaluacionComponent implements OnInit {
  forma: FormGroup;
  materias: Materia[] = [];
  instancias: Instancia[] = [];
  get_aulas_materia: {
    anho: string;
    apellido: string;
    dia: string;
    horario: string;
    nombre: string;
    nombre_aula: string;
    nombre_materia: string;
  };

  constructor(
    public evaluacionService: EvaluacionService,
    public materiaService: MateriaService,
    public aulaMateriaService: AulaMateriaService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.materiaService.getMateria().subscribe((resp: any) => {
      this.materias = resp.materia;
    });

    this.evaluacionService.getInstanciaEvaluacion().subscribe((resp:any)=>{

  this.get_aulas_materia = resp.instancia_evaluacion;
  console.log(this.get_aulas_materia);
});

    this.forma = new FormGroup({
      id_materia: new FormControl(null, Validators.required),
      id_instancia: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
    });
    this.forma.setValue({
      id_materia: '',
      id_instancia: '',
      fecha: '',
    });
  }

  registrarEvaluacion() {
    const evaluacion = new Evaluacion(
      this.forma.value.id_materia,
      this.forma.value.id_instancia,
      this.forma.value.fecha
    );
    this.evaluacionService.postEvaluacion(evaluacion).subscribe((resp) => {
      this.router.navigate(['/evaluaciones']);
    });
  }
}

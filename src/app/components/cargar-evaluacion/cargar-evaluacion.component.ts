import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evaluacion } from 'src/app/models/evaluacion.models';
import { MateriaService } from 'src/app/services/materia.service';
import { Materia } from 'src/app/models/materia.models';
import { Instancia } from 'src/app/models/instancia.models';

@Component({
  selector: 'app-cargar-evaluacion',
  templateUrl: './cargar-evaluacion.component.html',
  styleUrls: []
})
export class CargarEvaluacionComponent implements OnInit {

  forma: FormGroup;
  materias: Materia [] = [];
  instancias: Instancia [] = [];

  constructor(
    public evaluacionService: EvaluacionService,
    public materiaService: MateriaService,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.materiaService.getMateria()
    .subscribe((resp:any) => {
      this.materias =  resp.materia;
      console.log(this.materias)
    })

    this.evaluacionService.getInstanciaEvaluacion()
    .subscribe((resp:any)=> {
      this.instancias = resp.instancia_evaluacion;
      console.log(this.instancias);
    })

    this.forma = new FormGroup({
      id_materia: new FormControl(null, Validators.required),
      id_instancia: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required)
    });

    this.forma.setValue({
      id_materia: '',
      id_instancia: '',
      fecha: ''
    });

  }
  registrarEvaluacion(){
    console.log("id_materia",this.forma.value.id_materia)
    console.log("id_instancia",this.forma.value.id_instancia)
    const evaluacion = new Evaluacion (
      this.forma.value.id_materia,
      this.forma.value.id_instancia,
      this.forma.value.fecha
    );
    this.evaluacionService.postEvaluacion(evaluacion)
    .subscribe(resp => {
      this.router.navigate(['/evaluaciones']);
    });
  }
}

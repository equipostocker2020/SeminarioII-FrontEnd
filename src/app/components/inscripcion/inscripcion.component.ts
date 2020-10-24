import { Component, OnInit } from '@angular/core';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { Inscripcion } from '../../models/inscripcion.models';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: [],
})
export class InscripcionComponent implements OnInit {
  inscripciones: Inscripcion[] = [];
  inscripcion: Inscripcion;

  constructor(public inscripcionService: InscripcionService) {}

  get_inscripcion: {
    anho: string,
    apellido: string,
    dia: string,
    horario: string,
    id_inscripcion: string,
    nombre: string,
    nombre_aula: string,
    nombre_materia: string,
  }

  ngOnInit(): void {
    this.getInscripcion();
  }

  getInscripcion() {
    this.inscripcionService.getInscripcion().subscribe((resp: any) => {
      this.get_inscripcion = resp.inscripciones;
    });
  }
}

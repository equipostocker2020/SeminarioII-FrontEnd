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

  ngOnInit(): void {
    this.getInscripcion();
  }

  getInscripcion() {
    this.inscripcionService.getInscripcion().subscribe((resp: any) => {
      this.inscripciones = resp.inscripciones;
    });
  }
}

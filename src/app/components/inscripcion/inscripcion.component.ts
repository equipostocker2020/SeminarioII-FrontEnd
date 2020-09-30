import { Component, OnInit } from '@angular/core';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { Inscripcion } from '../../models/inscripcion.models';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: []
})
export class InscripcionComponent implements OnInit {

  inscripciones: Inscripcion [] = [];
  inscripcion: Inscripcion;

  constructor(
    public _inscripcionService: InscripcionService
  ) { }

  ngOnInit(): void {
    this.getInscripcion();
  }

  getInscripcion(){
    this._inscripcionService.getInscripcion()
    .subscribe((resp:any)=>{
      console.log(resp);
      this.inscripciones = resp.inscripciones;
    });
  }
}
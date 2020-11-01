import { Component, OnInit } from '@angular/core';
import { AulaMateriaService } from '../../services/aulaMateria.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { Aula_materia } from '../../models/aula_materia.models';
import { Usuario } from '../../models/usuario.models';
import { Inscripcion } from '../../models/inscripcion.models';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-ver-alumnos-por-asignacion',
  templateUrl: './ver-alumnos-por-asignacion.component.html',
  styles: [
  ]
})
export class VerAlumnosPorAsignacionComponent implements OnInit {

  aulasMaterias: Aula_materia [] = [];
  docente: Usuario;
  aulaMateria: Aula_materia;
  id_rel: string
  isnscripcion: Inscripcion;
  inscripciones: Inscripcion [] = [];
  notasPorAlumno: Aula_materia;
  notasPorAlumnos: Aula_materia [] = [];

  constructor(
    public aulaMateriaService: AulaMateriaService,
    public tipoUsuarioService: TipoUsuarioService
  ) {

     this.getItemLocalStorage();

  }

  ngOnInit(): void {
  }

 getItemLocalStorage(){
    if (localStorage.getItem('id_rel')) {
      this.id_rel = localStorage.getItem('id_rel');
      this.tipoUsuarioService.getnotasPorAlumno(this.id_rel).subscribe((resp: any) => {
        console.log(resp);
        if(resp.err){
        console.log("el error");
        }
        this.notasPorAlumnos   = resp.notas_x_alumno;
      });
    }

}
}

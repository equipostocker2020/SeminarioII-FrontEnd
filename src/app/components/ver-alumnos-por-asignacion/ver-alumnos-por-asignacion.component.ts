import { Component, OnInit } from '@angular/core';
import { AulaMateriaService } from '../../services/aulaMateria.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { Aula_materia } from '../../models/aula_materia.models';
import { Usuario } from '../../models/usuario.models';
import { Inscripcion } from '../../models/inscripcion.models';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

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
  inscripcion: Inscripcion;
  inscripciones: Inscripcion [] = [];
  notasPorAlumno: Aula_materia;
  notasPorAlumnos: Aula_materia [] = [];
  usuario: Usuario;

  constructor(
    public aulaMateriaService: AulaMateriaService,
    public tipoUsuarioService: TipoUsuarioService,
    public usuarioService: UsuarioService,
  ) {
     this.usuario = usuarioService.usuario;
     this.getItemLocalStorage();
     this.tipoUsuarioService.getnotasPorAlumnoPorId(this.id_rel).subscribe((resp: any) => {
      this.notasPorAlumnos = resp.notas_x_alumno;
      console.log(resp.notas_x_alumno);
     });
  }

  ngOnInit(): void {
  }

 getItemLocalStorage(){
    if (localStorage.getItem('id_rel')) {
      this.id_rel = localStorage.getItem('id_rel');
      this.tipoUsuarioService.getnotasPorAlumnoPorId(this.id_rel).subscribe((resp: any) => {
        console.log(resp);
        if (resp.err){
        console.log(resp.err);
        }
        this.notasPorAlumnos = resp.notas_x_alumno;
      });
    }
}

guardarStorageIdRel(id_inscripcion: string) {
  localStorage.setItem('id_inscripcion', id_inscripcion);
}

guardarStorateidAlumno(id_alumno: string){
  localStorage.setItem('id_alumno', id_alumno);
}

eliminarStorage() {
  localStorage.clear();
}

}

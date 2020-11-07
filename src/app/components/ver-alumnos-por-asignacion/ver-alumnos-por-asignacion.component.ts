import { Component, OnInit } from '@angular/core';
import { AulaMateriaService } from '../../services/aulaMateria.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { Aula_materia } from '../../models/aula_materia.models';
import { Usuario } from '../../models/usuario.models';
import { Inscripcion } from '../../models/inscripcion.models';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  token: string;
  notas_de_los_alumnos: Inscripcion[] = [];

  constructor(
    public aulaMateriaService: AulaMateriaService,
    public tipoUsuarioService: TipoUsuarioService,
    public usuarioService: UsuarioService,
    public router: Router
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

compruebaNotas(token: string, id: string) {
  this.tipoUsuarioService.getNotasPorAlumnoDesdeDocente(id)
    .subscribe((resp: any) => {
      this.notas_de_los_alumnos = resp.inscripciones;
      if (this.notas_de_los_alumnos.length == 0) {
        Swal.fire({
          title: 'El estudiante no tiene notas',
          icon: 'warning',
          confirmButtonColor: '#3085d6'
        });
      } else {
        this.router.navigate(['/docente/verNotasPorAlumno']);
        localStorage.setItem('token', token);
        localStorage.setItem('id_alumno', id);
        this.token = token;
      }
    });


}


eliminarStorage() {
  localStorage.clear();
}
}

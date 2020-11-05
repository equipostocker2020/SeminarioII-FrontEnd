import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotaAlumnoService } from '../../services/nota-alumno.service';
import { Nota_alumno } from '../../models/nota_alumno.models';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-actualizar-nota',
  templateUrl: './actualizar-nota.component.html',
  styles: [
  ]
})
export class ActualizarNotaComponent implements OnInit {
  token: string;
  notaAlumno: Nota_alumno;
  usuario: Usuario;
  constructor(
    public notaAlumnoService: NotaAlumnoService,
    public router: Router,
    public usuarioService: UsuarioService,
  ) {
    this.usuario = usuarioService.usuario;
    this.cargarStorage();
   }

  ngOnInit(): void {
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.notaAlumno = JSON.parse(localStorage.getItem('nota actualizar'));
    } else {
      this.token = '';
      this.notaAlumno = null;
    }
  }

  guardarStorage(id: string, token: string, notaAlumno: Nota_alumno) {
    localStorage.setItem('id_nota', this.notaAlumnoService.notaAlumno.id_nota);
    localStorage.setItem('token', this.notaAlumnoService.token);
    localStorage.setItem('nota_actualizar', JSON.stringify(notaAlumno));

    this.notaAlumno = notaAlumno;
    this.token = token;
  }

  guardar(notaAlumno: Nota_alumno) {
    this.notaAlumno.id_inscripcion = this.notaAlumno.id_inscripcion;
    this.notaAlumno.id_instancia = this.notaAlumno.id_instancia;
    this.notaAlumno.id_nota = this.notaAlumno.id_nota;
    this.notaAlumno.nota = notaAlumno.nota;
    this.notaAlumno.estado = this.notaAlumno.estado;
    this.notaAlumnoService.putNotaAlumno (this.notaAlumno).subscribe((resp: any)=>{
      console.log(resp);
    });
  }

  eliminarStorage() {
    localStorage.clear();
  }

}

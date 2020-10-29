import { Component, OnInit } from '@angular/core';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { Inscripcion } from '../../models/inscripcion.models';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: [],
})
export class InscripcionComponent implements OnInit {
  inscripciones: Inscripcion[] = [];
  inscripcion: Inscripcion;
  usuario: Usuario;

  constructor(
    public inscripcionService: InscripcionService,
    public usuarioService : UsuarioService)
    {
      this.usuario = this.usuarioService.usuario;
    }

  get_inscripcion: {
    id_alumno: string,
    anho: string,
    apellido: string,
    dia: string,
    horario: string,
    id_inscripcion: string,
    nombre: string,
    nombre_aula: string,
    nombre_materia: string,
    estado: string,
  }

  ngOnInit(): void {
    this.getInscripcion();
  }

  getInscripcion() {
    this.inscripcionService.getInscripcion().subscribe((resp: any) => {
      this.get_inscripcion = resp.inscripciones;
      console.log(resp.inscripciones)
    });
  }

  guardarStorage(id: string, inscripcion: Inscripcion) {
    localStorage.setItem('id_inscripcion', id);
    localStorage.setItem('inscripcionActualizar', JSON.stringify(inscripcion));
    this.inscripcion = inscripcion;
  }

  cambiarEstado(inscripcion: Inscripcion){
    inscripcion.id_aula_materia = inscripcion.id_rel;
    this.inscripcionService.actualizarInscripcion(inscripcion)
    .subscribe ((resp: any) => {
    });
  }

  eliminarStorage() {
    localStorage.clear();
}
}

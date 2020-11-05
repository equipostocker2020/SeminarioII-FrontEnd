import { Component, OnInit } from '@angular/core';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { Inscripcion } from '../../models/inscripcion.models';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-ver-notas-mis-alumnos',
  templateUrl: './ver-notas-mis-alumnos.component.html',
  styles: []
})
export class VerNotasMisAlumnosComponent implements OnInit {

  id_alumno: string;
  inscripcion: Inscripcion;
  inscripciones: Inscripcion [] = [];
  usuarios: Usuario [] = [];
  usuario: Usuario;

  constructor(
    public tipoUsuarioService: TipoUsuarioService,
  ) {}

  ngOnInit(): void {
    this.tipoUsuarioService.getNotasPorAlumnoDesdeDocente(this.getItemLocalStorage()).subscribe((resp: any) => {
      this.inscripciones = resp.inscripciones;
    });
    this.tipoUsuarioService.getAlumnoPorId(this.getItemLocalStorage()).subscribe((resp: any) =>{
      this.usuarios = resp.usuario;
      for (let i of this.usuarios){
        if (this.usuarios.length === 1){
          this.usuario = this.usuarios[0];
        }
        return this.usuario;
      }
    });
  }

  getItemLocalStorage(){
  this.id_alumno = localStorage.getItem('id_alumno');
  return this.id_alumno;
  }

}

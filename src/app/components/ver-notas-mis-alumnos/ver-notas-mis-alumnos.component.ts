import { Component, OnInit } from '@angular/core';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { Inscripcion } from '../../models/inscripcion.models';
import { Usuario } from '../../models/usuario.models';
import { NotaAlumnoService } from 'src/app/services/nota-alumno.service';
import { Nota_alumno } from 'src/app/models/nota_alumno.models';

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
  nota: Nota_alumno;

  constructor(
    public tipoUsuarioService: TipoUsuarioService,
    public notaAlumnoService: NotaAlumnoService,
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

  actualizarNota(nota: Nota_alumno){
    nota.id_inscripcion = this.nota.id_inscripcion;
    nota.id_instancia = this.nota.id_instancia;
    nota.nota = this.nota.nota;
    nota.estado = this.nota.estado;
    this.notaAlumnoService.putNotaAlumno(nota, nota.id_nota).subscribe((resp: any) => {
      console.log(resp);
    })

    
  }

}

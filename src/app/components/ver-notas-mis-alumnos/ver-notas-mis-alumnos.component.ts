import { Component, OnInit } from '@angular/core';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { Inscripcion } from '../../models/inscripcion.models';
import { Usuario } from '../../models/usuario.models';
import { NotaAlumnoService } from 'src/app/services/nota-alumno.service';
import { Nota_alumno } from 'src/app/models/nota_alumno.models';
import { InscripcionService } from '../../services/inscripcion.service';
import { UsuarioService } from '../../services/usuario.service';

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
  id_instancia: string;
  inscripcionUpdate: Inscripcion;
  sarasa: Nota_alumno;
  usuarioUpdate: Usuario;
  constructor(
    public tipoUsuarioService: TipoUsuarioService,
    public notaAlumnoService: NotaAlumnoService,
    public inscripcionService: InscripcionService,
    public usuarioService: UsuarioService,
  ) {
    this.usuarioUpdate = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.tipoUsuarioService.getNotasPorAlumnoDesdeDocente(this.getItemLocalStorage()).subscribe((resp: any) => {
      this.inscripciones = resp.inscripciones;
      console.log(this.inscripciones);
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

  getInscripcionLocalStorage(){
    this.id_instancia = localStorage.getItem('id_inscripcion');
    return this.id_instancia;
  }

  setItemsLocalStorage(id_instancia: string, id_inscripcion: string, id_nota: string, nota: Nota_alumno ){
    localStorage.setItem('id_instancia' ,id_instancia);
    localStorage.setItem('id_inscripcion' ,id_inscripcion);
    localStorage.setItem('id_nota', id_nota);
    localStorage.setItem('nota actualizar', JSON.stringify(nota));
  }

  guardarStorage(id_instancia: string, nota_alumno: Nota_alumno) {
    localStorage.setItem(
      'id_inscripcion',
      this.inscripcionService.inscripcion.id_inscripcion
    );
    localStorage.setItem('notaActualizar', JSON.stringify(nota_alumno));
    this.sarasa = nota_alumno;
  }

  eliminarStorage() {
    localStorage.clear();
  }

}

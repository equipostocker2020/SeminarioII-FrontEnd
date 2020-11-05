import { Component, OnInit } from '@angular/core';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { Inscripcion } from '../../models/inscripcion.models';
import { Usuario } from '../../models/usuario.models';
import { NotaAlumnoService } from 'src/app/services/nota-alumno.service';
import { Nota_alumno } from 'src/app/models/nota_alumno.models';
import { InscripcionService } from '../../services/inscripcion.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-ver-notas-por-alumno',
  templateUrl: './ver-notas-por-alumno.component.html',
  styleUrls: []
})
export class VerNotasPorAlumnoComponent implements OnInit {

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
  }

  getItemLocalStorage(){
    this.id_alumno = localStorage.getItem('id_alumnoNotas');
    return this.id_alumno;
    }


}

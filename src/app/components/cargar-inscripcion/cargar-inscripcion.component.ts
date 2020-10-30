import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Inscripcion } from '../../models/inscripcion.models';
import { Usuario } from '../../models/usuario.models';
import { InscripcionService } from '../../services/inscripcion.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { UsuarioService } from '../../services/usuario.service';
import { AulaMateriaService } from '../../services/aulaMateria.service';
import { Aula_materia } from '../../models/aula_materia.models';

@Component({
  selector: 'app-cargar-inscripcion',
  templateUrl: './cargar-inscripcion.component.html',
  styleUrls: [],
})
export class CargarInscripcionComponent implements OnInit {
  forma: FormGroup;
  inscripcion: Inscripcion;
  inscripciones: Inscripcion[] = [];
  usuario: Usuario;
  usuarios: Usuario[] = [];
  aulasMaterias: Aula_materia[] = [];
  aulaMateria: {
    anho: string;
    apellido: string;
    dia: string;
    horario: string;
    id_rel: string;
    nombre: string;
    nombre_aula: string;
    nombre_materia: string;
  };
  usuarioLogOut: Usuario;
  auxUsuarios: Usuario [] = [];

  constructor(
    public inscripcionService: InscripcionService,
    public tipoUsuarioService: TipoUsuarioService,
    public router: Router,
    public usuarioService: UsuarioService,
    public aulaMateriaService: AulaMateriaService
  ) {
    this.usuarioLogOut = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.inscripcionService.getInscripcion().subscribe((resp: any) => {
      console.log(resp);
      this.inscripciones = resp.inscripciones;
      });
    this.tipoUsuarioService.getAlumno().subscribe((resp: any) => {
      this.auxUsuarios = resp.usuario;
      for (var i = 0; i < this.auxUsuarios.length; i++) {
        if (this.auxUsuarios[i].estado === 'ACTIVO') {
          this.usuarios[i] = this.auxUsuarios[i];
        }
      }
    });

    this.aulaMateriaService.getAulaMateria().subscribe((resp: any) => {
      console.log(resp);
      this.aulasMaterias = resp.aulas_materias;
    });
    this.forma = new FormGroup({
      id_inscripcion: new FormControl(null, Validators.required),
      id_alumno: new FormControl(null, Validators.required),
      id_aula_materia: new FormControl(null, Validators.required),
    });
    this.forma.setValue({
      id_inscripcion: '',
      id_alumno: '',
      id_aula_materia: '',
    });
  }
  
  registrarInscripcion() {
    const inscripcion = new Inscripcion(
      this.forma.value.id_inscripcion,
      this.forma.value.id_alumno,
      this.forma.value.id_aula_materia
    );
    this.inscripcionService
      .postInscripcion(inscripcion)
      .subscribe((resp: any) => {
        this.router.navigate(['/inscripciones']);
      });
  }

  eliminarStorage() {
    localStorage.clear();
  }
}

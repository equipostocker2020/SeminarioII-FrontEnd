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
  auxAulasMaterias: Aula_materia [] = [];

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
    this.tipoUsuarioService.getAlumno().subscribe((resp: any) => {
      for (var i = 0; i < resp.usuario.length; i++) {
        if (resp.usuario[i].estado === 'ACTIVO') {
          this.auxUsuarios[i] = resp.usuario[i];
          this.usuarios.push(this.auxUsuarios[i]);
        }
      }
    });

    this.aulaMateriaService.getAulaMateria().subscribe((resp: any) => {
      for (var i = 0; i < resp.aulas_materias.length; i++) {
        if (resp.aulas_materias[i].estado === 'ACTIVO') {
          this.auxAulasMaterias[i] = resp.aulas_materias[i];
          this.aulasMaterias.push(this.auxAulasMaterias[i]);
        }
      }
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

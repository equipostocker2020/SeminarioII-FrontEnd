import { Component, OnInit } from '@angular/core';
import { AulaService } from '../../services/aula.service';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Aula_materia } from '../../models/aula_materia.models';
import { Materia } from '../../models/materia.models';
import { Usuario } from '../../models/usuario.models';
import { Aula } from '../../models/aula.models';
import { MateriaService } from '../../services/materia.service';
import { AulaMateriaService } from 'src/app/services/aulaMateria.service';

@Component({
  selector: 'app-cargar-aula-materia-por-docente',
  templateUrl: './cargar-aula-materia-por-docente.component.html',
  styles: [],
})
export class CargarAulaMateriaPorDocenteComponent implements OnInit {
  forma: FormGroup;
  materias: Materia[] = [];
  auxMateria: Materia [] = [];
  docentes: Usuario[] = [];
  auxDocente: Usuario [] = [];
  aulas: Aula[] = [];
  auxAulas: Aula[] = [];
  usuario: Usuario;
  usuarios: Usuario[] = [];

  constructor(
    public aulaService: AulaService,
    public tipoUsuarioService: TipoUsuarioService,
    public aulaMateriaService: AulaMateriaService,
    public router: Router,
    public usuarioService: UsuarioService,
    public materiasService: MateriaService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.aulaService.getAula().subscribe((resp: any) => {
      for (var i = 0; i < resp.aula.length; i++) {
        if (resp.aula[i].estado === 'ACTIVO') {
          this.auxAulas[i] = resp.aula[i];
          this.aulas.push(this.auxAulas[i]);
        }
      }
    });
    this.tipoUsuarioService.getDocente().subscribe((resp: any) => {
      this.usuarios = resp.usuario;
    });
    this.materiasService.getMateria().subscribe((resp: any) => {
      for (var i = 0; i < resp.materia.length; i++) {
        if (resp.materia[i].estado === 'ACTIVO') {
          this.auxMateria[i] = resp.materia[i];
          this.materias.push(this.auxMateria[i]);
        }
      }
    });
    this.forma = new FormGroup({
      id_aula: new FormControl(null, Validators.required),
      id_materia: new FormControl(null, Validators.required),
      anho: new FormControl(null, Validators.required),
      id_docente: new FormControl(null, Validators.required),
    });
    this.forma.setValue({
      id_aula: '',
      id_materia: '',
      anho: '',
      id_docente: this.usuario.id_usuario,
    });
  }

  registrarAsignacion() {
    const aulaMateria = new Aula_materia(
      this.forma.value.id_aula,
      this.forma.value.id_materia,
      this.forma.value.anho,
      this.forma.value.id_docente
    );
    this.aulaMateriaService.postAulaMateria(aulaMateria).subscribe((resp) => {
      this.router.navigate(['/dashboard']);
    });
  }
  eliminarStorage() {
    localStorage.clear();
  }
}

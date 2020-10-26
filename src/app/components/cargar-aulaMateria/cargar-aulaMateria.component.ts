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
  selector: 'app-cargar-asignacion',
  templateUrl: './cargar-aulaMateria.component.html',
  styleUrls: [],
})
export class CargarAulaMateriaComponent implements OnInit {
  forma: FormGroup;
  materias: Materia[] = [];
  materia: Materia;
  docentes: Usuario[] = [];
  docente: Usuario;
  aulas: Aula[] = [];
  aula: Aula;
  usuario: Usuario;
  usuarios: Usuario[] = [];

  constructor(
    public aulaService: AulaService,
    public tipoUsuarioService: TipoUsuarioService,
    public aulaMateriaService: AulaMateriaService,
    public router: Router,
    public usuarioService: UsuarioService,
    public materiasService: MateriaService
  ) {}

  ngOnInit(): void {
    this.aulaService.getAula().subscribe((resp: any) => {
      console.log(resp);
      this.aulas = resp.aula;
    });
    this.tipoUsuarioService.getDocente().subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp.usuario;
    });
    this.materiasService.getMateria().subscribe((resp: any) => {
      console.log(resp);
      this.materias = resp.materia;
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
      id_docente: '',
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
      this.router.navigate(['/aulasMaterias']);
    });
  }
}

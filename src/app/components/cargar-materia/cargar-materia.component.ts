import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MateriaService } from '../../services/materia.service';
import { Materia } from '../../models/materia.models';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cargar-materia',
  templateUrl: './cargar-materia.component.html',
  styleUrls: [],
})
export class CargarMateriaComponent implements OnInit {
  forma: FormGroup;
  usuario: Usuario;

  constructor(
    public materiaService: MateriaService,
    public router: Router,
    public usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.forma = new FormGroup({
      nombre_materia: new FormControl(null, Validators.required),
      dia: new FormControl(null, Validators.required),
      horario: new FormControl(null, Validators.required),
    });

    this.forma.setValue({
      nombre_materia: '',
      dia: '',
      horario: '',
    });
  }

  registrarMateria() {
    const materia = new Materia(
      this.forma.value.nombre_materia,
      this.forma.value.dia,
      this.forma.value.horario
    );
    this.materiaService.postMateria(materia).subscribe((resp) => {
      this.router.navigate(['/materias']);
    });
  }

  eliminarStorage() {
    localStorage.clear();
  }
}

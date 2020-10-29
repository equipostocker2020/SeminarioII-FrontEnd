import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Aula } from 'src/app/models/aula.models';
import { AulaService } from '../../services/aula.service';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cargar-aula',
  templateUrl: './cargar-aula.component.html',
  styleUrls: [],
})
export class CargarAulaComponent implements OnInit {
  forma: FormGroup;
  usuario: Usuario;

  constructor(
    public aulaService: AulaService,
    public router: Router,
    public usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.forma = new FormGroup({
      nombre_aula: new FormControl(null, Validators.required),
    });

    this.forma.setValue({
      nombre_aula: '',
    });
  }

  registrarAula() {
    const aula = new Aula(this.forma.value.nombre_aula);
    this.aulaService.postAula(aula).subscribe((resp) => {
      this.router.navigate(['/aulas']);
    });
  }

  eliminarStorage() {
    localStorage.clear();
  }
}

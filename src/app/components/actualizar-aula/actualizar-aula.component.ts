import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aula } from '../../models/aula.models';
import { UsuarioService } from '../../services/usuario.service';
import { AulaService } from 'src/app/services/aula.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-actualizar-aula',
  templateUrl: './actualizar-aula.component.html',
  styleUrls: [],
})
export class ActualizarAulaComponent implements OnInit {
  token: string;
  aula: Aula;
  usuario: Usuario;
  constructor(
    public aulaService: AulaService,
    public router: Router,
    public usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
    this.cargarStorage()
  }

  ngOnInit(): void {}

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.aula = JSON.parse(localStorage.getItem('aulaActualizar'));
    } else {
      this.token = '';
      this.aula = null;
    }
  }

  guardarStorage(id: string, token: string, aula: Aula) {
    localStorage.setItem('id_aula', this.aulaService.aula.id_aula);
    localStorage.setItem('token', this.token);
    localStorage.setItem('aulaActualizar', JSON.stringify(aula));

    this.aula = aula;
    this.token = token;
  }

  resetStorage() {
    localStorage.setItem('token', this.aulaService.token);
    localStorage.setItem('aula', JSON.stringify(this.aulaService.aula));
    this.aula = this.aulaService.aula;
    this.token = this.token;
  }

  guardar(aula: Aula) {
    this.aula.nombre_aula = aula.nombre_aula;
    this.aulaService.token = this.token;
    this.aulaService.actualizarAula(this.aula).subscribe((resp: any) => {
      this.router.navigate(['/aulas']);
      this.resetStorage();
    });
  }

  eliminarStorage() {
    localStorage.clear();
  }
}

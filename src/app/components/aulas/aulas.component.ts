import { Component, OnInit } from '@angular/core';
import { AulaService } from '../../services/aula.service';
import { Aula } from '../../models/aula.models';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styles: [],
})
export class AulasComponent implements OnInit {
  aulas: Aula[] = [];
  aula: Aula;
  token: string;
  usuario: Usuario;

  constructor(
    public aulaService: AulaService,
    public usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
    this.aulaService.aula;
  }

  ngOnInit(): void {
    this.getAula();
  }

  getAula() {
    this.aulaService.getAula().subscribe((resp: any) => {
      console.log(resp.aula);
      this.aulas = resp.aula;
    });
  }

  updateAula(aula: Aula) {
    this.aulaService.actualizarAula(aula).subscribe((resp: any) => {
      console.log(resp);
      this.eliminarStorage();
    });
  }

  guardarStorage(id: string, aula: Aula) {
    localStorage.setItem('idActualizar', id);
    localStorage.setItem('aulaActualizar', JSON.stringify(aula));
    this.aula = aula;
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('aula');
  }

  cambiarEstado(aula: Aula){
    this.aulaService.actualizarAula(aula)
    .subscribe ((resp: any) => {
    });
  }

  eliminarStorageLogOut() {
    localStorage.clear();
}
}

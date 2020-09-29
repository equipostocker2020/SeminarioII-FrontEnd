import { Component, OnInit } from '@angular/core';
import {TipoUsuarioService} from '../../services/tipo-usuario.service'
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styles: [
  ]
})
export class DocentesComponent implements OnInit {

  usuarios: Usuario [] = [];
  usuario: Usuario;

  constructor(
    public tipoUsuario: TipoUsuarioService
  ) { }

  ngOnInit(): void {
    this.getAlumno();
  }

  getAlumno(){
    this.tipoUsuario.getDocente()
    .subscribe((resp:any)=>{
      console.log(resp.usuario);
      this.usuarios = resp.usuario;
    });
  }
}

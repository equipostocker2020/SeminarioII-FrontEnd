import { Component, OnInit } from '@angular/core';
import {TipoUsuarioService} from '../../services/tipo-usuario.service'
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styles: [
  ]
})
export class AlumnosComponent implements OnInit {

  usuarios: Usuario [] = [];
  usuario: Usuario;

  constructor(
    public tipoUsuario: TipoUsuarioService
  ) { }

  ngOnInit(): void {
    this.getAlumno();
  }

  getAlumno(){
    this.tipoUsuario.getAlumno()
    .subscribe((resp:any)=>{
      console.log(resp);
      this.usuarios = resp.usuario;
    });
  }

}

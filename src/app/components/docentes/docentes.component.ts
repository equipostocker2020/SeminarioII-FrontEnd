import { Component, OnInit } from '@angular/core';
import {TipoUsuarioService} from '../../services/tipo-usuario.service'
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styles: [
  ]
})
export class DocentesComponent implements OnInit {

  usuarios: Usuario [] = [];
  usuario: Usuario;
  token: string;

  constructor(
    public tipoUsuario: TipoUsuarioService,
    public usuarioService: UsuarioService
  ) { 
    this.usuarioService.usuario;
  }
  ngOnInit(): void {
    this.getDocente();
  }

  getDocente(){
    this.tipoUsuario.getDocente()
    .subscribe((resp:any)=>{
      console.log(resp.usuario);
      this.usuarios = resp.usuario;
    });
  }

  updateUsuario(usuario: Usuario){
    this.usuarioService.actualizarUsuario(usuario)
    .subscribe((resp: any) => {
     console.log(resp);
     this.eliminarStorage();
    });
  }
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('idActualizar', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuarioActualizar', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}

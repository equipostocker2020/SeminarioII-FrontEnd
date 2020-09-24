import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  email: string;
  recuerdame = false;

  constructor(
    public router: Router,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, null, null, null, forma.value.email, forma.value.contraseña, null, null, null);
    this.usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe((resp: any) => {
        this.router.navigate(['/dashboard']);
      }, (err) => {
        console.log(err);
      });
  }

}

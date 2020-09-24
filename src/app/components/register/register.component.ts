import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public router: Router,
    public usuarioService: UsuarioService
  ) { }

  sonInguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dni: new FormControl(null, Validators.required),
      cuit: new FormControl(null, Validators.required),
      rol: new FormControl(null, Validators.required),
      fecha_nac: new FormControl(null, Validators.required),
      edad: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    }, { validators: this.sonInguales('password', 'password2') });

    this.forma.setValue({
      nombre: '',
      apellido: '',
      direccion: '',
      email: '',
      dni: '',
      cuit: '',
      rol: '',
      fecha_nac: '',
      edad: '',
      password: '',
      password2: '',
      condiciones: true
    });
  }
  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      Swal.fire('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }
    console.log(this.forma.value);
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.direccion,
      this.forma.value.email,
      this.forma.value.dni,
      this.forma.value.password,
      this.forma.value.cuit,
      this.forma.value.rol,
      this.forma.value.fecha_nac,
      this.forma.value.edad,
    );

    this.usuarioService.crearUsuario(usuario)
      .subscribe(resp => {
        this.router.navigate(['/login']);
        // this.usuarioService.mandaEmail();
      });
  }

}

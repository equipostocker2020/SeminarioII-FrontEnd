import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargar-docente',
  templateUrl: './cargar-docente.component.html',
  styleUrls: []
})
export class CargarDocenteComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
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

  ngOnInit(): void {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dni: new FormControl(null, Validators.required),
      cuit_cuil: new FormControl(null, Validators.required),
      rol: new FormControl(null, Validators.required),
      fecha_nac: new FormControl(null, Validators.required),
      edad: new FormControl(null, Validators.required),
      contraseña: new FormControl(null, Validators.required),
      contraseña2: new FormControl(null, Validators.required),
      // condiciones: new FormControl(false),
    }, { validators: this.sonInguales('contraseña', 'contraseña2') });

    this.forma.setValue({
      nombre: '',
      apellido: '',
      direccion: '',
      email: '',
      dni: '',
      cuit_cuil: '',
      rol: 'Docente',
      edad: '',
      contraseña: '',
      contraseña2: '',
      fecha_nac: '',
      // condiciones: true
    });
  }

  registrarUsuario(){
    // if (this.forma.invalid){
    //   return;
    // }
    // if (!this.forma.value.condicione) {
    //   Swal.fire('Importante', 'Debe aceptar las condiciones', 'warning');
    //   return;
    // }
    console.log(this.forma.value);
    const usuario = new Usuario (
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.direccion,
      this.forma.value.email,
      this.forma.value.dni,
      this.forma.value.contraseña,
      this.forma.value.cuit_cuil,
      this.forma.value.rol,
      this.forma.value.fecha_nac,
      this.forma.value.edad
    );
    this.usuarioService.crearUsuario(usuario)
    .subscribe(resp => {
      this.router.navigate(['/docentes']);
    });
  }

  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}

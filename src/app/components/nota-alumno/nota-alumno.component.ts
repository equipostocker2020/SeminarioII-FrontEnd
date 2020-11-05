import { Component, OnInit } from '@angular/core';
import { NotaAlumnoService } from '../../services/nota-alumno.service';
import { Instancia } from '../../models/instancia.models';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Nota_alumno } from '../../models/nota_alumno.models';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-nota-alumno',
  templateUrl: './nota-alumno.component.html',
  styles: [
  ]
})
export class NotaAlumnoComponent implements OnInit {
  instanciaEvaluacion: Instancia;
  instanciaEvaluaciones: Instancia [] = [];
  forma: FormGroup;
  id_inscripcion: string;
  usuario: Usuario;

  constructor(
    public notaAlumnoService: NotaAlumnoService,
    public tipoUsuarioService: TipoUsuarioService,
    public router: Router,
    public usuarioService: UsuarioService,
  ) {
    this.usuario = usuarioService.usuario;
    notaAlumnoService.getInstancias().subscribe((resp: any) => {
      this.instanciaEvaluaciones = resp.instancia_evaluacion;
    });
   }

  ngOnInit(): void {
    this.forma = new FormGroup({
    id_nota: new FormControl(null, Validators.required),
    id_inscripcion: new FormControl(null, Validators.required),
    id_instancia: new FormControl(null, Validators.required),
    nota : new FormControl(null, Validators.required),
    estado : new FormControl(null, Validators.required),
    // observaciones: new FormControl(null, Validators.required),
    });
    this.forma.setValue({
    id_nota: '',
    id_inscripcion: this.getItemLocalStorage(),
    id_instancia: '',
    nota: '',
    estado: 'ACTIVO',
    // observaciones: ''
    });
  }

  registrarNota(){
    const notaAlumno = new Nota_alumno(
    this.forma.value.id_nota,
    this.forma.value.id_inscripcion,
    this.forma.value.id_instancia,
    this.forma.value.nota,
    this.forma.value.estado,
    // this.forma.value.observaciones
    );
    this.notaAlumnoService.postNotaAlumno(notaAlumno).subscribe((resp: any) =>{
      this.router.navigate(['/alumnos/asignacion']);
    });
  }

  getItemLocalStorage(){
    this.id_inscripcion = localStorage.getItem('id_inscripcion');
    return this.id_inscripcion;
  }

  eliminarStorage() {
    localStorage.clear();
  }

}

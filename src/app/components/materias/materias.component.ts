import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'src/app/services/materia.service';
import { Materia } from '../../models/materia.models';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styles: [
  ]
})
export class MateriasComponent implements OnInit {

  materias: Materia [] = [];
  materia: Materia;
  token: string;

  constructor(
    public _materiaService: MateriaService
  ) { }

  ngOnInit(): void {
    this.getMateria();
  }

  getMateria(){
    this._materiaService.getMateria()
    .subscribe((resp:any)=>{
      console.log(resp);
      this.materias = resp.materia;
    });
  }

  updateMateria(materia: Materia){
    this._materiaService.actualizarMateria(materia)
    .subscribe((resp: any) => {
     console.log(resp);
     this.eliminarStorage();
    });
  }

  guardarStorage(id: string,  materia: Materia) {
    localStorage.setItem('id_materia', id);
    //localStorage.setItem('token', token);
    localStorage.setItem('materiaActualizar', JSON.stringify(materia));
    this.materia = materia;
    //this.token = token;
  }


  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('materia');
  }

}

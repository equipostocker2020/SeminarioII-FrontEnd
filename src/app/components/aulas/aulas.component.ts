import { Component, OnInit } from '@angular/core';
import {AulaService} from '../../services/aula.service'
import { Aula } from '../../models/aula.models';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styles: [
  ]
})
export class AulasComponent implements OnInit {

  aulas: Aula [] = [];
  aula: Aula;
  token: string;

  constructor(
    public aulaService: AulaService
  ) { 
    this.aulaService.aula;
  }

  ngOnInit(): void {
    this.getAula();
  }

  getAula(){
    this.aulaService.getAula()
    .subscribe((resp:any)=>{
      console.log(resp.aula);
      this.aulas = resp.aula;
    });
  }

  updateAula(aula: Aula){
    this.aulaService.actualizarAula(aula)
    .subscribe((resp: any) => {
     console.log(resp);
     this.eliminarStorage();
    });
  }

  guardarStorage(id: string, token: string, aula: Aula) {
    localStorage.setItem('id_aula', id);
    localStorage.setItem('token', token);
    localStorage.setItem('aulaActualizar', JSON.stringify(aula));
    this.aula = aula;
    this.token = token;
  }


  eliminarStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('aula');
  }

  

}
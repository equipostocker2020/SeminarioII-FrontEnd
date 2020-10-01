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
    this.aulaService.Aula;
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
  guardarStorage(id: string, token: string, aula: Aula) {
    localStorage.setItem('idActualizar', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuarioActualizar', JSON.stringify(aula));
    this.aula = aula;
    this.token = token;
  }

}
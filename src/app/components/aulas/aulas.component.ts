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

  constructor(
    public _aulaService: AulaService
  ) { }

  ngOnInit(): void {
    this.getAula();
  }

  getAula(){
    this._aulaService.getAula()
    .subscribe((resp:any)=>{
      console.log(resp.aula);
      this.aulas = resp.aula;
    });
  }
}
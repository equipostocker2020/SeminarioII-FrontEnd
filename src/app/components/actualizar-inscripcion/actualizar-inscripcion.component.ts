import { Component, OnInit } from '@angular/core';
import { Aula } from '../../models/aula.models';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AulaService } from 'src/app/services/aula.service';

@Component({
  selector: 'app-actualizar-inscripcion',
  templateUrl: './actualizar-inscripcion.component.html',
  styleUrls: []
})
export class ActualizarInscripcionComponent implements OnInit {

  token: string;
  aula: Aula;
  
  constructor(){}

  ngOnInit(){}
    
}

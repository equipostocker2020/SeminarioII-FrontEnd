import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';
import { TipoUsuarioService } from '../../services/tipo-usuario.service';
import { Aula } from '../../models/aula.models';
import { AulaService } from '../../services/aula.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  usuario: Usuario;
  usuarios: Usuario [] = [];
  docentes: Usuario [] = [];
  docente: Usuario;
  alumno: Usuario;
  alumnos: Usuario [] = [];
  aula: Aula;
  aulas: Aula [] = [];

  constructor(
    public usuarioService: UsuarioService,
    public tipoUsuarioService: TipoUsuarioService,
    public aulaService: AulaService,
  ) {
    this.usuario = usuarioService.usuario;
    this.tipoUsuarioService.getDocente().subscribe((resp: any) => {
    this.docentes = resp.usuario;
    });
    this.tipoUsuarioService.getAlumno().subscribe((resp: any) => {
    this.alumnos = resp.usuario;
    });
    this.aulaService.getAula().subscribe((resp: any) =>{
    this.aulas = resp.aula;
    });
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
  ];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  ];

  ngOnInit(): void {}
}

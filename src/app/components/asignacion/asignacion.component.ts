import { Component, OnInit } from '@angular/core';
import { AsignacionService } from '../../services/asignacion.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: []
})
export class AsignacionComponent implements OnInit {

  constructor(
    public asignacionService: AsignacionService,
  ) { }

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo() {
    this.asignacionService.getTodo()
    .subscribe((resp: any) => {
      console.log(resp);
    });
  }

}

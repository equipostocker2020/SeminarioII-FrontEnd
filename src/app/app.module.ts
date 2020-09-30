import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AulasComponent } from './components/aulas/aulas.component';
import { MateriasComponent } from './components/materias/materias.component';
import { EvaluacionesComponent } from './components/evaluaciones/evaluaciones.component';
import { CargarAlumnoComponent } from './components/cargar-alumno/cargar-alumno.component';
import { CargarDocenteComponent } from './components/cargar-docente/cargar-docente.component';
import { CargarAulaComponent } from './components/cargar-aula/cargar-aula.component';
import { CargarEvaluacionComponent } from './components/cargar-evaluacion/cargar-evaluacion.component';
import { CargarMateriaComponent } from './components/cargar-materia/cargar-materia.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    AlumnosComponent,
    DocentesComponent,
    ProfileComponent,
    DashboardComponent,
    AulasComponent,
    MateriasComponent,
    EvaluacionesComponent,
    CargarAlumnoComponent,
    CargarDocenteComponent,
    CargarAulaComponent,
    CargarEvaluacionComponent,
    CargarMateriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

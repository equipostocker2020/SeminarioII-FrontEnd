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
import { ActualizarAlumnoComponent } from './components/actualizar-alumno/actualizar-alumno.component';
import { ActualizarDocenteComponent } from './components/actualizar-docente/actualizar-docente.component';
import { ActualizarAulaComponent } from './components/actualizar-aula/actualizar-aula.component';
import { ActualizarEvaluacionComponent } from './components/actualizar-evaluacion/actualizar-evaluacion.component';
import { ActualizarMateriaComponent } from './components/actualizar-materia/actualizar-materia.component';
import { CargarInscripcionComponent } from './components/cargar-inscripcion/cargar-inscripcion.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { AulaMateriaComponent } from './components/aulaMateria/aulaMateria.component';
import { CargarAulaMateriaComponent } from './components/cargar-aulaMateria/cargar-aulaMateria.component';
import { ActualizarAulaMateriaComponent } from './components/actualizar-aulaMateria/actualizar-aulaMateria.component';
import { ActualizarInscripcionComponent } from './components/actualizar-inscripcion/actualizar-inscripcion.component';
import { CargarInscripcionPorAlumnoComponent } from './components/cargar-inscripcion-por-alumno/cargar-inscripcion-por-alumno.component';
import { CargarAulaMateriaPorDocenteComponent } from './components/cargar-aula-materia-por-docente/cargar-aula-materia-por-docente.component';
import { VerAlumnosPorAsignacionComponent } from './components/ver-alumnos-por-asignacion/ver-alumnos-por-asignacion.component';
import { ActualizarAdminComponent } from './components/actualizar-admin/actualizar-admin.component';
import { NotaAlumnoComponent } from './components/nota-alumno/nota-alumno.component';

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
    CargarMateriaComponent,
    ActualizarAlumnoComponent,
    ActualizarDocenteComponent,
    ActualizarAulaComponent,
    ActualizarEvaluacionComponent,
    ActualizarMateriaComponent,
    ActualizarInscripcionComponent,
    CargarInscripcionComponent,
    InscripcionComponent,
    AulaMateriaComponent,
    CargarAulaMateriaComponent,
    ActualizarAulaMateriaComponent,
    CargarInscripcionPorAlumnoComponent,
    CargarAulaMateriaPorDocenteComponent,
    VerAlumnosPorAsignacionComponent,
    ActualizarAdminComponent,
    NotaAlumnoComponent
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

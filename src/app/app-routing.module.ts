import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { CargarAulaComponent } from './components/cargar-aula/cargar-aula.component';
import { CargarDocenteComponent } from './components/cargar-docente/cargar-docente.component';
import { CargarEvaluacionComponent } from './components/cargar-evaluacion/cargar-evaluacion.component';
import { CargarMateriaComponent } from './components/cargar-materia/cargar-materia.component';
import { ActualizarAlumnoComponent } from './components/actualizar-alumno/actualizar-alumno.component';
import { ActualizarDocenteComponent } from './components/actualizar-docente/actualizar-docente.component';
import { ActualizarAulaComponent } from './components/actualizar-aula/actualizar-aula.component';
import { ActualizarMateriaComponent } from './components/actualizar-materia/actualizar-materia.component';
import { ActualizarEvaluacionComponent } from './components/actualizar-evaluacion/actualizar-evaluacion.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { CargarInscripcionComponent } from './components/cargar-inscripcion/cargar-inscripcion.component';
import { AulaMateriaComponent } from './components/aulaMateria/aulaMateria.component';
import { CargarAulaMateriaComponent } from './components/cargar-aulaMateria/cargar-aulaMateria.component';
import { ActualizarAulaMateriaComponent } from './components/actualizar-aulaMateria/actualizar-aulaMateria.component';
import { ActualizarInscripcionComponent } from './components/actualizar-inscripcion/actualizar-inscripcion.component';
import { CargarInscripcionPorAlumnoComponent } from './components/cargar-inscripcion-por-alumno/cargar-inscripcion-por-alumno.component';
import { CargarAulaMateriaPorDocenteComponent } from './components/cargar-aula-materia-por-docente/cargar-aula-materia-por-docente.component';
import { VerAlumnosPorAsignacionComponent } from './components/ver-alumnos-por-asignacion/ver-alumnos-por-asignacion.component';





const routes: Routes = [
  { path: 'register', component: RegisterComponent , data: {titulo: 'Register'}},
  { path: 'login', component: LoginComponent , data: {titulo: 'Login'}},
  { path: 'alumnos', component: AlumnosComponent , data: {titulo: 'Ver Alumnos'}},
  { path: 'docentes', component: DocentesComponent , data: {titulo: 'Ver Docentes'}},
  { path: 'profile', component: ProfileComponent , data: {titulo: 'Ver Perfil'}},
  { path: 'aulas', component: AulasComponent , data: {titulo: 'Ver Aulas'}},
  { path: 'materias', component: MateriasComponent , data: {titulo: 'Ver Materias'}},
  { path: 'evaluaciones', component: EvaluacionesComponent , data: {titulo: 'Ver Evaluaciones'}},
  { path: 'inscripciones', component: InscripcionComponent , data: {titulo: 'Ver Inscripcion'}},
  { path: 'alumno/cargar-alumno', component: CargarAlumnoComponent , data: {titulo: 'Cargar Alumno'}},
  { path: 'aula/cargar-aula', component: CargarAulaComponent , data: {titulo: 'Cargar Aula'}},
  { path: 'docente/cargar-docente', component: CargarDocenteComponent, data: {titulo: 'Cargar Docente'}},
  { path: 'evaluacion/cargar-evaluacion', component: CargarEvaluacionComponent, data: {titulo: 'Cargar Evaluación'}},
  { path: 'materia/cargar-materia', component: CargarMateriaComponent, data: {titulo: 'Cargar Materia'}},
  { path: 'inscripcion/cargar-inscripcion', component: CargarInscripcionComponent, data: {titulo: 'Cargar Inscripcion'}},
  { path: 'alumno/inscripcion/cargar-inscripcion', component: CargarInscripcionPorAlumnoComponent, data: {titulo: 'Cargar Inscripcion por alumno'}},
  { path: 'alumno/actualizar-alumno', component: ActualizarAlumnoComponent, data: {titulo: 'Actualizar Alumno'}},
  { path: 'docente/actualizar-docente', component: ActualizarDocenteComponent, data: {titulo: 'Actualizar Docente'}},
  { path: 'aula/actualizar-aula', component: ActualizarAulaComponent, data: {titulo: 'Actualizar Aula'}},
  { path: 'materia/actualizar-materia', component: ActualizarMateriaComponent, data: {titulo: 'Actualizar Materia'}},
  { path: 'evaluacion/actualizar-evaluacion', component: ActualizarEvaluacionComponent, data: {titulo: 'Actualizar Evalucion'}},
  { path: 'inscripcion/actualizar-inscripcion', component: ActualizarInscripcionComponent, data: {titulo: 'Actualizar Inscripcion'}},
  { path: 'aulaMateria/actualizar-aulaMateria', component: ActualizarAulaMateriaComponent, data: {titulo: 'Actualizar Aula Materia'}},
  { path: 'dashboard', component: DashboardComponent , data: {titulo: 'Dashboard'}},
  { path: 'aulasMaterias', component: AulaMateriaComponent , data: {titulo: 'Ver Aula Materia'}},
  { path: 'aulaMateria/cargar-aulaMateria', component: CargarAulaMateriaComponent , data: {titulo: 'Crear Aula Materia'}},
  { path: 'docente/aulaMateria/cargar-aulaMateria', component: CargarAulaMateriaPorDocenteComponent , data: {titulo: 'Crear Aula Materia'}},
  { path: 'alumnos/asignacion', component: VerAlumnosPorAsignacionComponent , data: {titulo: 'Crear Aula Materia'}},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

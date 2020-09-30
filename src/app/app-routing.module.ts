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


const routes: Routes = [
  { path: 'register', component: RegisterComponent , data: {titulo: 'Register'}},
  { path: 'login', component: LoginComponent , data: {titulo: 'Login'}},
  { path: 'alumnos', component: AlumnosComponent , data: {titulo: 'Ver Alumnos'}},
  { path: 'docentes', component: DocentesComponent , data: {titulo: 'Ver Docentes'}},
  { path: 'profile', component: ProfileComponent , data: {titulo: 'Ver Perfil'}},
  { path: 'aulas', component: AulasComponent , data: {titulo: 'Ver Aulas'}},
  { path: 'materias', component: MateriasComponent , data: {titulo: 'Ver Materias'}},
  { path: 'evaluaciones', component: EvaluacionesComponent , data: {titulo: 'Ver Evaluaciones'}},
  { path: 'alumno/cargar-alumno', component: CargarAlumnoComponent , data: {titulo: 'Cargar Alumno'}},
  { path: 'aula/cargar-aula', component: CargarAulaComponent , data: {titulo: 'Cargar Aula'}},
  { path: 'docente/cargar-docente', component: CargarDocenteComponent, data: {titulo: 'Cargar Docente'}},
  { path: 'evaluacion/cargar-evaluacion', component: CargarEvaluacionComponent, data: {titulo: 'Cargar Evaluación'}},
  { path: 'materia/cargar-materia', component: CargarMateriaComponent, data: {titulo: 'Cargar Materia'}},
  { path: 'dashboard', component: DashboardComponent , data: {titulo: 'Dashboard'}},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

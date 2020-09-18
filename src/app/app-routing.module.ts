import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent , data: {titulo: 'Register'}},
  { path: 'login', component: LoginComponent , data: {titulo: 'Login'}},
  { path: 'alumnos', component: AlumnosComponent , data: {titulo: 'Ver Alumnos'}},
  { path: 'docentes', component: DocentesComponent , data: {titulo: 'Ver Docentes'}},
  { path: 'profile', component: ProfileComponent , data: {titulo: 'Ver Perfil'}},
  { path: 'dashboard', component: DashboardComponent , data: {titulo: 'Dashboard'}},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

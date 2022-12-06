import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AutenticacionGuard } from './core/guards/autenticacion.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AutenticacionGuard] },
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.AlumnosModule),
    canActivate: [AutenticacionGuard],
  },
  {
    path: 'autenticacion',
    loadChildren: () =>
      import('./autenticathion/autenticathion.module').then(
        (m) => m.AutenticathionModule
      ),
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
    canActivate: [AutenticacionGuard],
  },
  {
    path: 'inscripciones',
    loadChildren: () =>
      import('./inscriptions/Inscriptions.module').then(
        (m) => m.InscriptionsModule
      ),
    canActivate: [AutenticacionGuard],
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [AutenticacionGuard, AdminGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

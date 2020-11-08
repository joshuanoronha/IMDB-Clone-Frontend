import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMoviesComponent } from './components/movies/list-movies/list-movies.component';
import { CreateMoviesComponent } from './components/movies/create-movies/create-movies.component';
import { UpdateMoviesComponent } from './components/movies/update-movies/update-movies.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ListMoviesComponent },
  { path: 'movies/update', component: UpdateMoviesComponent },
  { path: 'movies/create', component: CreateMoviesComponent },
  { path: '**', redirectTo: 'movies' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

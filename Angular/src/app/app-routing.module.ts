import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NewsComponent } from './features/news/news.component';
import { TeamsComponent } from './features/teams/teams.component';
import { PlayersComponent } from './features/players/players.component';
import { ResultsComponent } from './features/results/results.component';
import { ClasificationsComponent } from './features/clasifications/clasifications.component';
import { RefereeComponent } from './features/referee/referee.component';
import { ContactComponent } from './features/contact/contact.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'classifications', component: ClasificationsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'referee', component: RefereeComponent },

  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}




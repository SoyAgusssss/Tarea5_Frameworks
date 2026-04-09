import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './features/home/home.component';
import { NewsComponent } from './features/news/news.component';
import { CompetitionsComponent } from './features/competitions/competitions.component';
import { TeamsComponent } from './features/teams/teams.component';
import { ResultsComponent } from './features/results/results.component';
import { ClasificationsComponent } from './features/clasifications/clasifications.component';
import { PlayersComponent } from './features/players/players.component';
import { RefereeComponent } from './features/referee/referee.component';
import { ContactComponent } from './features/contact/contact.component';
import { ModalNewsComponent } from './features/news/modal-news/modal-news.component';
import { ModalTeamsComponent } from './features/teams/modal-teams/modal-teams.component';
import { ModalPlayersComponent } from './features/players/modal-players/modal-players.component';
import { ModalRefereeComponent } from './features/referee/modal-referee/modal-referee.component';
import { BannerPrincipalComponent } from './features/home/banner-principal/banner-principal.component';
import { NoticeComponent } from './features/competitions/notice/notice.component';
import { ConfirmContactComponent } from './features/contact/confirm-contact/confirm-contact.component';
import { RegistrationsComponent } from './features/registrations/registrations.component';
import { ModalResgistrationComponent } from './features/registrations/modal-resgistration/modal-resgistration.component';
import { ConfirmRegistrationComponent } from './features/registrations/confirm-registration/confirm-registration.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { AdminComponent } from './features/admin/admin.component';
import { MatchesComponent } from './features/matches/matches.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    CompetitionsComponent,
    TeamsComponent,
    ResultsComponent,
    ClasificationsComponent,
    PlayersComponent,
    RefereeComponent,
    ContactComponent,
    ModalNewsComponent,
    ModalTeamsComponent,
    ModalPlayersComponent,
    ModalRefereeComponent,
    BannerPrincipalComponent, NoticeComponent, ConfirmContactComponent, 
    RegistrationsComponent, ModalResgistrationComponent, ConfirmRegistrationComponent, 
    LoginComponent, RegisterComponent, AdminComponent, MatchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, SharedModule, FormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

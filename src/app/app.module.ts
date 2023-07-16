import { NgModule } from '@angular/core';
import { NgChartjsModule } from 'ng-chartjs';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';
import { TeamsComponent } from './teams/teams.component';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MyteamComponent } from './myteam/myteam.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { MyprojectComponent } from './myproject/myproject.component';
import { DoctorNavComponent } from './doctor-nav/doctor-nav.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { AllprojectsComponent } from './allprojects/allprojects.component';
import { AdminAgendaComponent } from './admin-agenda/admin-agenda.component';
import { TeamProfileComponent } from './team-profile/team-profile.component';
import { IdeaDetailsComponent } from './idea-details/idea-details.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AnotherdoctorComponent } from './anotherdoctor/anotherdoctor.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorRequestsComponent } from './doctor-requests/doctor-requests.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { AnotherStudentComponent } from './another-student/another-student.component';
import { TAProjectTasksComponent } from './ta-project-tasks/ta-project-tasks.component';
import { TALandingPageComponent } from './ta-landing-page_done/ta-landing-page.component';
import { RequestsForTeamsComponent } from './requests-for-teams/requests-for-teams.component';
import { MeetingForLeaderComponent } from './meeting-for-leader/meeting-for-leader.component';
import { AdminLandingPageComponent } from './admin-landing-page_done/admin-landing-page.component';
import { StudentLandingPageComponent } from './student-landing-page/student-landing-page.component';
import { DoctorProjectTasksComponent } from './doctor-project-tasks/doctor-project-tasks.component';
import { SendRequestsFromTeamComponent } from './send-requests-from-team/send-requests-from-team.component';
import { AvailableIdeasComponent } from './available-ideas/available-ideas.component';
import { AdminAssignTAsComponent } from './admin-assign-tas/admin-assign-tas.component';
import { IdeasRequestsComponent } from './ideas-requests/ideas-requests.component';
import { AdminIdeasComponent } from './admin-ideas/admin-ideas.component';
import { TaHomeComponent } from './ta-home/ta-home.component';
import { TaTeamsComponent } from './ta-teams/ta-teams.component';
import { CommunityListComponent } from './community-list/community-list.component';
import { AddCommunityComponent } from './add-community/add-community.component';
import { ProjectsFilesComponent } from './projects-files/projects-files.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentLandingPageComponent,
    HomeComponent,
    ProjectsComponent,
    StudentHomeComponent,
    StudentProfileComponent,
    JoinTeamComponent,
    FooterComponent,
    TeamProfileComponent,
    MyteamComponent,
    MyprojectComponent,
    FriendRequestsComponent,
    AnotherStudentComponent,
    TasksComponent,
    DoctorProjectTasksComponent,
    TAProjectTasksComponent,
    RequestsForTeamsComponent,
    DoctorProfileComponent,
    DoctorHomeComponent,
    DoctorNavComponent,
    TeamsComponent,
    MeetingForLeaderComponent,
    AdminAgendaComponent,
    AdminHomeComponent,
    AdminLandingPageComponent,
    AdminProfileComponent,
    AllprojectsComponent,
    TALandingPageComponent,
    UsersComponent,
    SendRequestsFromTeamComponent,
    DoctorRequestsComponent,
    IdeaDetailsComponent,
    AnotherdoctorComponent,
    AvailableIdeasComponent,
    AdminAssignTAsComponent,
    IdeaDetailsComponent,
    IdeasRequestsComponent,
    AdminIdeasComponent,
    TaHomeComponent,
    TaTeamsComponent,
    CommunityListComponent,
    AddCommunityComponent,
    ProjectsFilesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartjsModule,
    // NgModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

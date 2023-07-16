import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLandingPageComponent } from './student-landing-page/student-landing-page.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { TeamProfileComponent } from './team-profile/team-profile.component';
import { MyteamComponent } from './myteam/myteam.component';
import { MyprojectComponent } from './myproject/myproject.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { AnotherStudentComponent } from './another-student/another-student.component';
import { RequestsForTeamsComponent } from './requests-for-teams/requests-for-teams.component';
import { DoctorNavComponent } from './doctor-nav/doctor-nav.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorProjectTasksComponent } from './doctor-project-tasks/doctor-project-tasks.component';
import { DoctorRequestsComponent } from './doctor-requests/doctor-requests.component';
import { TeamsComponent } from './teams/teams.component';
import { TasksComponent } from './tasks/tasks.component';
import { MeetingForLeaderComponent } from './meeting-for-leader/meeting-for-leader.component';
import { AdminLandingPageComponent } from './admin-landing-page_done/admin-landing-page.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AllprojectsComponent } from './allprojects/allprojects.component';
import { AdminAgendaComponent } from './admin-agenda/admin-agenda.component';
import { TALandingPageComponent } from './ta-landing-page_done/ta-landing-page.component';
import { UsersComponent } from './users/users.component';
import { SendRequestsFromTeamComponent } from './send-requests-from-team/send-requests-from-team.component';
import { IdeaDetailsComponent } from './idea-details/idea-details.component';
import { protectGuard } from './protect.guard';
import { AnotherdoctorComponent } from './anotherdoctor/anotherdoctor.component';
import { AvailableIdeasComponent } from './available-ideas/available-ideas.component';
import { AdminAssignTAsComponent } from './admin-assign-tas/admin-assign-tas.component';
import { AdminIdeasComponent } from './admin-ideas/admin-ideas.component';
import { IdeasRequestsComponent } from './ideas-requests/ideas-requests.component';
import { TaHomeComponent } from './ta-home/ta-home.component';
import { TaTeamsComponent } from './ta-teams/ta-teams.component';
import { TAProjectTasksComponent } from './ta-project-tasks/ta-project-tasks.component';
import { CommunityComponent } from './add-community/community';
import { AddCommunityComponent } from './add-community/add-community.component';
import { ProjectsFilesComponent } from './projects-files/projects-files.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'previousProjects', component: ProjectsComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'landingpage',
    canActivate: [protectGuard],
    component: StudentLandingPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'studenthome',
        pathMatch: 'full',
      },
      {
        path: 'studenthome',
        canActivate: [protectGuard],
        component: StudentHomeComponent,
      },
      {
        path: 'profile',
        canActivate: [protectGuard],
        component: StudentProfileComponent,
      },
      {
        path: 'sendRequest',
        canActivate: [protectGuard],
        component: SendRequestsFromTeamComponent,
      },
      {
        path: 'sendRequest/students/:id',
        canActivate: [protectGuard],
        component: AnotherStudentComponent,
      },
      {
        path: 'jointeam',
        canActivate: [protectGuard],
        component: JoinTeamComponent,
      },
      {
        path: 'jointeam/students/:id',
        canActivate: [protectGuard],
        component: AnotherStudentComponent,
      },
      {
        path: 'jointeam/teams/:id',
        canActivate: [protectGuard],
        component: TeamProfileComponent,
      },
      {
        path: 'friendRequests',
        canActivate: [protectGuard],
        component: FriendRequestsComponent,
      },
      {
        path: 'RequestsForTeams',
        canActivate: [protectGuard],
        component: RequestsForTeamsComponent,
      },
      {
        path: 'meetingForLeader',
        canActivate: [protectGuard],
        component: MeetingForLeaderComponent,
      },
      {
        path: 'RequestsForTeams/students/:id',
        canActivate: [protectGuard],
        component: AnotherStudentComponent,
      },
      {
        path: 'friendRequests/students/:id',
        canActivate: [protectGuard],
        component: AnotherStudentComponent,
      },
      {
        path: 'friendRequests/teams/:id',
        canActivate: [protectGuard],
        component: TeamProfileComponent,
      },
      {
        path: 'availableIdeas',
        canActivate: [protectGuard],
        component: AvailableIdeasComponent,
      },
      {
        path: 'myteam',
        canActivate: [protectGuard],
        component: MyteamComponent,
      },
      {
        path: 'myproject',
        canActivate: [protectGuard],
        component: MyprojectComponent,
      },
      {
        path: 'teams/:id',
        canActivate: [protectGuard],
        component: TeamProfileComponent,
      },
    ],
  },
  // ----------------------admin-----------------------------
  {
    path: 'adminLandingPage',
    component: AdminLandingPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'adminhome',
        pathMatch: 'full',
      },
      {
        path: 'adminhome',
        // canActivate: [protectGuard],
        component: AdminHomeComponent,
      },
      {
        path: 'users/studentprofile/:id',
        canActivate: [protectGuard],
        component: AnotherStudentComponent,
      },
      {
        path: 'users/doctorprofile/:id',
        canActivate: [protectGuard],
        component: AnotherdoctorComponent,
      },
      {
        path: 'users/adminprofile/:id',
        canActivate: [protectGuard],
        component: AnotherStudentComponent,
      },
      {
        path: 'adminprojects',
        canActivate: [protectGuard],
        component: AllprojectsComponent,
      },
      {
        path: 'adminagenda',
        canActivate: [protectGuard],
        component: AdminAgendaComponent,
      },
      {
        path: 'ideas',
        canActivate: [protectGuard],
        component: AdminIdeasComponent,
      },
      {
        path: 'assignta',
        canActivate: [protectGuard],
        component: AdminAssignTAsComponent,
      },
      {
        path: 'committi',
        canActivate: [protectGuard],
        component: AddCommunityComponent,
      },
      {
        path: 'projectsfiles',
        canActivate: [protectGuard],
        component: ProjectsFilesComponent,
      },
      { path: 'users', canActivate: [protectGuard], component: UsersComponent },
    ],
  },
  // ----------------------ta-----------------------------
  {
    path: 'taLandingPage',
    component: TALandingPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'tahome',
        pathMatch: 'full',
      },
      {
        path: 'tahome',
        canActivate: [protectGuard],
        component: TaHomeComponent,
      },
      {
        path: 'teams',
        canActivate: [protectGuard],
        component: TaTeamsComponent,
      },
      {
        path: 'teams/taassigntasks/:id',
        canActivate: [protectGuard],
        component: TAProjectTasksComponent,
      },
    ],
  },
  // -------------------doctor--------------------------------
  {
    path: 'doctorLandingPage',
    component: DoctorNavComponent,
    children: [
      {
        path: '',
        redirectTo: 'doctorhome',
        pathMatch: 'full',
      },
      {
        path: 'doctorhome',
        canActivate: [protectGuard],
        component: DoctorHomeComponent,
      },
      { path: 'Teams', canActivate: [protectGuard], component: TeamsComponent },
      {
        path: 'Teams/doctorassigntasks/:id',
        canActivate: [protectGuard],
        component: DoctorProjectTasksComponent,
      },
      {
        path: 'doctorideas',
        canActivate: [protectGuard],
        component: DoctorProfileComponent,
      },
      {
        path: 'doctorrequests',
        canActivate: [protectGuard],
        component: DoctorRequestsComponent,
      },
      {
        path: 'doctorrequests/idea/:id',
        canActivate: [protectGuard],
        component: IdeaDetailsComponent,
      },
    ],
  },
  // { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ta-teams',
  templateUrl: './ta-teams.component.html',
  styleUrls: ['./ta-teams.component.css'],
})
export class TaTeamsComponent {
  token = localStorage.getItem('token');
  teams: any[] = [];
  team: any;
  projectTitle: string = 'Choose Team';
  projectID!: number;
  projectDescription: string = '';
  projectMembers: any;
  // teamImageUrl: string = '';
  showTeamInfo: boolean = false;
  images!: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.teams.length > 0) {
      const firstTeam = this.teams[0];
    }

    this.getAllTeams();
  }

  getAllTeams() {
    this.http
      .get('http://127.0.0.1:8000/api/allTeamsTA', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.teams = Object.values(res);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onViewButtonClick(id: any) {
    this.http
      .get(`http://127.0.0.1:8000/api/team/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.getProject(res.project_id);
          this.images = Object.values(res.images);
          this.projectMembers = Object.values(res.members);
          this.projectMembers = this.projectMembers.filter(
            (department: any) => department !== null
          );
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getProject(id: any) {
    this.http
      .get(`http://127.0.0.1:8000/api/project/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.projectID = res.project_id;
          this.projectTitle = res.title;
          this.projectDescription = res.abstract;
          this.showTeamInfo = true;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

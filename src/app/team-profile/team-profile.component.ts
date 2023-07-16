import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.css'],
})
export class TeamProfileComponent {
  id!: number;
  team: any;
  members!: String[];
  departments!: String[];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.http
      .get(`http://127.0.0.1:8000/api/team/${this.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.team = res;
          this.handleMembers(res.members);
          this.handleDepartments(res.departments);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  handleMembers(members: any) {
    this.members = Object.values(members);
    this.members = this.members.filter((member) => member !== null);
  }

  handleDepartments(departments: any) {
    this.departments = Object.values(departments);
    this.departments = Array.from(new Set(this.departments));
    this.departments = this.departments.filter(
      (department) => department !== null
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-allprojects',
  templateUrl: './allprojects.component.html',
  styleUrls: ['./allprojects.component.css'],
})
export class AllprojectsComponent {
  token = localStorage.getItem('token');
  userRole = 0; // Replace with the actual user role value
  selectedDepartment = '';
  selectedSupervisor: string = '';

  projectTitle: string = 'Choose Project';
  projectAbstract: string = '';
  projectTeam: string = '';
  projectKeywords: string = '';
  doctor: string = '';

  projects!: any;
  departments: string[] = ['CS', 'IS', 'AI', 'IT', 'DS'];
  // supervisors: string[] = ['ahmed', 'mohamed', 'ali'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.http
      .get('http://127.0.0.1:8000/api/allprojects', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.projects = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onProjectButtonClick(project: any) {

    this.projectTitle = project.title;
    this.projectAbstract = project.abstract;
    this.projectKeywords = project.Key_words;

    this.doctor = project.dr_name;
    //all members and ta
  }

  filterByDepartment() {
    this.http
      .get(
        `http://127.0.0.1:8000/api/getProjectsByDep/${this.selectedDepartment}`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (res: any) => {
          this.projects = res;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
  filterBySupervisor() {}
}

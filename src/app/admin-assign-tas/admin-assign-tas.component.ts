import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServiesService } from '../servies.service';

@Component({
  selector: 'app-admin-assign-tas',
  templateUrl: './admin-assign-tas.component.html',
  styleUrls: ['./admin-assign-tas.component.css'],
  providers: [ServiesService],
})
export class AdminAssignTAsComponent {
  token = localStorage.getItem('token');
  ta1: any;
  ta2: any;
  ta3: any;
  projects: any[] = [];
  project: any;
  isEmpty: boolean = false;

  constructor(private http: HttpClient, private servies: ServiesService) {}

  ngOnInit() {
    this.http
      .get('http://127.0.0.1:8000/api/getIdeasNoTA', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.project = res;
          if (res.length == 0) {
            this.isEmpty = true;
          }
          
          const mappedData = res.map((data: any) => {
            console.log(data);
            return {
              title: data.title,
              ideaID: data.id,
              tas: [
                { name: data.preferred_ta.name, id: data.preferred_ta.ta_id },
                { name: data.firstTA.name, id: data.firstTA.ta_id },
                { name: data.secondTA.name, id: data.secondTA.ta_id },
              ],
              selectedTA: '',
            };
          });

          this.projects = mappedData;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  selectTA(project: any, ta: string) {
    project.selectedTA = ta;
  }

  confirmProject(project: any) {
    this.http
      .post(
        'http://127.0.0.1:8000/api/acceptTA',
        { ta_id: project.selectedTA, id: project.ideaID },
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (error: any) => {
          console.log(error);
        }
      );

    const index = this.projects.indexOf(project);
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }
}

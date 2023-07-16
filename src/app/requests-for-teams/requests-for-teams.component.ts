import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-requests-for-teams',
  templateUrl: './requests-for-teams.component.html',
  styleUrls: ['./requests-for-teams.component.css'],
})
export class RequestsForTeamsComponent {
  token = localStorage.getItem('token');
  students!: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    var token = localStorage.getItem('token');

    this.http
      .get('http://127.0.0.1:8000/api/myteamrequests', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.students = Object.values(res);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  acceptRequest(id: number) {
    console.log(id);
    this.http
      .get(`http://127.0.0.1:8000/api/acceptRequestForTeam/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.error(error);
        }
      );

    // location.reload();
  }

  rejectRequest(id: number) {
    this.http
      .get(`http://127.0.0.1:8000/api/rejectRequestForTeam/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.error(error);
        }
      );
    location.reload();
  }
}

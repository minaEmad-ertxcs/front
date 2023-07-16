import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css'],
})
export class FriendRequestsComponent {
  token = localStorage.getItem('token');
  students: any;
  teams!: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    var token = localStorage.getItem('token');

    this.http
      .get('http://127.0.0.1:8000/api/showMyRequests', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.students = Object.values(res.requestsStudents);
        this.teams = Object.values(res.requestsTeams);
      });
  }

  acceptRequest(id: number) {
    console.log(id);

    this.http
      .get(`http://127.0.0.1:8000/api/acceptRequest/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          location.reload();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  rejectRequest(id: number) {
    this.http
      .get(`http://127.0.0.1:8000/api/rejectRequest/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          location.reload();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}

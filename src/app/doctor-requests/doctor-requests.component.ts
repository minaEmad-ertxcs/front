import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-requests',
  templateUrl: './doctor-requests.component.html',
  styleUrls: ['./doctor-requests.component.css'],
})
export class DoctorRequestsComponent {
  token = localStorage.getItem('token');
  Idea!: any[];
  IdeaLength = 0;
  isConfirmed: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://127.0.0.1:8000/api/showMyRequestsForDoctor', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.Idea = Object.values(res);
        this.IdeaLength = this.Idea.length;
      });
  }

  acceptRequest(id: number) {
    this.http
      .get(`http://127.0.0.1:8000/api/acceptRequestFromTeamToDoctor/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.isConfirmed = true;
          location.reload();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  rejectRequest(id: number) {
    this.http
      .get(`http://127.0.0.1:8000/api/rejectRequestFromTeamToDoctor/${id}`, {
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

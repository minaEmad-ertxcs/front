import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-send-requests-from-team',
  templateUrl: './send-requests-from-team.component.html',
  styleUrls: ['./send-requests-from-team.component.css'],
})
export class SendRequestsFromTeamComponent {
  token = localStorage.getItem('token');
  students!: [];
  teams!: [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://127.0.0.1:8000/api/availableStudents&teams', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.students = res.students;
          console.log(this.students);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  sendRequest(id: number, role: number) {
    this.http
      .get(
        `http://127.0.0.1:8000/api/SendRequestForStudent?id=${id}&role=${role}`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}

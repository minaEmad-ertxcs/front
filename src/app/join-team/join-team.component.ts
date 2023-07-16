import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.css'],
})
export class JoinTeamComponent {
  token = localStorage.getItem('token');
  students!: any[];
  teams!: any[];

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
          this.teams = res.teams;
        },
        (error: any) => {
          console.log(error);
        }
      );

    this.generateUnsendedStudents(this.students);
    this.generateUnsendedTeams(this.teams);
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
        (res: any) => {
          console.log(res);
          location.reload();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
  unSendRequest(id: number, role: number) {
    this.http
      .get(`http://127.0.0.1:8000/api/unSendRequestForStudent?id=${id}&role=${role}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          location.reload();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  generateUnsendedStudents(students: any) {
    this.http
      .get(`http://127.0.0.1:8000/api/getSentStudents`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.students = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  generateUnsendedTeams(students: any) {
    this.http
      .get(`http://127.0.0.1:8000/api/getSentTeams`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.teams = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

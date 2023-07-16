import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-nav',
  templateUrl: './doctor-nav.component.html',
  styleUrls: ['./doctor-nav.component.css'],
})
export class DoctorNavComponent {
  token = localStorage.getItem('token');
  student!: any;
  inTeam!: boolean;
  isFull: boolean = false;
  members: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('http://127.0.0.1:8000/api/allTeams', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        if (res.length > 3) {
          this.isFull = true;
        }
      });
  }
}

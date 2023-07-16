import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  token = localStorage.getItem('token');
  selectedUserType: string;
  selectedUserList: any[];

  representativeEmail: string = '';
  representativePassword: string = '';

  constructor(private http: HttpClient) {
    this.selectedUserType = '';
    this.selectedUserList = [];
  }

  ngOnInit() {
    this.showUserList('students');
  }

  showUserList(userType: string) {
    switch (userType) {
      case 'students':
        let students;
        this.http
          .get('http://127.0.0.1:8000/api/getAllStudents', {
            headers: { Authorization: `Bearer ${this.token}` },
            withCredentials: true,
          })
          .subscribe(
            (res: any) => {
              students = res;
              this.selectedUserList = students;
              // this.selectedUserList = students.map(
              //   (student: any) => student.name
              // );
            },
            (error: any) => {
              console.log(error);
            }
          );
        break;
      case 'doctors':
        let doctors;
        this.http
          .get('http://127.0.0.1:8000/api/getAllDrs', {
            headers: { Authorization: `Bearer ${this.token}` },
            withCredentials: true,
          })
          .subscribe(
            (res: any) => {
              doctors = res;
              this.selectedUserList = doctors.map((doctor: any) => ({
                name: doctor.name,
                id: doctor.doctor_id,
                role: 2,
              }));
            },
            (error: any) => {
              console.log(error);
            }
          );
        break;
      case 'TA':
        let TAs;
        this.http
          .get('http://127.0.0.1:8000/api/getAllTAs', {
            headers: { Authorization: `Bearer ${this.token}` },
            withCredentials: true,
          })
          .subscribe(
            (res: any) => {
              TAs = res;
              this.selectedUserList = TAs.map((ta: any) => ({
                name: ta.name,
                id: ta.ta_id,
                role: 3,
              }));
            },
            (error: any) => {
              console.log(error);
            }
          );

        break;
      case 'admins':
        let admins;
        this.http
          .get('http://127.0.0.1:8000/api/getAllAdmins', {
            headers: { Authorization: `Bearer ${this.token}` },
            withCredentials: true,
          })
          .subscribe(
            (res: any) => {
              admins = res;
              this.selectedUserList = admins.map((admin: any) => ({
                name: admin.name,
                id: admin.admin_id,
                role: 0,
              }));
            },
            (error: any) => {
              console.log(error);
            }
          );
        break;
      default:
        this.selectedUserList = [];
    }
  }

  upgradeToAdmin(user: any) {
    console.log(`Upgrade ${user.id} to Admin`);
  }
  upgradeToDoctor(user: string) {
    console.log(`Upgrade ${user} to Doctor`);
  }
  degradeToDoctor(user: any) {
    console.log(`Degrade ${user.id} to Doctor`);
  }

  openModal(user: string) {
    this.representativeEmail = '';
    this.representativePassword = '';

    $('#representativeModal').modal('show');
  }

  saveRepresentative() {
    // Logic to save the representative (using this.representativeEmail and this.representativePassword)

    // Close the modal
    $('#representativeModal').modal('hide');
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anotherdoctor',
  templateUrl: './anotherdoctor.component.html',
  styleUrls: ['./anotherdoctor.component.css'],
})
export class AnotherdoctorComponent {
  token = localStorage.getItem('token');
  id!: number;
  doctor: any;
  experience!: any[];
  msg: String = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.http
      .get(`http://127.0.0.1:8000/api/doctor/${this.id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.doctor = res;
        },
        (error: any) => {
          console.log(error);
        }
      );

    this.getExperience();
  }

  getExperience() {
    this.http
      .get(`http://127.0.0.1:8000/api/getDoctorExperience/${this.id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          if (res != '') {
            this.experience = res.map((value: string) => ({
              value,
              editedValue: '',
              isEditMode: false,
            }));
          } else {
            this.msg = 'No experience yet';
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

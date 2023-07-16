import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-another-student',
  templateUrl: './another-student.component.html',
  styleUrls: ['./another-student.component.css'],
})
export class AnotherStudentComponent {
  token = localStorage.getItem('token');
  id!: number;
  student: any;
  skills!: any[];
  msg: String = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.http
      .get(`http://127.0.0.1:8000/api/student/${this.id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.student = res;
        },
        (error: any) => {
          console.log(error);
        }
      );

    this.getSkills();
  }

  getSkills() {
    this.http
      .get(`http://127.0.0.1:8000/api/skills/${this.id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          if (res.skills != null) {
            const skillArray = res.skills.split(', ');
            this.skills = skillArray.map((value: string) => ({
              value,
              editedValue: '',
              isEditMode: false,
            }));
          } else {
            this.msg = 'No Skills yet';
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

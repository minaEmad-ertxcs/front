import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css'],
})
export class MyteamComponent {
  token = localStorage.getItem('token');
  message = '';
  myTeam: any;
  members!: String[];
  doctors!: any[];
  departments!: String[];
  ideas: any[] = [];
  newIdea: any = {};
  haveIdea!: boolean;
  haveProject: boolean = false;
  myIdea: any;
  myProject: any;
  mappedArray: any;
  isLeader: boolean = false;
  userImage: string = './assets/image.jpg';
  images!: String[];

  listOfTAs: any[] = [];
  ta1!: any;
  ta2!: any;
  ta3!: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http
      .get('http://127.0.0.1:8000/api/myTeamProfile', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.myTeam = res;

          this.handleMembers(res.members);
          this.handleDepartments(res.departments);
          this.handleImages(res.images);

          this.mappedArray = this.members.map((element, index) => {
            return {
              name: element,
              department: this.departments[index],
            };
          });
        },
        (error: any) => {
          console.log(error);
          this.message = 'You are not in Team yet.';
        }
      );

    this.http
      .get('http://127.0.0.1:8000/api/getAllTAs', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.listOfTAs = res;
      });

    this.http
      .get('http://127.0.0.1:8000/api/showMyProfile', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          // console.log(res);
          if (res.is_leader == 1) {
            this.isLeader = true;
          }
        },
        (error: any) => {
          console.log(error);
        }
      );

    this.getAllDrs();
    this.getMyIdea();
    this.getMyProject();
  }

  openAddIdeaModal() {
    this.newIdea = {};
    $('#addIdeaModal').modal('show');
  }

  deleteIdea() {
    this.http
      .get('http://127.0.0.1:8000/api/deleteIdea', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          location.reload();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  addIdea() {
    this.ideas.push(this.newIdea);
    const newIdeaForm = this.formBuilder.group({
      doctorID: this.newIdea.doctor_id,
      title: this.newIdea.title,
      ideaDescription: this.newIdea.ideaDescription,
      technology: this.newIdea.technology,
      ta1: this.ta1,
      ta2: this.ta2,
      ta3: this.ta3,
    });

    console.log(newIdeaForm.value);

    this.http
      .post('http://127.0.0.1:8000/api/createIdea', newIdeaForm.getRawValue(), {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          // location.reload();
        },
        (error: any) => {
          console.log(error);
          console.log('error');
        }
      );

    this.newIdea = {};
    $('#addIdeaModal').modal('hide');
  }

  handleMembers(members: any) {
    this.members = Object.values(members);
    this.members = this.members.filter((member) => member !== null);
  }

  handleDoctors(doctors: any) {
    this.doctors = Object.values(doctors);
    this.doctors = this.doctors.filter((doctor) => doctor !== null);
  }

  handleDepartments(departments: any) {
    this.departments = Object.values(departments);
    this.departments = this.departments.filter(
      (department) => department !== null
    );
  }

  handleImages(images: any) {
    this.images = Object.values(images);
    console.log(images);
  }

  getAllDrs() {
    this.http
      .get('http://127.0.0.1:8000/api/getAllDoctors', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.handleDoctors(res);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMyIdea() {
    this.http
      .get('http://127.0.0.1:8000/api/getMyIdea', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.haveIdea = res;
          this.myIdea = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMyProject() {
    this.http
      .get('http://127.0.0.1:8000/api/getMyProject', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.myProject = res;
          this.haveProject = true;
        },
        (error: any) => {
          console.log(error);
          this.haveProject = false;
          console.log(this.haveProject);
        }
      );
  }

  onFileChange(event: any) {
    console.log(event);
  }

  leaveTeam() {
    this.http
      .get('http://127.0.0.1:8000/api/leaveteam', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigate(['landingpage']);
          location.reload();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

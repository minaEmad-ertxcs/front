import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css'],
})
export class DoctorProfileComponent {
  token = localStorage.getItem('token');
  ideas: any[] = [];
  myideas: any[] = [];
  isModalOpen = false;
  doctor: any;
  newIdea: any = {};
  skills!: any;
  items: any[] = [];
  teamsRequests: any[] = [];
  userImage: string = './assets/img.png';
  userImageFromBack: any;
  teams!: any;

  imageName: string = '';
  imagePath: string = '';
  newSkill: string = '';
  canAddIdea: boolean = true;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.http
      .get('http://127.0.0.1:8000/api/showMyProfileForDoctor', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.doctor = res;
      });

    this.http
      .get('http://127.0.0.1:8000/api/getAllMyIdeas', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.myideas = res;
      });
    this.getAllTeams();
  }

  getAllTeams() {
    this.http
      .get('http://127.0.0.1:8000/api/allTeams', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.teams = Object.values(res);
          if (this.teams.length >= 3) {
            this.deleteIdeas();
            this.canAddIdea = false;
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageName = file.name; // Save the image name
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  openAddIdeaModal() {
    this.newIdea = {};
    $('#addIdeaModal').modal('show');
  }
  openRequestsModal(id: number) {
    console.log(id);

    this.http
      .get(`http://127.0.0.1:8000/api/listTeamsforIdea/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.teamsRequests = res;
        },
        (error: any) => {
          console.log(error);
        }
      );

    $('#viewIdeaModal').modal('show');
  }

  addIdea() {
    this.ideas.push(this.newIdea);

    const newIdeaForm = this.formBuilder.group({
      title: this.newIdea.title,
      description: this.newIdea.ideaDescription,
      tools: this.newIdea.technology,
      doctorID: this.doctor.doctor_id,
    });

    this.http
      .post(
        'http://127.0.0.1:8000/api/createDoctorIdea',
        newIdeaForm.getRawValue(),
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          console.log('done');
        },
        (error: any) => {
          console.log(error);
          console.log('error');
        }
      );

    this.newIdea = {};
    $('#addIdeaModal').modal('hide');
  }

  deleteIdea() {}

  accept(team: any) {
    this.http
      .get(`http://127.0.0.1:8000/api/acceptidearequest/${team.id}`, {
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
  reject() {}

  deleteIdeas() {
    this.http
      .get('http://127.0.0.1:8000/api/deleteIdeasForDoctor', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          // console.log(res);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

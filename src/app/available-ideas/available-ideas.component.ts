import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-available-ideas',
  templateUrl: './available-ideas.component.html',
  styleUrls: ['./available-ideas.component.css'],
})
export class AvailableIdeasComponent {
  token = localStorage.getItem('token');
  role: number = 0;
  roleForIdea: number = 0;
  selectedIdea: any = {};
  ideas!: any[];
  doctor!: any;
  ta1!: any;
  ta2!: any;
  ta3!: any;
  listOfTAs: any[] = [];
  listOfDoctors: any[] = [];
  listOfIdeas: any[] = [];
  listOfCompaniesIdeas: any[] = [];
  isSended: boolean = false;
  isEmpty = false;
  isEmptyCompany = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.http
      .get('http://127.0.0.1:8000/api/getAllDoctors', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.listOfDoctors = res;
        console.log(this.listOfDoctors);
      });
    this.http
      .get('http://127.0.0.1:8000/api/showideas', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.listOfIdeas = res;
        if (this.listOfIdeas.length == 0) {
          this.isEmpty = true;
        }
      });
    this.http
      .get('http://127.0.0.1:8000/api/getAllCompaniesIdeas', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.listOfCompaniesIdeas = res;
        if (this.listOfCompaniesIdeas.length == 0) {
          this.isEmptyCompany = true;
        }
      });
    this.http
      .get('http://127.0.0.1:8000/api/getAllTAs', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        this.listOfTAs = res;
      });
  }

  showIdeaDetailsModal(idea: any): void {
    this.selectedIdea = idea;
    $('#ideaDetailsModal').modal('show');
  }

  hideIdeaDetailsModal(): void {
    this.selectedIdea = null;
    $('#ideaDetailsModal').modal('hide');
  }

  showAddTAsModal(idea: any): void {
    this.selectedIdea = idea;

    if (this.selectedIdea.author_role == 2) {
      $('#addTAsModal').modal('show');
    } else {
      $('#addDrsTAsModal').modal('show');
    }
    const ideaDetailsModal = $('#ideaDetailsModal');

    Modal.getOrCreateInstance(ideaDetailsModal[0]).hide();
  }

  submitTAs(): void {
    var newProject = this.formBuilder.group({
      id: this.selectedIdea.id,
      first: this.ta1,
      second: this.ta2,
      third: this.ta3,
    });

    console.log(newProject.value);

    this.http
      .post(
        'http://127.0.0.1:8000/api/acceptdoatoridea',
        newProject.getRawValue(),
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (error: any) => {
          console.log(error);
        }
      );

    this.isSended = true;
    this.hideAddTAsModal();
  }

  submitDrsTAs(): void {
    var newProject = this.formBuilder.group({
      id: this.selectedIdea.id,
      doctor: this.doctor,
      first: this.ta1,
      second: this.ta2,
      third: this.ta3,
    });

    console.log(newProject.value);

    this.http
      .post(
        'http://127.0.0.1:8000/api/workOnCompanyIdea',
        newProject.getRawValue(),
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (error: any) => {
          console.log(error);
        }
      );

    this.isSended = true;
    this.hideAddTAsModal();
  }

  hideAddTAsModal(): void {
    const addTAsModal = $('#addTAsModal');
    this.selectedIdea = null;
    this.ta1 = '';
    this.ta2 = '';
    this.ta3 = '';
    Modal.getOrCreateInstance(addTAsModal[0]).hide();
  }
}

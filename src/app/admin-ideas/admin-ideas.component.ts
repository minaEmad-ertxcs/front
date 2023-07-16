import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

declare const $: any; // Declare the jQuery variable

@Component({
  selector: 'app-admin-ideas',
  templateUrl: './admin-ideas.component.html',
  styleUrls: ['./admin-ideas.component.css']
})
export class AdminIdeasComponent {

  token = localStorage.getItem('token');
  ideas: any[] = [];
  newIdea: any = {};
  selectedIdea: any = {};

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.getMyIdeas();
  }

  openAddIdeaModal(): void {
    this.newIdea = {};
    $('#addIdeaModal').modal('show');
  }

  addIdea(): void {
    this.ideas.push(this.newIdea);
    
    const newIdeaForm = this.formBuilder.group({
      title: this.newIdea.title,
      abstract: this.newIdea.abstract,
      keywords: this.newIdea.keywords,
    });
    console.log(newIdeaForm.getRawValue());
    
    this.http
      .post(
        'http://127.0.0.1:8000/api/createCompanyIdea',
        newIdeaForm.getRawValue(),
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
          console.log(error);
        }
      );

    this.newIdea = {};
    $('#addIdeaModal').modal('hide');
  }

  openIdeaDetailsModal(event: Event, idea: any): void {
    event.preventDefault();
    this.selectedIdea = idea;
    $('#ideaDetailsModal').modal('show');
  }

  removeIdea(id: number): void {
    this.ideas.splice(id, 1);
    this.http
      .delete(`http://127.0.0.1:8000/api/deleteAdminIdea/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          // console.log(res);
          location.reload();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMyIdeas() {
    this.http
      .get('http://127.0.0.1:8000/api/viewCompanyIdeas', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.ideas = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

import { Component } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-ideas-requests',
  templateUrl: './ideas-requests.component.html',
  styleUrls: ['./ideas-requests.component.css']
})
export class IdeasRequestsComponent {
  ideas: any[] = [
    { title: 'Idea 1', description: 'Description of Idea 1' },
    { title: 'Idea 2', description: 'Description of Idea 2' },
    { title: 'Idea 3', description: 'Description of Idea 3' }
  ];

  selectedIdea: any = {};

  acceptIdea(idea: any): void {
    // Accept logic
    console.log('Accepted idea:', idea);
  }

  rejectIdea(idea: any): void {
    // Reject logic
    console.log('Rejected idea:', idea);
  }

  openIdea(event: Event, idea: any): void {
    event.preventDefault();
    this.selectedIdea = idea;
    const ideaDetailsModal = $('#ideaDetailsModal');
    Modal.getOrCreateInstance(ideaDetailsModal[0]).show();
  }
}

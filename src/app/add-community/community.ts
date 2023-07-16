import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-community',
  template: `
    <div class="card">
      <div class="card-header">
        Community {{ index }}: {{ name }}
      </div>
      <div class="card-body">
        <button class="btn btn-primary" (click)="addDetails()">Add Details</button>
      </div>
    </div>
  `
})
export class CommunityComponent {
  @Input() name: string = '';
  @Input() index: number = 0;

  addDetails() {
    console.log(`Adding details for community ${this.name}`);
    // Implement the logic to add details for the selected community here
  }
}
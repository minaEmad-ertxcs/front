import { Component } from '@angular/core';

@Component({
  selector: 'app-team-tasks',
  templateUrl: './team-tasks.component.html',
  styleUrls: ['./team-tasks.component.css']
})

export class TeamTasksComponent {
  tasks: Task[] = [
    { name: 'Task 1', status: 'Assigned', deadline: '2023-07-10' },
    { name: 'Task 2', status: 'Assigned', deadline: '2023-07-15' },
    { name: 'Task 3', status: 'Not Assigned', deadline: 'N/A' },
    // Add more tasks as needed
  ];
}
interface Task {
  name: string;
  status: string;
  deadline: string;
}

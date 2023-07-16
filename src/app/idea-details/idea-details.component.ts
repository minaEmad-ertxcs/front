import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.css'],
})
export class IdeaDetailsComponent {
  token = localStorage.getItem('token');
  id!: number;
  idea!: any;
  ideaMembers!: any[];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.http
      .get(`http://127.0.0.1:8000/api/getIdeaByID/${this.id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.idea = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

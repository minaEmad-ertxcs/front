import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-community',
  templateUrl: './add-community.component.html',
  styleUrls: ['./add-community.component.css'],
})
export class AddCommunityComponent {
  token = localStorage.getItem('token');
  departmentName: string = '';
  departments: string[] = ['', 'CS', 'IS', 'AI', 'IT', 'DS'];
  doctors!: any;

  block = {
    doctors: [{ name: '' }], // Initial data structure for doctors array
    place: ''
  };


  numCommunities: number = 1;
  communities: {
    index: number;
    name: string;
    blocks: { place: string; doctors: { name: string }[] }[];
  }[] = [];

  constructor(private http: HttpClient) {}

  generateCommunities() {
    console.log(this.departmentName);

    this.http
      .get(`http://127.0.0.1:8000/api/getDoctorsByDep/${this.departmentName}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.doctors = res;
        },
        (error: any) => {
          console.log(error);
        }
      );

    if (this.numCommunities > 0) {
      this.communities = Array(this.numCommunities)
        .fill(0)
        .map((_, index) => {
          const blocks = [
            {
              name: `Block 1`,
              place: '',
              doctors: Array(4)
                .fill(0)
                .map((_, doctorIndex) => {
                  return { name: ' ' };
                }),
            },
          ];
          return { index: index + 1, name: '', blocks };
        });
    }
  } saveData() {
    // Access the data from the input fields
    console.log('Block:', this.block);

    // Rest of your code to handle the saved data
    // ...
  }

  addBlock(community: any) {
    const blockCount = community.blocks.length + 1;
    console.log(`Adding block ${blockCount} to community ${community.index}`);
    const newBlock = {
      name: `Block ${blockCount}`,
      place: '',
      doctors: Array(4)
        .fill(0)
        .map((_, doctorIndex) => {
          return { name: ' ' };
        }),
    };
    community.blocks.push(newBlock);
  }
}

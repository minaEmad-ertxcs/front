import { Component } from '@angular/core';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css'],
})
export class CommunityListComponent {
  communities = [
    {
      name: 'Community 1',
      description: 'Description 1',
      population: 1000,
      location: 'Location 1',
      doctors: [{ name: 'Doctor 1' }, { name: 'Doctor 2', time: '10:00 AM' }],
      teams: [
        { name: 'Team A', time: '9:00 AM' },
        { name: 'Team B', time: '10:00 AM' },
      ],
    },
    {
      name: 'Community 2',
      description: 'Description 2',
      population: 2000,
      location: 'Location 2',
      doctors: [{ name: 'Doctor 3' }, { name: 'Doctor 4', time: '12:00 PM' }],
      teams: [
        { name: 'Team C', time: '11:00 AM' },
        { name: 'Team D', time: '12:00 PM' },
      ],
    },
    {
      name: 'Community 3',
      description: 'Description 3',
      population: 3000,
      location: 'Location 3',
      doctors: [],
      teams: [],
    },
    {
      name: 'Community 4',
      description: 'Description 4',
      population: 4000,
      location: 'Location 4',
      doctors: [],
      teams: [],
    },
    {
      name: 'Community 5',
      description: 'Description 5',
      population: 5000,
      location: 'Location 5',
      doctors: [],
      teams: [],
    },
  ];

  selectedCommunity: any;
  form: any = {};

  showPopup(community: any) {
    this.selectedCommunity = community;
  }

  hidePopup() {
    this.selectedCommunity = null;
    this.form = {};
  }

  hasDoctors(community: any) {
    return community.doctors && community.doctors.length > 0;
  }

  hasTeams(community: any) {
    return community.teams && community.teams.length > 0;
  }

  submitForm() {
    console.log('Form submitted:', this.form);
    this.hidePopup();
  }
}

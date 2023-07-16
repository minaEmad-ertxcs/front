import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-meeting-for-leader',
  templateUrl: './meeting-for-leader.component.html',
  styleUrls: ['./meeting-for-leader.component.css'],
})
export class MeetingForLeaderComponent {
  token = localStorage.getItem('token');
  meetingName!: string;
  meetingPassword!: string;
  student!: any;
  join_url: string = '';
  meetings!: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.getMyProfile();
  }

  createMeeting(): void {
    const modalElement = $('#meetingModal');
    Modal.getOrCreateInstance(modalElement[0]).show();
    this.saveMeeting(this.meetingName, this.meetingPassword, this.student.id);
  }

  saveMeeting(name: string, password: string, id: number) {
    const newMeetingForm = this.formBuilder.group({
      meeting_name: name,
      meeting_password: password,
      user_id: id,
    });
    this.http
      .post(
        `http://127.0.0.1:8000/api/create-new-meeting`,
        newMeetingForm.getRawValue(),
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.join_url = res.join_url;
          this.sendNotificationToMembers();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  getMyProfile() {
    this.http
      .get('http://127.0.0.1:8000/api/showMyProfile', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.student = res;
          this.getMeetings();
        },
        (error: any) => {
          console.log(error);
          console.log('error');
        }
      );
  }

  getMeetings() {
    this.http
      .get(`http://127.0.0.1:8000/api/getMeetings/${this.student.id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.meetings = Object.values(res);
        },
        (error: any) => {
          console.log(error);
          console.log('error');
        }
      );
  }

  sendNotificationToMembers() {
    var teamID;
    this.http
      .get(`http://127.0.0.1:8000/api/myTeamProfile`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          teamID = res.team_id;

          const newNotificationForm = this.formBuilder.group({
            title: 'Meeting Online',
            content: 'We are going to join in meeting with this Url : ',
            url: this.join_url,
            team_id: teamID,
          });

          console.log(newNotificationForm.value);

          this.http
            .post(
              `http://127.0.0.1:8000/api/createNotificationFromLeader`,
              newNotificationForm.getRawValue(),
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
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

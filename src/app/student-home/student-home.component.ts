import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Modal } from 'bootstrap';
import { ServiesService } from '../servies.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
  providers: [ServiesService],
})
export class StudentHomeComponent {
  token = localStorage.getItem('token');
  messageNotification: string = '';
  notifications: any;
  name = '';
  file!: any;
  firstDoc: boolean = false;
  finalDoc: boolean = false;
  firstPre: boolean = false;
  finalPre: boolean = false;
  poster: boolean = false;
  isLeader!: boolean;

  constructor(private http: HttpClient, private services: ServiesService) {}

  ngOnInit(): void {
    var token = localStorage.getItem('token');

    this.getUserProfile();
    this.getNotifications();
    this.getFirstDoc();
    this.getFinalDoc();
    this.getFirstPre();
    this.getFinalPre();
    this.getPoster();
    
  }

  getUserProfile() {
    this.http
      .get('http://127.0.0.1:8000/api/showMyProfile', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.name = res.name;
          if (res.is_leader == 1) {
            this.isLeader = true;
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getNotifications() {
    this.http
      .get('http://127.0.0.1:8000/api/getAllNotifications', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        if (res == -1) {
          this.messageNotification = 'No Notifications Yet';
        } else {
          this.notifications = res;
          this.notifications = Object.values(this.notifications);
        }
      });
  }

  getNotificationSender(role: any) {
    if (role == 999) {
      return 'System';
    } else if (role == 1) {
      return 'Student';
    } else if (role == 0) {
      return 'Admin';
    } else if (role == 2) {
      return 'Doctor';
    } else if (role == 3) {
      return 'Teaching Assistant';
    } else {
      return 'Not Handle yet';
    }
  }

  showIdeaDetailsModalFirstDoc(): void {
    const fileUploadModal = $('#fileUploadModalFirstDoc');
    Modal.getOrCreateInstance(fileUploadModal[0]).show();
  }

  showIdeaDetailsModalFinalDoc(): void {
    const fileUploadModal = $('#fileUploadModalFinalDoc');
    Modal.getOrCreateInstance(fileUploadModal[0]).show();
  }

  showIdeaDetailsModalFisrtPresentation(): void {
    const fileUploadModal = $('#fileUploadModalFisrtPresentation');
    Modal.getOrCreateInstance(fileUploadModal[0]).show();
  }

  showIdeaDetailsModalSecondPresentation(): void {
    const fileUploadModal = $('#fileUploadModalSecondPresentation');
    Modal.getOrCreateInstance(fileUploadModal[0]).show();
  }

  showIdeaDetailsModalPoster(): void {
    const fileUploadModal = $('#fileUploadModalPoster');
    Modal.getOrCreateInstance(fileUploadModal[0]).show();
  }

  submitFirstDoc() {
    const fileUploadModal = $('#fileUploadModalFirstDoc');
    const fileInput = $('#fileInput')[0] as HTMLInputElement;
    this.file = fileInput.files?.[0];
    //------------------------------------------------------
    const formData = new FormData();
    formData.append('files', this.file, this.file.name);

    this.http
      .post(`http://127.0.0.1:8000/api/uploadFirstDocument`, formData, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          // console.log(res);
        },
        (error: any) => {
          console.error(error);
        }
      );

    //------------------------------------------------------
    Modal.getOrCreateInstance(fileUploadModal[0]).hide();
  }
  submitFinalDoc() {
    const fileUploadModal = $('#fileUploadModalFinalDoc');
    const fileInput = $('#fileInputfinaldoc')[0] as HTMLInputElement;
    this.file = fileInput.files?.[0];
    //------------------------------------------------------
    console.log(this.file);
    const formData = new FormData();
    formData.append('files', this.file, this.file.name);

    this.http
      .post(`http://127.0.0.1:8000/api/uploadFinalDocument`, formData, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          // console.log(res);
        },
        (error: any) => {
          console.error(error);
        }
      );

    //------------------------------------------------------
    Modal.getOrCreateInstance(fileUploadModal[0]).hide();
  }
  submitFirstPresentation() {
    const fileUploadModal = $('#fileUploadModalFisrtPresentation');
    const fileInput = $('#fileInputfirstpresentation')[0] as HTMLInputElement;
    this.file = fileInput.files?.[0];
    //------------------------------------------------------
    const formData = new FormData();
    formData.append('files', this.file, this.file.name);

    this.http
      .post(`http://127.0.0.1:8000/api/uploadFirstPresentation`, formData, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          // console.log(res);
        },
        (error: any) => {
          console.error(error);
        }
      );

    //------------------------------------------------------
    Modal.getOrCreateInstance(fileUploadModal[0]).hide();
  }
  submitFinalPresentation() {
    const fileUploadModal = $('#uploadFinalPresentation');
    const fileInput = $('#fileInputfinalPresentation')[0] as HTMLInputElement;
    this.file = fileInput.files?.[0];
    //------------------------------------------------------
    const formData = new FormData();
    formData.append('files', this.file, this.file.name);

    this.http
      .post(`http://127.0.0.1:8000/api/uploadFinalPresentation`, formData, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          // console.log(res);
        },
        (error: any) => {
          console.error(error);
        }
      );

    //------------------------------------------------------
    Modal.getOrCreateInstance(fileUploadModal[0]).hide();
  }
  submitPoster() {
    const fileUploadModal = $('#fileUploadModalPoster');
    const fileInput = $('#fileInputPoster')[0] as HTMLInputElement;
    this.file = fileInput.files?.[0];
    //------------------------------------------------------
    const formData = new FormData();
    formData.append('files', this.file, this.file.name);

    this.http
      .post(`http://127.0.0.1:8000/api/uploadPoster`, formData, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          // console.log(res);
        },
        (error: any) => {
          console.error(error);
        }
      );

    //------------------------------------------------------
    Modal.getOrCreateInstance(fileUploadModal[0]).hide();
  }

  getFirstDoc() {
    this.services.getFirstDoc().subscribe((res: any) => {
      console.log(res);
      if (res == 1) {
        this.firstDoc = true;
      }
    });
  }

  getFinalDoc() {
    this.services.getFinalDoc().subscribe((res: any) => {
      console.log(res);
      if (res == 1) {
        this.finalDoc = true;
      }
    });
  }

  getFirstPre() {
    this.services.getFirstPre().subscribe((res: any) => {
      console.log(res);
      if (res == 1) {
        this.firstPre = true;
      }
    });
  }

  getFinalPre() {
    this.services.getFinalPre().subscribe((res: any) => {
      console.log(res);
      if (res == 1) {
        this.finalPre = true;
      }
    });
  }

  getPoster() {
    this.services.getPoster().subscribe((res: any) => {
      console.log(res);
      if (res == 1) {
        this.poster = true;
      }
    });
  }
}

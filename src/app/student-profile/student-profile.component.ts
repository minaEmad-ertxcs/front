import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent {
  token = localStorage.getItem('token');
  isModalOpen = false;
  student: any;
  skills!: any;
  items!: any[];
  userImage: string = './assets/image.jpg';

  imageName: string = '';
  imagePath: string = '';
  newSkill: string = '';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.http
      .get('http://127.0.0.1:8000/api/showMyProfile', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.student = res;
          this.getSkills();
          this.getImage();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  toggleEditMode(item: any) {
    if (item.isEditMode) {
      item.value = item.editedValue;
    } else {
      item.editedValue = item.value;
    }

    item.isEditMode = !item.isEditMode;

    const itemsArray = this.items.map((item: { value: any }) => item.value);

    const itemsString = itemsArray.join(',');
    console.log(itemsString);

    this.http
      .post(
        'http://127.0.0.1:8000/api/editSkills',
        { skills: itemsString },
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (res: any) => {
          // console.log(res);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  removeItem(item: any) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }

    const itemsArray = this.items.map((item: { value: any }) => item.value);

    const itemsString = itemsArray.join(',');

    this.http
      .post(
        'http://127.0.0.1:8000/api/editSkills',
        { skills: itemsString },
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (res: any) => {
          // console.log(res);
        },
        (error: any) => {
          // console.log(error);
        }
      );
  }

  addSkill() {
    if (this.newSkill.trim() !== '') {
      this.items.push({
        value: this.newSkill,
        editedValue: '',
        isEditMode: false,
      });
      this.newSkill = '';
      const modal = document.getElementById('myModal');
    }

    const itemsArray = this.items.map((item: { value: any }) => item.value);

    const itemsString = itemsArray.join(',');

    this.http
      .post(
        'http://127.0.0.1:8000/api/editSkills',
        { skills: itemsString },
        {
          headers: { Authorization: `Bearer ${this.token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (res: any) => {
          // console.log(res);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getSkills() {
    this.http
      .get('http://127.0.0.1:8000/api/getSkills', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.skills = res;
          this.items = this.skills.map((value: any) => ({
            value,
            editedValue: '',
            isEditMode: false,
          }));
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageName = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userImage = e.target.result;
        this.uploadImage(file);
        this.getImage();
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file, file.name);
    console.log(file, file.name);
    this.http
      .post('http://127.0.0.1:8000/api/uploadImage', formData, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          location.reload();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  getImage() {
    this.http
      .get('http://127.0.0.1:8000/api/getImage', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.userImage = res.image_url;
          if (this.userImage != '') {
            this.userImage = res.image_url;
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

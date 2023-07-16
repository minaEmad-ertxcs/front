import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent {
  token = localStorage.getItem('token');
  admin: any;
  items: any[] = [
    { value: 'CSS', editedValue: '', isEditMode: false },
    { value: 'HTML', editedValue: '', isEditMode: false },
    { value: 'Java', editedValue: '', isEditMode: false },
    { value: 'Python', editedValue: '', isEditMode: false },
  ];
  newSkill: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://127.0.0.1:8000/api/showAdminProfile', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.admin = res;
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
  }

  removeItem(item: any) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
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
  }
  userImage: string | ArrayBuffer | null = null;
  imageName: string = '';
  imagePath: string = '';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageName = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userImage = e.target.result;
      };
      console.log(this.imageName);
      reader.readAsDataURL(file);
    }
  }
}

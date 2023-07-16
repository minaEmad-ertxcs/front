import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects-files',
  templateUrl: './projects-files.component.html',
  styleUrls: ['./projects-files.component.css'],
})
export class ProjectsFilesComponent {
  token = localStorage.getItem('token');
  files: string[] = [];
  filteredFiles: any[] = [];
  selectedFiles: string[] = [];
  fileType: any;

  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProjectFiles();
  }

  filterFiles(fileType: any) {
    this.fileType = fileType;

    this.http
      .get(`http://127.0.0.1:8000/api/getallprojectsByFilesType/${fileType}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.filteredFiles = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  toggleFileSelection(filename: string) {
    if (this.selectedFiles.includes(filename)) {
      this.selectedFiles = this.selectedFiles.filter(
        (file) => file !== filename
      );
    } else {
      this.selectedFiles.push(filename);
    }
  }

  // downloadSelectedFiles(){
  //   return this.selectedFiles.forEach((filename: any) => {
  //     return (
  //       'http://127.0.0.1:8000/storage/files/' +
  //       this.fileType +
  //       '/' +
  //       filename.file
  //     );
  //   });
  // }

  getFileUrl(filename: string): string {
    return `http://127.0.0.1:8000/storage/files/${this.fileType}/${filename}`;
  }  

  // downloadFile(url: string) {
  //   console.log(url);
  //   const filename = this.extractFilenameFromUrl(url);
  //   this.http.get(url, { responseType: 'blob' }).subscribe((response) => {
  //     this.saveFile(response, filename);
  //   });
  // }

  // extractFilenameFromUrl(url: string): string {
  //   const parts = url.split('/');
  //   return parts[parts.length - 1];
  // }

  // saveFile(response: any, filename: string) {
  //   const blob = new Blob([response], { type: 'application/octet-stream' });
  //   const downloadLink = document.createElement('a');
  //   downloadLink.href = window.URL.createObjectURL(blob);
  //   downloadLink.download = filename;
  //   downloadLink.click();
  // }

  getProjectFiles() {
    this.http.get(`${this.baseUrl}/projectFiles`).subscribe((data: any) => {
      this.files = data;
      this.filterFiles('');
    });
  }
}

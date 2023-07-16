import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ServiesService {
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  getTAProfile(id: number): string {
    var ta = '';
    this.http
      .get(`http://127.0.0.1:8000/api/ta/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      .subscribe((res: any) => {
        // console.log(res);
        ta = res;
      });

    return ta;
  }

  getUserInfo(token: any) {
    this.http.get('http://127.0.0.1:8000/api/getUser', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
  }

  getRegistrationTeam(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/getTeamRegistration', {
      headers: { Authorization: `Bearer ${this.token}` },
      withCredentials: true,
    });
  }
  getFirstDoc(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/getFirstDocDeadline', {
      headers: { Authorization: `Bearer ${this.token}` },
      withCredentials: true,
    });
  }
  getFinalDoc(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/getFinalDocDeadline', {
      headers: { Authorization: `Bearer ${this.token}` },
      withCredentials: true,
    });
  }
  getFirstPre(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/getFirstPresentationDeadline', {
      headers: { Authorization: `Bearer ${this.token}` },
      withCredentials: true,
    });
  }
  getFinalPre(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/getFinalPresentationDeadline', {
      headers: { Authorization: `Bearer ${this.token}` },
      withCredentials: true,
    });
  }
  getPoster(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/getPosterUploadDeadline', {
      headers: { Authorization: `Bearer ${this.token}` },
      withCredentials: true,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService],
})
export class AppComponent {
  isLoggedIn: boolean = this.loginService.getLogStatus();
  title = 'project';

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {}

  logout() {
    var token = localStorage.getItem('token');
    return this.http
      .post(
        'http://127.0.0.1:8000/api/logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      )
      .subscribe(
        (data: any) => {
          this.loginService.logout();
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        },
        (error: any) => console.log(error)
      );
  }

  getLogStatus() {
    return this.loginService.getLogStatus();
  }
}

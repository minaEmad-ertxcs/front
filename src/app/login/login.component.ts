import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;
  loginUser!: any;
  msg: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  onSubmit() {
    return this.http
      .post('http://127.0.0.1:8000/api/login', this.form.getRawValue(), {
        withCredentials: true,
      })
      .subscribe(
        (data: any) => {
          localStorage.setItem('token', data.message);

          var token = localStorage.getItem('token');

          this.goToRightLandingPage(token);
        },
        (error: any) => {
          console.log(error);
          this.msg = 'Invalid Email or Password';
        }
      );
  }

  handleLandingPagesByRoles(role: number) {
    this.loginService.login();
    if (role == 0) {
      this.router.navigate(['adminLandingPage']);
    } else if (role == 1) {
      this.router.navigate(['landingpage']);
    } else if (role == 2) {
      this.router.navigate(['doctorLandingPage']);
    } else if (role == 3) {
      this.router.navigate(['taLandingPage']);
    } else {
      this.msg = 'your role is not handle yet';
    }
  }

  goToRightLandingPage(token: any) {
    this.http
      .get('http://127.0.0.1:8000/api/getUser', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.loginUser = res;
          this.handleLandingPagesByRoles(this.loginUser.role);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

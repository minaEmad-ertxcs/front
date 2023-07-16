import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  token = localStorage.getItem('token');
  private isLoggedIn!: boolean;

  constructor() {
    if (this.token == null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
  }

  login() {
    this.isLoggedIn = true;
  }
  logout() {
    this.isLoggedIn = false;
  }
  getLogStatus() {
    return this.isLoggedIn;
  }
}

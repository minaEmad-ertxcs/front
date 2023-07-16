import { CanActivateFn, Router } from '@angular/router';
import { ServiesService } from './servies.service';
import { HttpClient } from '@angular/common/http';
var token = localStorage.getItem('token');


export const protectGuard: CanActivateFn = (route, state) => {

  if (token != null) {
    return true;
  } else {
    const router = new Router();
    // window.alert('You are not allow to enter this page without login.');
    router.navigate(['login']);
    return false;
  }
};

// function decodeJwtToken(token: any): any {
//   const base64Url = token?.split('.')[1];
//   const base64 = base64Url?.replace(/-/g, '+')?.replace(/_/g, '/');
//   const decodedToken = JSON.parse(window.atob(base64));
//   return decodedToken;
// }

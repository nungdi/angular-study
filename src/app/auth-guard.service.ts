import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  isLogin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    let decodedPayload = token.split('.')[1];
    const payload = JSON.parse(atob(decodedPayload));
    if ((payload.exp - new Date().getTime() / 1000) < 0) {
      return false;
    }

    return true;
  }
}

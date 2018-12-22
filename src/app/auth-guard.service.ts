import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements canLoad, canActivate {

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

    const decodedPayload = token.split('.')[1];
    const payload = JSON.parse(atob(decodedPayload));
    if ((payload.exp - new Date().getTime() / 1000) < 0) {
      return false;
    }

    return true;
  }

  // 전체를 막을 때
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const url = `/${route.path}`;
    if (this.isLogin()) {
      return true;
    } else {
      // 현재 url을 저장하고 로그인 화면으로 이동
      localStorage.setItem('redirect_url', url);
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  // 한페이지 막을 때
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = `/${route.url[0].path}`;
    if (this.isLogin()) {
      return true;
    } else {
      // 현재 url을 저장하고 로그인 화면으로 이동
      localStorage.setItem('redirect_url', url);
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
